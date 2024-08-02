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
const createNewUsers = asyncHandler(async(req, res) => {
    // call this on submite for front end
    // check all is filled in. 
    // query keyword, then pass id into new user 
    // else, create new keyword, hold id, pass to new user

    const {name, email, keyword} = req.body
    if( !name || !email || !keyword ) {
        return res.status(400).json({ message: "No input provided."}) // form will have checked for correct formatting
    }

    const keywordID = await Keyword.findOne(keyword.toLowerCase())._id

    // check if previously signed up
    const existing = await User.updateOne({ email }, { $push: { keywords: keywordID }}) // appends new keyword
    if(existing.matchedCount == 0) { // if not signed up
        const userObject = User({ name, email, keywordID })
        const user = await User.create(userObject)
        res.status(201).json({ message: `${email} subscribed to ${keyword}.` })
    } else {
        res.status(200).json({message: `Existing email ${email} subscribed to ${keyword}.` })
    }

    console.log("Done") // why isnt this printing
})

// @desc Update a user
// @route PATCH /keywords
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
