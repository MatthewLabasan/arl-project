// no longer needed

const mongoose = require('mongoose')

const linkArraySchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    linkArray: {
        type: [String],
        required: true
    }
    
})

// will send this link array up, one document per website
// for every document, go through the array and create a blogpost for every link in the array
// populate the blogpost doc with the url and data

// figure out auto deletion of url arrays