const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Article', blogpostSchema)