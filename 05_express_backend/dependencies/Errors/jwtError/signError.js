/** To catch all the errors encountered in jwt.sign()
 * 
 * @param {Error} err error object caught from a failed 'jwt.sign()' operation
 * @param {Response} res Express response object with appropriate status code 
 * @returns {Response} Response object with appropriate error message and status code
 */
function signErrors(err, res) {
    if (err.name === 'JsonWebTokenError') {
        res.send(500).json({ message: `invalid input to jwt.sign ${err.message}` })
    }
    else {
        res.send(500).json({ message: `internal error` })
    }
}
export default signErrors