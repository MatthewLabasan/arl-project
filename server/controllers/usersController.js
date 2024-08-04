const asyncHandler = require('express-async-handler') 
const User = require('../models/User')
const Keyword = require('../models/Keyword')

// @desc Get all users
// @route GET /users
// @access Private (not implemented yet)
const getAllUsers = asyncHandler(async(req, res) => {
    // const users = await User.find()
    // if(!users) {
    //     res.status(400).json({ message: "No users."})
    // }
    // res.json(users)
    res.status(405).json({ message: "Viewing all users not allowed."})
})

// @desc Create new user
// @route POST /article
// For subscribing / adding new words
const createNewUsers = asyncHandler(async(req, res) => {
    const {name, email, keyword} = req.body
    if( !name || !email || !keyword ) {
        return res.status(400).json({ message: "No input provided."}) // form will have checked for correct formatting
    }

    // check if keyword is present in db
    var keywordID = await Keyword.findOne({word: keyword.toLowerCase()}).exec()

    if (keywordID) {
        keywordID = keywordID._id
        console.log(`Existing keyword. ID:${keywordID}`)
    } else {
        let newKeywordObject = Keyword({word: keyword, articles: []})
        let newKeyword = await Keyword.create(newKeywordObject)
        keywordID = newKeyword._id
        console.log(`New keyword added. ID:${keywordID}`)
    }

    // query v1
    // find based on email. if match, check keyword, else create
    var existingUser = await User.findOne({email}) 
    console.log(existingUser)
    if(existingUser) {
        if(existingUser.keywords.includes(keywordID)) {
            return res.status(201).json({ message: `${email} already subscribed to ${keyword}.`})
        } else {
            existingUser.keywords.push(keywordID)
            res.status(200).json({message: `Existing email ${email} subscribed to ${keyword}.` })
        }
        existingUser.save() 
        return
    }
    else {
        let userObject = User({ name, email, keywords: [keywordID] })
        let user = await User.create(userObject)
        res.status(201).json({ message: `${email} subscribed to ${keyword}.` })
    }

    console.log("Done") 
})

// @desc Update a user
// @route PATCH /keywords
// For unsubscribing
const updateUsers = asyncHandler(async(req, res) => {
    const {name, email, keyword} = req.body
    if( !name || !email || !keyword ) {
        return res.status(400).json({ message: "No input provided."}) // request will be embedded with correct data 
    }

    const keywordID = await Keyword.findOne(keyword.toLowerCase())._id

    // utilize updateOne, and modify keyword array
        // if matchedCount == 0: return no user
        // if modifiedCount == 1: return user updated
        // else: return message error updating user.
    const existing = await User.updateOne({ email }, { $pull: { keywords: keywordID } }) // remove keyword
    if(existing.matchedCount == 0) { // if not signed up
        res.status(404).json({ message: `${email} not subscribed to ${keyword}` })
    } else if (existing.modifiedCount == 1) {
        res.status(200).json({ message: `${email} unsubscribed from ${keyword}.` })
    } else {
        res.status(400).json({ message: `Unable to process request.`})
    }
})

// @desc Delete a user
// @route DELETE /keywords
// @access Private (not implemented yet)
const deleteUsers = asyncHandler(async(req, res) => {
    res.status(405).json({ message: "Deleting users not implemented."}) // connect to email link
})

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}








// create new users: query v1
    // // check if user is subscribed to keyword. something is wrong with the array update
    // var existingUser = await User.findOne({email, keywords: keywordID})
    // if (existingUser) {
    //     return res.status(201).json({ message: `${email} already subscribed to ${keyword}.`})
    // }
    // // check if previously signed up, else create user
    // var existingUser = await User.updateOne({ email }, { $push: { keywords: keywordID }}) // appends new keyword
    // if(existingUser.matchedCount == 0) { // if not signed up
    //     let userObject = User({ name, email, keywords: [keywordID] })
    //     let user = await User.create(userObject)
    //     res.status(201).json({ message: `${email} subscribed to ${keyword}.` })
    // } else {
    //     return res.status(200).json({message: `Existing email ${email} subscribed to ${keyword}.` })
    // }