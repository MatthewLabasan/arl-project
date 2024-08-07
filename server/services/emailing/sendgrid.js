const Keyword = require('../../models/Keyword') // use populate to get keyword documents
const sgMail = require('@sendgrid/mail')

// would need to populate user's keywords, then the keyword's articles.
// for now, populate everything as if sending all at once.
// then, grab each keyword document, then send all articles. continue in loop for keyword array length.

// populate all documents in one query (most efficient, though takes up memory)
// if articles or keywords undefined, result is an empty array
// will need to if else check this before indexing

const sendEmail = async () => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    // obtain database information
    try {
        var keywords = await Keyword.find().
            populate({
                path: 'articles'
            })
            .populate({
                path: 'users'
            }).exec()
    } catch (error) {
        console.log(`Error retrieving keyword information. ${error}`)
    }

    console.log(keywords)
    for (let i = 0; i < keywords.length; i++) {
        // prepare personalizations
        let personalization = {
            "personalizations": []
        }
        for (let j = 0; j < keywords[i].users[j].length; j++) {
            console.log(keywords[i].users[j].email)
            personalization.personalizations.push({ // push an object literal
                "to": [{ "email": keywords[i].users[j].email }]
            })
        }
        console.log(personalization.to)
        // shuffle articles
        shuffle(keywords[i].articles)
        // send email
        // try {
        //     const msg = {
        //         personalization,
        //         from: process.env.VERIFIED_SENDER_EMAIL,
        //         templateId: process.env.TEMPLATE_ID,
        //         dynamicTemplateData: {
        //             "subject": `This week's newsletter on "${keywords[i].word}"`,
        //             // get this iterations (keywords) articles
        //             "articles": keywords[i].articles,
        //         }
        //     }
        //     sgMail
        //         .send(msg)
        //         .then(() => {
        //             console.log('Email sent')
        //         })
        //         .catch((error) => {
        //             console.error(error)
        //         })
        // } catch (error) {
        //     console.log("An unexpected emailing error occurred: " + error)
        // }
    }
}

// to shuffle keywords. src: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
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

module.exports = {
    sendEmail
}

// try {
//     const msg = {
//         to: "tyrenjmi@gmail.com",
//         from: process.env.VERIFIED_SENDER_EMAIL,
//         templateId: process.env.TEMPLATE_ID,
//         dynamicTemplateData: {
//             "subject": `This week's newsletter on "${keywords[0].word}"`,
//             // get this iterations (keywords) articles
//             "articles": keywords[2].articles,
//             "Sender_Name": "Matthew Labasan",
//             "Sender_Address": "1234 Example Street",
//             "Sender_City": "Honolulu",
//             "Sender_State": "HI",
//             "Sender_Zip": "96826"
//         }
//     }
//     sgMail
//         .send(msg)
//         .then(() => {
//             console.log('Email sent')
//         })
//         .catch((error) => {
//             console.error(error)
//         })
// } catch (error) {
//     console.log("An unexpected emailing error occurred: " + error)
// }