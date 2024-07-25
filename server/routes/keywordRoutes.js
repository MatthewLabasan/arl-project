const express = require('express')
const router = express.Router();
const keywordsController = require('../controllers/keywordsController')

// we are already at /users, this is the root of that. notice these are chained
router.route('/')
    .get(keywordsController.getAllKeywords) // direct to controller
    .post(keywordsController.createNewKeyword)
    .patch(keywordsController.updateKeyword)
    .delete(keywordsController.deleteKeyword)

module.exports = router