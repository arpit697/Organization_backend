"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModel = void 0;
const mongoose_1 = require("mongoose");
const attendanceSchema = new mongoose_1.Schema({
    attendance: { type: Object, required: true },
}, {
    timestamps: true,
    collection: "attendance",
});
exports.AttendanceModel = (0, mongoose_1.model)("Attendance", attendanceSchema);
