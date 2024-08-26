const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUsers)
    .patch(usersController.updateUsers)
    .delete(usersController.deleteUsers)

router.route('/demo')
    .post(usersController.getDemo)

module.exports = router