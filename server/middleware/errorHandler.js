const { logEvents } = require("./logger")

/** 
* Middleware to log express app's (server's) errors
*/
const errorHandler = (err, req, res, next) => {
    // log error
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack) // will give err info

    // response
    const status = res.statusCode ? res.statusCode : 500 
    res.status(status)
    res.json({ message: err.message })
}

module.exports = errorHandler 

