//external dependencies
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
//internal dependencies
import Users from '../models/user.js'
import 'dotenv/config'
import validateUser,{validateEmail,validatePassword,validateUserId} from '../dependencies/validators/userValidator.js'
import { Router } from 'express'

const register = async(req,res)=>{
    try{
        validateUser(req.body)
        const {userName,email,password} = req.body

        // check if user exist
        const existingUser = await Users.findOne({email:email})
        if(existingUser){
            return res.status(409).json({
                error:"Email already exist try loginig in"
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10)
            // Create a new User document with provided user details
    const newUser = new Users({
        userName,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);

        

    }
    catch(error){
        console.error(error);

        // Check if the error is a validation error
        if (
          error.name === "ValidationError" ||
          error.message.startsWith("ValidationError")
        ) {
          return res.status(400).json({ error: error.message });
        }
    
        res.status(500).json({ error: "Internal Server Error" });

    }
}

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Validation
        try {
          validateEmail(email); // Validate email
          validatePassword(password); // Validate password
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
    
        // Find user by email
        const user = await Users.findOne({ email });
        if (!user) {
          return res.status(401).json({
            error: "Invalid email or password.",
          });
        }
    
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({
            error: "Invalid email or password.",
          });
        }
        // Generate JWT token
        const token = jwt.sign(
          { email: user.email,_id:user._id},
          process.env.SECRET_KEY,
          { expiresIn: "1h" } // Token expires in 1 hour
        );
    
        res.status(200).json({
          message: "Login successful.",
          token: token,
          userId:user._id, 
          expiresIn: 3600, // Token expires in 1 Month
        });
        console.log("success");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

const getUserById = async(req,res)=>{
    try {
        const { userId } = req.query;
    
        // Validate userId existence
        validateUserId(userId);
    
        // Find the user in the database using the provided userId
        const user = await Users.findOne({ _id: userId });
    
        // Check if the user exists
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Respond with the user details
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

export {register,login}