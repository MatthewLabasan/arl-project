const Keyword = require('../models/Keyword')
const Article = require('../models/Article')
const asyncHandler = require('express-async-handler') 

// @desc Get all articles
// @route GET /articles
// @access Private (not implemented yet)
const getAllArticles = asyncHandler(async(req, res) => {
    const articles = await Article.find() 
    if (!articles) {
        return res.status(400).json({ message: "No articles." })
    }
    res.json(articles) // auto status 200
})

// @desc Create new articles
// @route POST /article
// @access Private (not implemented yet)
const createNewArticle = asyncHandler(async(req, res) => {
    res.status(405).json({ message: "Creation of new articles not allowed."})
})

// @desc Update a keyword
// @route PATCH /keywords
// @access Private (not implemented yet)
const updateArticle = asyncHandler(async(req, res) => {
    res.status(405).json({ message: "Updating articles not allowed."})
})

// @desc Delete a keyword
// @route DELETE /keywords
// @access Private (not implemented yet)
const deleteArticle = asyncHandler(async(req, res) => {
    res.status(405).json({ message: "Deleting articles not allowed."})
})

module.exports = {
    getAllArticles,
    createNewArticle,
    updateArticle,
    deleteArticle
}