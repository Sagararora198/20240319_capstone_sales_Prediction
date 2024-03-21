// external dependencies
import express from 'express'


// internal dependencies
import { register,login,getUserById, getSavedCsv, forgetPassword, resetpassword } from '../controller/userController.js'
import requireLogin from '../middleware/requireLogin.js'

// initializing router
const router = express.Router()

//signup route
router.post('/signup',register)
// login route
router.post('/login',login)

// get user route
router.get('/user',requireLogin,getUserById)

// get saved sales data
router.get('/files',requireLogin,getSavedCsv)

//forgot password route
router.post('/forgot-password',forgetPassword)

// reset password route
router.post("/reset-password",resetpassword)


export  {router} 