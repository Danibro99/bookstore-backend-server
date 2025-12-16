//importing express
const express = require('express')

const userController = require('../controller/userController')

const bookController = require('../controller/bookController')

const jwtMiddleware = require('../middleware/jwtMiddleware')

const multerMiddleware = require('../middleware/multerMiddleware')

//create a router object
const router = new express.Router()

//define path for client api req
//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google/sign-in',userController.googleLoginController)

//authorised user

//add book 
router.post('/user/books/add',jwtMiddleware,multerMiddleware.array('uploadIMG',3),bookController.addBookController)

module.exports = router