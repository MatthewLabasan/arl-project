const Keyword = require('../models/Keyword')
const Article = require('../models/Article')
const asyncHandler = require('express-async-handler') // pushes errors to default error handler

/** 
* This API is not in use by any functions. Keyword document creation is handled in 'usersController.js'
*/

// @desc Get all keywords
// @route GET /keywords
// @access Private (not implemented yet)
const getAllKeywords = asyncHandler(async(req, res) => {
    const keywords = await Keyword.find() // .lean() if don't want actual objects
    if (!keywords) {
        return res.status(400).json({ message: "No keywords." })
    }
    res.json(keywords) // auto status 200
})

// @desc Create new keywords
// @route POST /keywords
// @access Private (not implemented yet)
const createNewKeyword = asyncHandler(async(req, res) => {
    const { word } = req.body 

    // confirm data
    if(!word || typeof word !== 'string' || word.includes(' ')) {
        return res.status(400).json({ message: "Invalid keyword data or none provided." }) 
    }

    // normalize data 
    word.toLowerCase()

    // check for duplicate.
    const duplicate = await Keyword.findOne( { word } ).lean().exec() 
    if(duplicate) {
        return res.status(400).json({ message: "Keyword already implemented."}) 
    }

    // push object
    const keywordObject = { word } // default array will populate
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
const updateKeyword = asyncHandler(async(req, res) => { 
    const { word, articles } = req.body

    word.toLowerCase() // normalize word

    // check inputs
    if(!word || Array.isArray(articles)) {
        return res.status(400).json({ message: "Word and new article array is required." })
    }

    const keyword = await Keyword.findOne(word).exec()
    
    // check availability
    if(!keyword) {
        return res.status(400).json({ message: "Keyword not implemented."})
    }
    // keyword.setArticles(articles) 
    keyword.articles = articles
    await keyword.save() 
    return res.json({ message: "Keyword articles updated for this week's edition."})
})

// @desc Delete a keyword
// @route DELETE /keywords
// @access Private (not implemented yet)
const deleteKeyword = asyncHandler(async(req, res) => {
    const { word } = req.body
    if(!word) {
        return res.status(400).json({ message: "Invalid keyword data recieved."})
    }

    const keyword = await Keyword.findOne(word).lean().exec()
})

module.exports = {
    getAllKeywords, 
    createNewKeyword, 
    updateKeyword,
    deleteKeyword
}