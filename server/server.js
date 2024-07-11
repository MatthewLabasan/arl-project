require('dotenv').config();
const express = require('express')
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler') // cannot destructure because we are asking app to use this file
const { webscraper } = require('./services/webscraper/webscraper')
const { websiteData } = require ('./services/webscraper/websiteData')
const PORT = process.env.PORT || 3500

const app = express();
console.log(process.env.NODE_ENV)

connectDB()

app.use(logger) // custom logs
app.use(cors(corsOptions)) // cross origin request management (for front and back sep. and security)
app.use(express.json()) 
app.use(cookieParser())

webscraper(websiteData)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root')) // notice import is inside

// Last middleware to use
app.use(errorHandler) 

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB database successfully.")
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}. Access at <http://localhost:3500/>`)
    })
})