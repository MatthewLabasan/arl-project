const mongoose = require('mongoose')

const keywordchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true
    },
    articles: {
        type: [mongoose.Schema.Types.ObjectId], 
        required: false, 
        ref: 'Aricle'
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