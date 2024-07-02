require('dotenv').config();
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/logger') // fix 
const PORT = process.env.PORT || 3500

const app = express();

console.log(process.env.NODE_ENV)

app.use(express.json)
app.use(cookieParser)
app.use(logger) // custom logs

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root')) // notice import is inside

app.use(errorHandler) // custom WHY NO WORK?

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}. Access at <http://localhost:3500/>`)
})