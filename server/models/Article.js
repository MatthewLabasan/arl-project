const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Title unavailable."
    },
    author: {
        type: String,
        required: true,
        default: "Author date unavailable."
    },
    date: {
        type: String,
        required: true,
        default: "Publish date unavailable."
    },
    summary: {
        type: String,
        required: true,
        default: "Summary unavailable."
    },
    url: {
        type: String,
        required: true,
        default: "URL unavailable." 
    }
})

module.exports = mongoose.model('Article', articleSchema)