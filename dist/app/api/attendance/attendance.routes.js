"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceRoute = void 0;
const express_1 = require("express");
const attendance_controller_1 = require("./attendance.controller");
const attendancRoutes = (0, express_1.Router)();
attendancRoutes.route('/').post(attendance_controller_1.attendanceController.attendance);
exports.attendanceRoute = attendancRoutes;
