const mongoose = require('mongoose')

const keywordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    articles: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}], // declare an array or article documents. this is called referencing. will allow population of articles, but isn't enforced
        required: true,
        default: [] // no articles associated with keyword 
    },
    users: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        required: true,
        default: []
    }
})

// reset every time called
// keywordSchema.methods.setArticles = (arrayOfArticles) => {
//     this.articles = arrayOfArticles
// }

module.exports = mongoose.model('Keyword', keywordSchema)