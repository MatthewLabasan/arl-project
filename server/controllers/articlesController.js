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
    const { title, author, date, summary, url } = req.body 

    // confirm data
    if(!title || !author || !date || !summary || !url) {
        return res.status(400).json({ message: "Invalid article data or none provided." })
    }

    // check for duplicate
    const duplicate = await Keyword.findOne( { url }).lean().exec() 
    if(duplicate && // if dupe and date is old, remove it. # need to think about how creation impacts adding to arrays, getting ids, etc. and fix dates.
    if(duplicate) { // else just say this.
        return res.status(400).json({ message: "Article already implemented."}) 
    }

    // push object
    const articleObject = { title, author, date, summary, url } // default array will populate
    const keyword = await Keyword.create(keywordObject) // create document

    if(keyword) {
        res.status(201).json({ message: "Keyword successfully created."})
    } else {
        res.status(400).json({ message: "Invalid keyword data recieved."})
    }
})

// @desc Update a keyword
// @route PATCH /keywords
// @access Private (not implemented yet)
const updateArticle = asyncHandler(async(req, res) => {

})

// @desc Delete a keyword
// @route DELETE /keywords
// @access Private (not implemented yet)
const deleteArticle = asyncHandler(async(req, res) => {
    const { word } = req.body
    if(!word) {
        return res.status(400).json({ message: "Invalid keyword data recieved."})
    }

    const keyword = await Keyword.findOne(word).lean().exec()
})

module.exports = {
    getAllArticles,
    createNewArticle,
    updateArticle,
    deleteArticle
}