const mongoose = require('mongoose')

const blogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    body: {
        type: String,
        default: null
    },
    URL: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Blogpost', blogpostSchema)

// controller will direct api calls to access this stuff
// add to this schema from webscrapper file. may need controller to modularize.

// future method for possible openAI use for summarization
// blogpostSchema.methods