const Keyword = require('../../models/Keyword') 
const sgMail = require('@sendgrid/mail')

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
        // prepare sendgrid personalization json
        let personalizations = []
        for (const user of keyword.users) {
            personalizations.push({ // push an object literal for json conversion
                to: [{ "email": user.email }]
            })
        }

        // randomize & shorten article counts
        shuffle(keyword.articles)
        limitArticles(keyword.articles)

        // send email
        try {
            const msg = {
                from: process.env.VERIFIED_SENDER_EMAIL,
                templateId: process.env.TEMPLATE_ID,
                personalizations: personalizations,
                dynamic_template_data: {
                    "subject": `This week's newsletter on "${keyword.word}"`,
                    // get this iterations (keywords) articles
                    "articles": keyword.articles, // change in dynamic template to print message below if nothing is in articles array!
                    "noArticles": "Sorry! No articles have been found yet. Come back next week!"
                }
            }
            console.log(msg)
            sgMail
                .send(msg)
                .then(() => {
                    message += `"${keyword.word}" email sent successfully.\n`
                    console.log(`"${keyword.word}" email sent successfully. `)
                })
                .catch((error) => {
                    console.error(error)
                })
        } catch (error) {
            message += (`An unexpected emailing error occurred: ${error}\n`)
            console.log(`An unexpected emailing error occurred: ${error}\n`)
        }
    }
    message += `Emailing process finished.`
    console.log(`Emailing process finished.`)
    return message
}

// create message return that awaits email loop to finish. bc it only runs the email success after the await sgMail, so it allows emailing process finished to go before hand and return. need to handle that async allowing rest to follow
// create unsubscribe feature
// add link that will send correct user json
// push prototype
// update readme

// src: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

const limitArticles = (articles) => {
    if(articles.length > 10) {
        articles = articles.slice(10)
    }
}

module.exports = {
    sendEmail
}