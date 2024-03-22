// external dependencies
import fs from 'fs'
import csv from 'csv-parser'


// internal dependencies
import { rejects } from 'assert';
import Sales from '../models/sales.js'
import { spawn } from 'child_process'

/** upload a file
 * Handles the uploading of sales data files by users, including saving the file's path and other metadata to the database.
 * This function checks if a file with the same title already exists in the database to avoid duplicates.
 * If a duplicate is found, it responds with a 409 status code and an error message.
 * Otherwise, it proceeds to save the new file data and responds with a success message.
 *
 * @async
 * @function postSalesData
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @param {Object} req.file - The file object provided by the file upload middleware, containing file details such as path.
 * @param {Object} req.body - The body of the request, containing the sales data file metadata.
 * @param {string} req.body.fileTitle - The title of the file being uploaded.
 * @param {string} req.body.periodicity - The periodicity of the sales data (e.g., monthly, yearly).
 * @param {string} req.body.predictColumn - The name of the column used for predictions.
 * @param {string} req.body.dateColumn - The name of the date column in the sales data.
 * @param {Object} req.user - The user object extracted from the request, typically from authentication middleware.
 * @param {string} req.user._id - The unique identifier of the user uploading the file.
 * @returns {Promise<void>} A promise that resolves with no value. The function itself handles sending
 * the response to the client, either by returning a success message for the file upload or by sending an appropriate error message.
 * @throws {Error} Throws an error if there's an issue during the file upload process, such as database errors.
 *
 * @description This function is part of the sales data management system and allows authenticated users to upload sales data files.
 * It ensures that each uploaded file has a unique title to prevent duplicates in the system.
 */
const postSalesData = async (req, res) => {
    console.log(req.file);
    const { fileTitle, periodicity, predictColumn, dateColumn } = req.body
    // console.log(req.body);
    const { path, mimetype } = req.file
    const { user } = req
    // console.log(user);
    // Check if the file is of type CSV
    const allowedMimeTypes = ['text/csv', 'application/vnd.ms-excel'];
    if (!allowedMimeTypes.includes(mimetype)) {
        return res.status(400).json({ message: "Invalid file type. Please upload a CSV file." });
    }
    const savedCsv = await Sales.findOne({ fileTitle: fileTitle })
    if (savedCsv) {
        res.status(409).json({ message: "csv with this file title already exist try different unique title" })
    }
    const saleData = new Sales({
        fileTitle: fileTitle,
        periodicity: periodicity,
        predictColumn: predictColumn,
        uploadedBy: user._id,
        filePath: path,
        dateColumn: dateColumn
    })
    await saleData.save()
    res.status(200).json({ message: "file uploaded successfully" })
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

const getcsvData = async (req, res) => {
    try {
        const { title } = req.query
        const { user } = req
        const savedFile = await Sales.findOne({ fileTitle: title, uploadedBy: user._id })
        if (!savedFile) {
            return res.status(404).json({ message: "You do not have any file with this name" });
        }
        const path = savedFile.filePath
        const results = []
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // Send the results array as JSON
                res.status(200).json(results);
            });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export { postSalesData, getcsvData }