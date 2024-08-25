const express = require('express')
const router = express.Router();
const articlesController = require('../controllers/articlesController')

router.route('/')
    .get(articlesController.getAllArticles) // direct to controller
    .post(articlesController.createNewArticle)
    .patch(articlesController.updateArticle)
    .delete(articlesController.deleteArticle)

module.exports = router