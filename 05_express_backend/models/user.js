import mongoose from "mongoose";

//internal dependencies
import { emailValidationMessage, userNameValidationMessage } from "../dependencies/constants/userConstants.js";
import { emailValidator,usernameValidator } from "../dependencies/validations/userValidations.js";



const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        validate:{
            validator:usernameValidator,
            message:userNameValidationMessage
        }
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:emailValidator,
            message:emailValidationMessage
        }
            
    },


})
const Users = mongoose.model('Users',userSchema)
export default Users