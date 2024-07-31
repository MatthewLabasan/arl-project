const asyncHandler = require('express-async-handler') 
const User = require('../models/User')

// @desc Get all users
// @route GET /users
// @access Private (not implemented yet)
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    if(!users) {
        res.status(400).json({ message: "No users."})
    }
    res.json(users)
})

// @desc Create new user
// @route POST /article
// @access Private (not implemented yet)
const createNewUsers = asyncHandler(async(req, res) => {
    // call this on submite for front end
    // check all is filled in. 
    // query keyword, then pass id into new user 
    // else, create new keyword, hold id, pass to new user

    res.status(405).json({ message: "Creation of new articles not allowed."})
})

// @desc Update a user
// @route PATCH /keywords
// @access Private (not implemented yet)
const updateUsers = asyncHandler(async(req, res) => {
    res.status(405).json({ message: "Updating users not implemented."})
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
