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
        default: "No description created yet."
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

// get urls, create scheme in js for every url, pass url into python script
// get python script data output and update it in blogpost schema
// repeat until loop is empty

// WHAT IF WE KEEP URL IN STATIC AND NOT INSIDE DATABASE? REDUCE THAT CONNECTION. Just grab urls, hold in array, pass it into python. Multiple?

// controller will direct api calls to access this stuff
// add to this schema from webscrapper file. may need controller to modularize.

// future method for possible openAI use for summarization
// blogpostSchema.methods