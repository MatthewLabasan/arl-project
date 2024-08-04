const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true  // look into validation and email field https://www.npmjs.com/package/mongoose-type-email
    },
    keywords: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Keyword'}],
        required: true,
        default: []
    }
})

module.exports = mongoose.model('User', userSchema)

