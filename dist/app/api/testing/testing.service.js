"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingService = void 0;
const testing_model_1 = require("./testing.model");
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class TestingService {
    getWeatherData() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            // Execute both find query and countDocuments query concurrently
            const [data, totalCount] = yield Promise.all([
                testing_model_1.testingModel.find({}).skip(skip).limit(limit).lean(), // lean() for faster query result without Mongoose overhead
                testing_model_1.testingModel.countDocuments({}),
            ]);
            return {
                totalCount,
                page,
                limit,
                data,
            };
        });
    }
    addWeatherData(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield testing_model_1.testingModel.create(payload);
        });
    }
    extractTextFromPdf(pdfPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const outputPath = path_1.default.join(__dirname, "output.txt");
                const gsCommand = `gs -sDEVICE=txtwrite -o ${outputPath} ${pdfPath}`;
                (0, child_process_1.exec)(gsCommand, (error, stdout, stderr) => {
                    if (error) {
                        return reject(new Error(`Ghostscript error: ${stderr}`));
                    }
                    fs_1.default.readFile(outputPath, "utf8", (err, data) => {
                        if (err) {
                            return reject(new Error(`File read error: ${err.message}`));
                        }
                        resolve(data);
                    });
                });
            });
        });
    }
}
exports.testingService = new TestingService();
