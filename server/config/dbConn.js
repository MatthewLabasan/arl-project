const mongoose = require('mongoose') // this handles connection
const { logEvents } = require('../middleware/logger')

const connectDB = async() => { // want asyn to do in bg while everything else starts up
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
        logEvents('Failed to connect to MongoDB.' + err, '../logs/errLog.log')
    }
}

module.exports = connectDB