const Keyword = require('../../models/Keyword') 
const sgMail = require('@sendgrid/mail')

/** 
* Sends mass email to everyone subscribed using SendGrid API.
* Emails sent in masses, one keyword at a time.
* Handles if keywords have no subscribers.
*/
const sendEmail = async () => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    let message = "[Newsletter] Internal Log: "

    // obtain database information
    try {
        var keywords = await Keyword.find().
            populate({
                path: 'articles'
            })
            .populate({
                path: 'users'
            }).exec()
            message += (`Successfully populated keyword documents.\n`)
    } catch (error) {
        message += (`Error populating keyword information. ${error} \nPlease reschedule emails.`)
        console.log(`Error populating keyword information. ${error} \nPlease reschedule emails.`)
        return
    }
    
    // email each keyword
    for (const keyword of keywords) {
        // prepare sendgrid personalization json. takes an array of json info for each user
        let personalizations = []
        if (keyword.users.length == 0) {
            message += `"${keyword.word}" has no subscribers.\n`
            console.log(`"${keyword.word}" has no subscribers. `)
            continue
        }
        for (const user of keyword.users) {
            const unsubAuthToken = user.unsubAuthToken
            personalizations.push({ 
                to: [
                { 
                    "email": user.email
                }],
                dynamic_template_data: {
                    "unsubAuthToken": unsubAuthToken,
                    "keyword": keyword.word
                }
            })
        }

        // check if articles present and format for sending
        if(keyword.articles.length == 0) {
            var articles = "empty" // for sendgrid template comparison
        } else {
            var articles = keyword.articles
            // randomize & shorten article counts
            shuffle(articles)
            articles = limitArticles(keyword.articles)
        }

        // send email
        try {
            const msg = {
                from: {
                    name: process.env.VERIFIED_SENDER_NAME,
                    email: process.env.VERIFIED_SENDER_EMAIL
                },
                templateId: process.env.TEMPLATE_ID,
                personalizations: personalizations,
                dynamic_template_data: {
                    "subject": `This week's newsletter on "${keyword.word}"`,
                    "articles": articles,
                    "Sender_Name": process.env.SENDER_NAME,
                    "Sender_Address": process.env.SENDER_ADDRESS,
                    "Sender_City": process.env.SENDER_CITY,
                    "Sender_State": process.env.SENDER_STATE,
                    "Sender_Zip": process.env.SENDER_ZIP,
                    "empty": "empty",
                    "noArticles": "Your topic hasn't been implented yet or there are no new developments! Come back next week :)",
                    "homepageURL": process.env.CLIENT_HOMEPAGE_URL, 
                }
            }
            await (async () => { // need to await to get internal success log and prevent render.com from shutting async process down when external async is done.
                try {
                    await sgMail.send(msg);
                    message += `"${keyword.word}" email sent successfully.\n`
                    console.log(`"${keyword.word}" email sent successfully. `)
                } catch (error) {
                    console.error(error);
                  
                    if (error.response) {
                        console.error(error.response.body)
                    }
                    message += (`Sendgrid Error: ${error}\n`)
                }
            })();
        } catch (error) {
            message += (`An unexpected emailing error occurred: ${error}\n`)
            console.log(`An unexpected emailing error occurred: ${error}\n`)
        }
    }
    message += `Emailing process finished.`
    console.log(`Emailing process finished.`)
    return message
}

/** 
* Function to shuffle an array of articles for better source coverage.
* @param {Array} array - array of articles to be shuffled in place.
* Source - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
const shuffle = (array) => {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

/** 
* Function to limit articles shown to 10.
* @param {Array} articles - Array of articles.
* @return {Array} New shorter array of articles. 
*/
const limitArticles = (articles) => {
    if(articles.length > 10) {
        articles = articles.slice(0, 10)
    }
    return articles
}

/** 
* Sends SendGrid email confirming that user has been unsubscribed. 
* Called in 'usersController.js' when the PATCH method for 'users' is successful in unsubscribing.
* @param {string} email - Email of the user passed in by PATCH request
* @param {string} keyword - Keyword of the user passed in by PATCH request
*/
const sendUnsubEmail = async (email, keyword) => {
    let message = "[Unsubscribe]: "
    // subscription message log not implemented yet

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    try {
        const msg = {
            to: email,
            from: {
                name: process.env.VERIFIED_SENDER_NAME,
                email: process.env.VERIFIED_SENDER_EMAIL
            },
            templateId: process.env.UNSUB_TEMPLATE_ID,
            dynamic_template_data: {
                "subject": `You have unsubscribed from "${keyword}"`,
                "keyword": keyword,
                "Sender_Name": "Matthew Labasan",
                "Sender_Address": "2800 Woodlawn Dr",
                "Sender_City": "Honolulu",
                "Sender_State": "HI",
                "Sender_Zip": "96822",
                "homepageURL": process.env.CLIENT_HOMEPAGE_URL,
            }
        }
        await (async () => { // need to await to get internal success log and prevent render.com from shutting async process down when external async is done.
            try {
                await sgMail.send(msg);
                message += `"${email}" unsubscribed from "${keyword}" successfully.\n`
            } catch (error) {
                console.error(error);
              
                if (error.response) {
                    message += (`Sendgrid Error: ${error.response.body}\n`)
                }
                message += (`Sendgrid Error: ${error}\n`)
            }
        })();
    } catch (error) {
        message += (`An unexpected error occurred when unsubscribing ${email} from ${keyword}: ${error}\n`)
    }
}

module.exports = {
    sendEmail,
    sendUnsubEmail
}


// to do: 
// log error: create message return that awaits email loop to finish. bc it only runs the email success after the await sgMail, 
// so it allows emailing process finished to go before hand and return. need to handle that async allowing rest to follow

// create unsubscribe feature
// add link that will send correct user json
// push prototype
// update readme