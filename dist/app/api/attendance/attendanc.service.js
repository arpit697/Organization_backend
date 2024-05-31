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
Object.defineProperty(exports, "__esModule", { value: true });
exports.attservice = void 0;
const attendance_model_1 = require("./attendance.model");
class attendanceService {
    static addAttendance(body) {
        throw new Error("Method not implemented.");
    }
    addAttendance(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(payload);
            return yield attendance_model_1.AttendanceModel.create(payload);
        });
    }
}
exports.attservice = new attendanceService();
