/** To catch all the errors encountered in bcrypt.compare()
 * 
 * @param {Error} err error object caught from a failed 'bcrypt.compare()' operation
 * @param {Response} res Express response object with appropriate status code 
 * @returns {Response} Response object with appropriate error message and status code
 */
function compareError(err,res){
    console.error('An error occurred during password comparison:', err.message);


  if (err.message.includes('data and hash arguments required')) {
    // This indicates that one of the arguments was not provided
    console.error('Missing arguments for bcrypt.compare.');
    res.status(500).json({message:"Missing arguments for bcrypt.compare."})
    
  } else {
    // Handle other types of errors
    console.error('An unexpected error occurred during password comparison.');
    res.status(500).json({message:"An unexpected error occurred during password comparison"})
  }
}
export default compareError