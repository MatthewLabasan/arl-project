const mongoose = require('mongoose')

const keywordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    articles: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}],
        required: true,
        default: [] // no articles
    },
    users: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        required: true,
        default: []
    }
})

module.exports = mongoose.model('Keyword', keywordSchema)