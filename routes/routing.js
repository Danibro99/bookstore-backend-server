//importing express
const express = require('express')

const userController = require('../controller/userController')

//create a router object
const router = new express.Router()

//define path for client api req
//register
router.post('/register',userController.registerController)

module.exports = router