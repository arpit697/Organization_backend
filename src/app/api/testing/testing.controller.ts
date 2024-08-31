// import { NextFunction, Request, Response } from "express";
// import { testingService } from "./testing.service";
// import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
// import multer from "multer";
// import path from "path";
// // import TextSummarizer from "./sumarizer";
// // import * as tf from '@tensorflow/tfjs';

// const upload = multer({ dest: "uploads/" });

// @ApiPath({
//   path: "/pdf",
//   name: "Pdf",
// })
// class TestingController {
//   @ApiOperationPost({
//     description: "Upload a PDF file for text extraction and analysis",
//     summary: "Upload PDF",
//     parameters: {
//       formData: {
//         file: {
//           type: "file",
//           required: true,
//           description: "PDF file to upload",
//         },
//       },
//     },
//     responses: {
//       200: {
//         description: "Success",
//         type: "String",
//       },
//       400: {
//         description: "Bad Request",
//       },
//     },
//   })
//   async uploadPdf(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> {
//     try {
//       if (!req.file) {
//         return res.status(400).send("No file uploaded.");
//       }

//       const file: Express.Multer.File = req.file;
//       const pdfPath = file.path;
      
//       const text: any = await testingService.extractTextFromPdf(pdfPath);

    
//       return res.json({ text });
//     } catch (error) {
//       return next(error);
//     }
//   }

//   // @ApiOperationGet({
//   //   description: "test",
//   //   summary: "test",
//   //   parameters: {
//   //     formData: {
//   //       file: {
//   //         type: "",
//   //         required: false,
//   //         description: "PDF file to upload",
//   //       },
//   //     },
//   //   },
//   //   responses: {
      
//   //   },
//   // })
// //   async testContrller(req: Request,
// //     res: Response,
// //     next: NextFunction){
// //       const xVlaues = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]
// //       const yVlaues = [[10],[20],[30],[40],[50],[60],[70],[80],[90],[100]]

// //       const xs = tf.tensor(xVlaues)
// //       const ys = tf.tensor(yVlaues)

// //       const model = tf.sequential()
// //       model.add(tf.layers.dense({units:1 , inputShape:[1]}))

// //       model.compile({optimizer:'sgd', loss:'meanSquaredError'})

// //       await model.fit(xs,ys , {epochs:1500})
// //       const input = tf.tensor2d([[15] , [1,1]])

// //       const output = model.predict(input)
// //       console.log(output)
// //     }
// }

// export const testingController = new TestingController();






//     // Initialize and load the TextSummarizer model
//     //   const summarizer = new TextSummarizer();
//     //   await summarizer.loadModel();
  
//     //    // Convert text to numerical data (if necessary)
//     // // Example: Convert text to numerical values using ASCII codes
//     // const numericalData = text.split('').map((char: string) => char.charCodeAt(0));

//     // // Ensure the input has the correct size
//     // const paddedData = numericalData.slice(0, 784); // Ensure the input has 784 values
      
//     // // Convert to a tensor with the correct shape
//     // const inputTensor = tf.tensor2d([paddedData], [1, 784]);

//     // // Make prediction using the loaded model
//     // const summary = await summarizer.predict(inputTensor);

//     // console.log('Summary:', summary);