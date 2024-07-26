const express = require('express')
const router = express.Router();
const keywordsController = require('../controllers/keywordsController')

router.route('/')
    .get(keywordsController.getAllKeywords) // direct to controller
    .post(keywordsController.createNewKeyword)
    .patch(keywordsController.updateKeyword)
    .delete(keywordsController.deleteKeyword)

module.exports = router