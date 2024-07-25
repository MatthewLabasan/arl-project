const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    keywords: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Keyword'}],
        default: "sensor" // basic newsletter if nothing specific. perhaps a surprise me?
    }
})

module.exports = mongoose.model('User', userSchema)

