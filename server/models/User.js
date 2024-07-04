const mongoose = require('mongoose')

const User = new mongoose.Schema({
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
    preference: {
        type: String,
        default: "technology" // basic tech newsletter if nothing specific
    }
})

