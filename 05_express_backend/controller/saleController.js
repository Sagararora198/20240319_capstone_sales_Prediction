// external dependencies

// internal dependencies
import { rejects } from 'assert';
import requireLogin from '../middleware/requireLogin.js'
import Sales from '../models/sales.js'
import {spawn} from 'child_process'
const postSalesData =async(req,res)=>{
    console.log(req.file);
    const {fileTitle,periodicity,predictColumn,dateColumn} = req.body
    // console.log(req.body);
    const {path} = req.file
    const {user} = req
    console.log(user);
    const saleData = new Sales({
        fileTitle:fileTitle,
        periodicity:periodicity,
        predictColumn:predictColumn,
        uploadedBy:user._id,
        filePath:path,
        dateColumn:dateColumn
    })
    await saleData.save()
    res.status(200).json({message:"file uploaded successfully"})
}

// const getprediction = async(req,res)=>{
//     const filePath = "./uploads/1710933737412-sales_data_sample"
//     const dateColumn = 'Month'
//     const salesColumn = "Sales" 
//     const runPythonScript = (filePath,dateColumn,salesColumn)=>{
//         return new Promise((resolve,reject)=>{
//             const args = ['prediction.py',filePath]
//             const pythonProcess = spawn('python',args)
//             let scriptOutput = ''
//             pythonProcess.stdout.on('data',(data)=>{
//                 scriptOutput += data.toString()
//             })
//             pythonProcess.stderr.on('data', (data) => {
//                 reject(data.toString());
//               });
//               pythonProcess.on('close', (code) => {
//                 if (code !== 0) {
//                   reject(new Error(`Python script exited with code ${code}`));
//                 } else {
//                     try {
//                       // Parse the output as JSON
//                       const predictions = JSON.parse(scriptOutput);
//                       resolve(predictions);
//                     } catch (error) {
//                       reject(new Error('Failed to parse predictions as JSON'));
//                     }
//                 }
//               });
//         })
//     }
//     runPythonScript(filePath, dateColumn,salesColumn)
//     .then(predictions => {
//       res.send({
//         message: 'Python script executed successfully',
//         prediction: predictions
//       });
//     })
//     .catch(error => {
//       console.error('Error running Python script:', error);
//       res.status(500).json({
//         message: 'Error running Python script',
//         error: error.message
//       });
//     });
     

// }
export {postSalesData}