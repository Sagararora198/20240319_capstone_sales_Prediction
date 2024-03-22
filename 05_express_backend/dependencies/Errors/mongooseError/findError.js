/** To catch all the errors encountered in mongoose model.findOne()
 * 
 * @param {Error} err error object caught from a failed 'findOne' operation
 * @param {Response} res Express response object with appropriate status code 
 * @returns {Response} Response object with appropriate error message and status code
 */
function findErrors(err, res) {
  // Handle errors based on their type
  if (err.name === 'CastError') {
    console.error('CastError occurred:', err.message);
    res.status(400).json({ error: err.message })
    return
    // Handle CastError
  } else if (err.name === 'ValidationError') {
    console.error('ValidationError occurred:', err.message);
    return res.status(400).json({ error: err.message });
    // Handle ValidationError
  } else if (err.name === 'MongoNetworkError') {
    console.error('Network error occurred:', err.message);
    res.status(500).json({ error: "Mongo Server Error" })
    // Handle network errors
  } else {
    // Handle other types of errors
    console.error('An error occurred:', err.message);
    res.status(500).json({ error: "Internal server error" })
  }
}
export default findErrors