const { format } = require('date-fns')
const { v4:uuid } = require('uuid') 
const fs = require('fs') // file system
const fsPromises = require('fs').promises
const path = require('path')

// appender: want this async to allow as many as needed to come in & process on own bg time
const logEvents = async(message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        // if folder doesn't exist
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')) // want this done in bg
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem) 
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log') // request log
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }
