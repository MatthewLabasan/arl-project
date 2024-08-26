require('dotenv').config();
const express = require('express')
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler')
const { scrapePuppeteer } = require('./services/webscraper/jsScraper/scrapePuppeteer') // for testing
const { websiteData } = require('./services/webscraper/websiteData') // for testing
const { scheduleScrape } = require('./services/webscraper/webscraper')
const { scheduleNewsletter } = require('./services/emailing/sendNewsletter') 
const PORT = process.env.PORT || 3500

// delete
// const { sendEmail } = require('./services/emailing/sendgrid') // delete

const app = express();
console.log(process.env.NODE_ENV)

connectDB()

app.use(logger) // custom logs
app.use(cors(corsOptions)) // cross origin request management (for front and back sep. and security)
app.use(express.json()) 
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root')) // notice import is inside
app.use('/keywords', require('./routes/keywordRoutes'))
app.use('/articles', require('./routes/articleRoutes'))
app.use('/users', require('./routes/userRoutes'))

// CSS Selector Testing: See documentation for details.
// scrapePuppeteer(websiteData)

// Webscraper & Scheduler
scheduleScrape()

// Emailer
scheduleNewsletter()

app.use(errorHandler) 

mongoose.connection.once('open', () => {
    console.log("Server connected to MongoDB database successfully.")
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}. Access at <http://localhost:3500/>`)
    })
})