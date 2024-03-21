// external dependencies
import express from 'express'
const router = express.Router()

// internal dependencies
import { register,login,getUserById, getSavedCsv, forgetPassword, resetpassword } from '../controller/userController.js'
import requireLogin from '../middleware/requireLogin.js'
router.post('/signup',register)

router.post('/login',login)

router.get('/user',requireLogin,getUserById)

router.get('/files',requireLogin,getSavedCsv)

router.post('/forgot-password',forgetPassword)

router.post("/reset-password",resetpassword)
export  {router} 