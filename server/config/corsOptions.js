const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => { // note attribute structure
        if (allowedOrigins.indexOf(origin) !== -1 || !origin ) { // no origin allows things like postman (testing) to access our api without having an origin url
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true, // allows cookies, auth, etc. how can we use this info?
    optionsSuccessStatus: 200
    // other options include methods (get, post, head by default), allowed headers...)
}

module.exports = corsOptions