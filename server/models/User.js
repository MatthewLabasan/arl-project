const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    keywords: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Keyword'}],
        required: true,
        default: []
    }
})

module.exports = mongoose.model('User', userSchema)

