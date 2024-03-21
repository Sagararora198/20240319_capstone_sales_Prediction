// external dependencies
 import express from 'express'
//internal dependencies
import { postSalesData,getprediction } from '../controller/saleController.js'
import requireLogin from '../middleware/requireLogin.js'
import multer from "multer"

const router = express.Router()
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)    
    }
})
const upload =multer({storage:storage})

router.post('/upload',requireLogin,upload.single('file'),postSalesData)

router.get('/prediction',requireLogin,getprediction)
export {router as postRouter}