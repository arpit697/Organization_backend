// import { exec } from "child_process";
// import fs from "fs";
// import path from "path";

// class TestingService {
//   async extractTextFromPdf(pdfPath: string) {
//     return new Promise((resolve, reject) => {
//       const outputPath = path.join(__dirname, "output.txt");
//       const gsCommand = `gswin64 -q -dNOPAUSE -sDEVICE=txtwrite -o ${outputPath} ${pdfPath}`;

//       exec(gsCommand, (error, stdout, stderr) => {
//         if (error) {
//           return reject(new Error(`Ghostscript error: ${stderr || error.message}`));
//         }

//         fs.readFile(outputPath, "utf8", (err, data) => {
//           if (err) {
//             return reject(new Error(`File read error: ${err.message}`));
//           }
//           resolve(data);
//         });

//         // Clean up the temporary text file after reading
//         fs.unlink(outputPath, (err) => {
//           if (err) {
//             console.error(`Error deleting ${outputPath}: ${err}`);
//           }
//         });
//       });
//     });
//   }

//   async analyzeText(text: string) {
//     const words = text.split(/\s+/);
//     const wordCount = words.length;
//     return { wordCount };
//   }
// }

// export const testingService = new TestingService();
