const mongoose = require('mongoose') // this handles connection

const connectDB = async() => { // want asyn to do in bg while everything else starts up
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err) // does not log error
    }
}

module.exports = connectDB