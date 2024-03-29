//external dependencies
import express, { json } from "express"
import 'dotenv/config'
import mongoose from "mongoose"
import cors from 'cors'

//internal dependencies
import {router as userRouter} from "./routes/user.js"
import { postRouter } from "./routes/sales.js"

const app = express()

//middlewares
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(json())

// routes
app.use('/user',userRouter)
app.use('/sale',postRouter)

//connection and server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
        const server = app.listen(process.env.PORT, () => {
            console.log("Listining on " + process.env.PORT);
         })
         server.on('error',(error)=>{
            console.error('Failed to start the server:', err);
         })
        
    })
    .catch(err=>{
        console.log("cannot connect to mongo");
        console.log(err);
    })

    
