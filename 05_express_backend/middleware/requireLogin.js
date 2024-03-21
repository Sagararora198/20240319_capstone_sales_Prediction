//external dependencies
import 'dotenv/config'
import jwt from 'jsonwebtoken'


//internal dependencies


//Require Function to Login
const requireLogin = (req,res,next)=>{
    const{authorization} = req.headers
    // console.log(authorization);
    if(!authorization){
        res.status(401).json({error:"you are not logged in"})
    }
    const token = authorization.replace("Bearer ","")
    // console.log(token);
    jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})

        }
        const userdata = payload
        req.user = userdata
        next()
        })
    }
    
export default requireLogin