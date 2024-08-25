const mongoose = require('mongoose')
const { logEvents } = require('../middleware/logger')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
        logEvents('Failed to connect to MongoDB.' + err, '../logs/errLog.log')
    }
}

module.exports = connectDB