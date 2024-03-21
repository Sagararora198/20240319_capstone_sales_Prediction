import mongoose from "mongoose";
import Users from "./user.js";
import { periodicity } from "../dependencies/constants/userConstants.js";
const saleSchema = new mongoose.Schema({
    fileTitle:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true

    },
    periodicity:{
        type:String,
        enum:[periodicity.DAILY,periodicity.MONTHLY,periodicity.WEEKLY,periodicity.YEARLY],
        required:true

    },
    predictColumn:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Users
    },
    dateColumn:{
        type:String,
        required:true
    }
})

const Sales = mongoose.model('Sales',saleSchema)
export default Sales