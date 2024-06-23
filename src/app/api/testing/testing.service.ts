import { testingModel } from "./testing.model";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

class TestingService {
  async getWeatherData(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    // Execute both find query and countDocuments query concurrently
    const [data, totalCount] = await Promise.all([
      testingModel.find({}).skip(skip).limit(limit).lean(), // lean() for faster query result without Mongoose overhead
      testingModel.countDocuments({}),
    ]);

    return {
      totalCount,
      page,
      limit,
      data,
    };
  }

  async addWeatherData(payload: any) {
    return await testingModel.create(payload);
  }

  async extractTextFromPdf(pdfPath: string) {
    return new Promise((resolve, reject) => {
      const outputPath = path.join(__dirname, "output.txt");
      const gsCommand = `gs -sDEVICE=txtwrite -o ${outputPath} ${pdfPath}`;
      exec(gsCommand, (error, stdout, stderr) => {
        if (error) {
          return reject(new Error(`Ghostscript error: ${stderr}`));
        }

        fs.readFile(outputPath, "utf8", (err, data) => {
          if (err) {
            return reject(new Error(`File read error: ${err.message}`));
          }
          resolve(data);
        });
      });
    });
  }
}

export const testingService = new TestingService();
