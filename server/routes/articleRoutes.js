const express = require('express')
const router = express.Router();
const articlesController = require('../controllers/articlesController')

// we are already at /users, this is the root of that. notice these are chained
router.route('/')
    .get(articlesController.getAllArticles) // direct to controller
    .post(articlesController.createNewArticle)
    .patch(articlesController.updateArticle)
    .delete(articlesController.deleteArticle)

module.exports = router