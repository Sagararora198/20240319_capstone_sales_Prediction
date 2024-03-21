/** email validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function emailValidator(input){

    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/
    return emailRegex.test(input)
}
/** username validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function usernameValidator(input){
    if(!input){
        return false
    }
    if(input.length>20){
        return false
    }
    return true
}

export {emailValidator,usernameValidator}