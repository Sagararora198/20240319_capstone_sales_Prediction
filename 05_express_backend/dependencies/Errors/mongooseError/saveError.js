/** To catch all the errors encountered in mongoose model.save()
 * 
 * @param {Error} err error object caught from a failed 'save' operation
 * @param {Response} res Express response object with appropriate status code 
 * @returns {Response} Response object with appropriate error message and status code
 */
function saveErrors(err,res){
    if (err.name === 'ValidationError') {
        console.error('Validation Error:', err.message);
        res.status(400).json({error:err.message})
        // Handle validation error
      } else if (err.code === 11000) {
        console.error('Duplicate Key Error:', err.message);
        res.status(400).json({error:"key getting duplicated"})
        // Handle duplicate key error
      } else {
        console.error('An error occurred:', err.message);
        res.send(500).json({error:"Internal server error"})

        // Handle other types of errors

}
}
export default saveErrors