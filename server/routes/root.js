const express = require('express')
const router = express.Router();
const path = require('path')

router.get('^/$|/home(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html')) // inherently asynch
})

module.exports = router