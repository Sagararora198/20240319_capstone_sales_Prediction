//external dependencies
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'


//internal dependencies
import Users from '../models/user.js'
import Sales from '../models/sales.js'
import UserToken from '../models/userToken.js'
import 'dotenv/config'
import validateUser,{validateEmail,validatePassword,validateUserId} from '../dependencies/validators/userValidator.js'

/**Registers a new user
 * Registers a new user by validating the provided user details, checking if the user already exists,
 * hashing the user's password, and saving the new user to the database. If the user already exists,
 * or if there's a validation error or any other error, it responds with the appropriate error message.
 *
 * @async
 * @function register
 * @param {Object} req - The request object from the client. It must contain a body with the user's details.
 * @param {Object} req.body - The body of the request, containing the user's registration details.
 * @param {string} req.body.userName - The user's chosen username.
 * @param {string} req.body.email - The user's email address. It is used to check if the user already exists.
 * @param {string} req.body.password - The user's chosen password. It will be hashed before saving.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @returns {Promise<void>} A promise that resolves with no value. The function itself handles sending
 * the response to the client, either by registering the user and returning the saved user document or
 * by sending an appropriate error message.
 * @throws {ValidationError} Throws a ValidationError if the user's details fail validation checks.
 * @throws {Error} Throws a generic Error if there's an internal server error or any other unexpected error.
 */
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
/** Login a user
 * Authenticates a user by validating the provided email and password, comparing the password with the hashed password in the database, and generating a JWT token if authentication is successful. If the email or password is invalid, or if there's an error during the process, it responds with the appropriate error message.
 *
 * @async
 * @function login
 * @param {Object} req - The request object from the client. It must contain a body with the user's login details.
 * @param {Object} req.body - The body of the request, containing the user's login details.
 * @param {string} req.body.email - The user's email address. It is used to find the user in the database.
 * @param {string} req.body.password - The user's password. It is compared with the hashed password stored in the database.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @returns {Promise<void>} A promise that resolves with no value. The function itself handles sending
 * the response to the client, either by authenticating the user and returning a JWT token or by sending an appropriate error message.
 * @throws {Error} Throws a generic Error if there's an internal server error or any other unexpected error.
 *
 * @description This function performs several steps to authenticate a user:
 * 1. Validates the provided email and password using custom validation functions. If validation fails, it returns a 400 status code with an error message.
 * 2. Searches for a user in the database with the provided email. If no user is found, it returns a 401 status code with an error message indicating invalid email or password.
 * 3. Compares the provided password with the hashed password stored in the database using bcrypt. If the comparison fails, it returns a 401 status code with an error message indicating invalid email or password.
 * 4. Generates a JWT token using the user's email and ID if authentication is successful. The token is set to expire in 1 hour.
 * 5. Responds with a 200 status code, the generated token, the user's ID, and the token's expiration time in seconds.
 */
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
/** retrive user  info
 * Retrieves a user's details from the database using the user ID provided in the request object.
 * This function first validates the user ID to ensure it's in the correct format and then queries
 * the database for a user with that ID. If the user is found, their details are returned. If the user
 * is not found, a 404 status code with a "User not found" message is returned. Any errors encountered
 * during the process result in a 500 status code and an "Internal Server Error" message.
 *
 * @async
 * @function getUserById
 * @param {Object} req - The request object from the client. It must contain a user object with an _id property.
 * @param {Object} req.user - The user object extracted from the request, typically from authentication middleware.
 * @param {string} req.user._id - The unique identifier of the user to retrieve.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @returns {Promise<void>} A promise that resolves with no value. The function itself handles sending
 * the response to the client, either by returning the user's details or by sending an appropriate error message.
 * @throws {Error} Throws a generic Error if there's an internal server error or any other unexpected error.
 *
 * @description This function performs several steps to retrieve a user's details:
 * 1. Validates the provided user ID using a custom validation function. If validation fails, it returns a 400 status code with an error message.
 * 2. Searches for a user in the database with the provided user ID. If no user is found, it returns a 404 status code with a "User not found" message.
 * 3. If the user is found, it responds with a 200 status code and the user's details.
 */
const getUserById = async(req,res)=>{
    try {
        const {user} = req
    
        // Validate userId existence
        validateUserId(user._id);
    
        // Find the user in the database using the provided userId
        const fetchedUser = await Users.findOne({ _id: user._id });
    
        // Check if the user exists
        if (!fetchedUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Respond with the user details
        res.status(200).json(fetchedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

/** retrive saved csv by user
 * Retrieves all CSV files saved by a specific user from the database.
 * This function first validates the user ID to ensure it's in the correct format and then queries
 * the database for all sales files uploaded by the user. If no files are found for the user, a 404 status code
 * with a "User not found" message is returned. If files are found, their details are returned. Any errors encountered
 * during the process result in a 500 status code and an "Internal Server Error" message.
 *
 * @async
 * @function getSavedCsv
 * @param {Object} req - The request object from the client. It must contain a user object with an _id property.
 * @param {Object} req.user - The user object extracted from the request, typically from authentication middleware.
 * @param {string} req.user._id - The unique identifier of the user whose saved CSV files are to be retrieved.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @returns {Promise<void>} A promise that resolves with no value. The function itself handles sending
 * the response to the client, either by returning the details of the saved CSV files or by sending an appropriate error message.
 * @throws {Error} Throws a generic Error if there's an internal server error or any other unexpected error.
 *
 * @description This function performs several steps to retrieve the saved CSV files for a user:
 * 1. Validates the provided user ID using a custom validation function. If validation fails, it returns a 400 status code with an error message.
 * 2. Searches for all sales files in the database uploaded by the user with the provided user ID. If no files are found, it returns a 404 status code with a "User not found" message.
 * 3. If files are found, it responds with a 200 status code and the details of the saved CSV files.
 */
const getSavedCsv = async(req,res)=>{
    try {
        const {user} = req
    
        // Validate userId existence
        validateUserId(user._id);
    
        // Find the user in the database using the provided userId
        const fetchedFiles = await Sales.find({ uploadedBy: user._id });
    
        // Check if the user exists
        if (!fetchedFiles) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Respond with the user details
        res.status(200).json(fetchedFiles);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

/** forgot password controller
 * Initiates a password reset process for a user by generating a password reset token and sending it via email.
 * This function performs several steps:
 * 1. It attempts to find a user in the database by the provided email address. The search is case-insensitive.
 * 2. If the user is found, it generates a JWT token with the user's email as the payload and a short expiry time.
 * 3. The token is then saved to the database associated with the user's ID.
 * 4. An email is sent to the user with a link to reset their password. This link includes the generated token as a query parameter.
 * 5. If the email is successfully sent, a success response is returned to the client.
 * If any step fails, an error is passed to the next middleware function for error handling.
 *
 * @async
 * @function forgetPassword
 * @param {Object} req - The request object from the client. It must contain a body with the user's email address.
 * @param {Object} req.body - The body of the request, containing the user's email address.
 * @param {string} req.body.email - The user's email address. It is used to find the user in the database.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @param {Function} next - The next middleware function in the stack. Used for error handling.
 * @returns {Promise<void>} A promise that resolves with no value. The function itself handles sending
 * the response to the client, either by sending a success message for the password reset instructions or
 * by passing an error to the next middleware function.
 * @throws {Error} Throws an error if there's an issue during the process, such as finding the user, generating the token,
 * saving the token, configuring the email transporter, preparing the email options, or sending the email.
 *
 * @description This function is part of the authentication system and allows users to initiate a password reset process
 * if they have forgotten their password. It ensures that the user exists, generates a secure token, saves it, and sends
 * an email with instructions on how to reset the password. It is designed to provide a secure way for users to regain access
 * to their accounts.
 */
const forgetPassword = async (req, res, next) => {
        const email = req.body.email;
      
        try {
          // Find user by email
          const user = await Users.findOne({ email: { $regex: email, $options: 'i' } });
      
          // If user not found, create and return a custom 404 error
          if (!user) {
            return next(createError(404, "User not found"));
          }
      
          // Payload for JWT token
          const payload = {
            email: user.email
          };
      
          // Expiry time for JWT token (in seconds)
          const expiryTime = 300;
      
          // Sign JWT token with payload and secret key
          const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiryTime });
      
          // Save token in the database
          const newToken = new UserToken({
            userId: user._id,
            token: token
          });
    
          try {
            // Attempt to save the token
            await newToken.save();
    
            // Configure nodemailer transporter
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'sagar.arora198@gmail.com',
                pass: 'guxi sxsp qbpp ykqp'
              }
            });
      
           // Email options
           const resetButtonLink = `${process.env.LIVE_URL}/reset-password?token=${token}`;
           const mailOptions = {
               from: 'sagar.arora198@gmail.com',
               to: user.email,
               subject: 'Password Reset Instructions',
               html: `
               <html> 
               <head> 
                   <title>Password Reset Request</title> 
               </head> 
               <body> 
                   <h1>Password reset request</h1> 
                   <p>Dear ${user.userName},</p> 
                   <p>We have received a request to reset your password for your account. To complete the password reset process, please click on the button below:</p>
                   <a href="${process.env.LIVE_URL}/reset-password/${token}" style="text-decoration: none;">
                  <button style="background-color: #4CAF50; color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; padding: 14px 20px; border: none; border-radius: 4px; cursor: pointer;">
                    Reset Password
                  </button>
                   </a>
                   <p>Please note that this link is only valid for 5 minutes. If you did not request a password reset, please discard this message.</p>
                   <p>Thank you</p> 
               </body>
           </html>
                    `
           };
    
            // Send email
            await transporter.sendMail(mailOptions);
      
            // Send response
            res.status(200).json({ success: true, message: "Password reset instructions sent" });
          } catch (error) {
            // If an error occurs during sending email, handle it
            return next(error);
          }
        } catch (error) {
          // If an error occurs during finding user or saving token, handle it
          return next(error);
        }
    };  
/** reset password controller
 * Resets a user's password by verifying a provided JWT token, finding the user associated with the token,
 * hashing the new password, and updating the user's password in the database. It requires a valid token and
 * a new password to be provided. If any step fails, it responds with the appropriate error message.
 *
 * @async
 * @function resetPassword
 * @param {Object} req - The request object from the client. It must contain a body with the new password and a query with the reset token.
 * @param {Object} req.body - The body of the request, containing the new password.
 * @param {string} req.body.newPassword - The user's new password to be set.
 * @param {Object} req.query - The query parameters of the request, containing the reset token.
 * @param {string} req.query.token - The JWT token used for verifying the user's identity and permission to reset the password.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @param {Function} next - The next middleware function in the stack. Used for error handling.
 * @returns {Promise<void>} A promise that resolves with no value. The function itself handles sending
 * the response to the client, either by resetting the password and returning a success message or by sending an appropriate error message.
 * @throws {Error} Throws an error if there's an issue during the process, such as token verification failure, user not found, or database update errors.
 *
 * @description This function is part of the authentication system and allows users to reset their password using a secure process.
 * It ensures that the token is valid, finds the user associated with the email in the token, hashes the new password, and updates
 * the user's password in the database. It is designed to provide a secure way for users to update their password.
 */    
const resetpassword = async (req, res, next) => {
        try {
            const { newPassword } = req.body;
            const token = req.query.token; // Extracting token from query parameters
    
            // Check if token and newPassword are provided
            if (!token || !newPassword) {
                return res.status(400).json({ message: 'Token and newPassword are required' });
            }
    
            // Verify the JWT token
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid or expired token' });
                }
    
                const email = decoded.email;
                console.log(email);
    
                // Find user by ID
                const user = await Users.findOne({email:email});
    
                // Check if user exists
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                // Encrypt the new password
                const salt = await bcrypt.genSalt(10);
                const encryptedPassword = await bcrypt.hash(newPassword, salt);
    
                // Update user's password
                user.password = encryptedPassword;
    
                try {
                    // Save the updated user
                    const updateUser = await Users.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true });
    
                    // Respond with success message
                    return res.status(200).json({ message: 'Password reset successfully' });
                } catch (error) {
                    console.error('Error updating user:', error);
                    return res.status(500).json({ message: 'Something went wrong' });
                }
            });
        } catch (error) {
            console.error('Error resetting password:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

// exporting the conrollers
export {register,login,getUserById,getSavedCsv,forgetPassword,resetpassword}

