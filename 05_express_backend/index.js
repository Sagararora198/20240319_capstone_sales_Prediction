//external dependencies
import express, { json } from "express"
import 'dotenv/config'
import mongoose from "mongoose"


//internal dependencies
import {router as userRouter} from "./routes/user.js"
import { postRouter } from "./routes/sales.js"

const app = express()

//middlewares
app.use(json())
app.use(express.urlencoded({extended:false}))







app.use('/user',userRouter)
app.use('/sale',postRouter)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
        app.listen(process.env.PORT, () => {
            console.log("Listining on " + process.env.PORT);
         })
    })

    
