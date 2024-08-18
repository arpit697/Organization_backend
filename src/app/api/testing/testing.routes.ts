// import { Router } from 'express';
// import { testingController } from './testing.controller';
// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Uploads directory
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Use the original file name
//     }
// });

// const upload = multer({ storage: storage });
// const testingRouter: Router = Router();
// // testingRouter.route('/').get(testingController.testContrller).post(upload.single('file'),testingController.uploadPdf);


// export const testingRoutes = testingRouter;
