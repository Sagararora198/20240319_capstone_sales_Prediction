// external dependencies
import express from 'express'
const router = express.Router()

// internal dependencies
import { register,login } from '../controller/userController.js'
router.post('/signup',register)

router.post('/login',login)


export  {router} 