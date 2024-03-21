// external dependencies
 import express from 'express'
 import multer from "multer"
//internal dependencies
import { postSalesData,getcsvData } from '../controller/saleController.js'
import requireLogin from '../middleware/requireLogin.js'


//initializing router
const router = express.Router()
//initializing storage for multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)    
    }
})
// uploading through multer
const upload =multer({storage:storage})

// route to upload file
router.post('/upload',requireLogin,upload.single('file'),postSalesData)

//route to getcsvData
router.get('/myfile',requireLogin,getcsvData)
export {router as postRouter}