const User = require('../../models/User') // use populate to get keyword documents
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// would need to populate user's keywords, then the keyword's articles.
// for now, populate everything as if sending all at once.
// then, grab each keyword document, then send all articles. continue in loop for keyword array length.

// populate all documents in one query (most efficient, though takes up memory)
// if articles or keywords undefined, result is an empty array
// will need to if else check this before indexing

const sendEmail = async () => {
    // obtain database information
    try {
        var users = await User.find().
            populate({
                path: 'keywords',
                populate: { path: 'articles' }
            }).exec()
    } catch (error) {
        console.log(`Error retrieving user information. ${error}`)
    }

    // loop through users
    const name = users[0].name
    const email = users[0].email
    const keywords = users[0].keywords
    // loop through users keywords
    const word = keywords[1]
    // loop through users articles
    console.log(word)
    const article = word.articles[0]
    const title = article.title
    const author = article.author
    const date = article.date
    const body = article.summary
    const link = article.link
    console.log(email)

    // note: this isnt n^3 as its only touching every word and article only once for a user. possibly could be made better by caching articles or reformatting indexing / database? idk
    // send email
    // go through each user, grab email, grab keyword, then input articles
    // or, go through each keyword, create an email, then mail it to recipeints with that keyword id
    try {
    
        const msg = {
            to: email,
            from: process.env.VERIFIED_SENDER_EMAIL,
            templateId: process.env.TEMPLATE_ID,
            dynamicTemplateData: {
                "subject": `This week's newsletter on "${word.word}"`,
                "timeStamp": `${date}`,
                "dateFormat": "MMMM DD, YYYY h:mm:ss A",

            }
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    } catch (error) {
        console.log("An unexpected emailing error occurred: " + e)
    }
}

module.exports = {
    sendEmail
}