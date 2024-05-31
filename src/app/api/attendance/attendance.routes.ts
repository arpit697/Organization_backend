import { Router } from "express";
import { attendanceController } from "./attendance.controller";


const attendancRoutes: Router = Router()
attendancRoutes.route('/').post(attendanceController.attendance)

export const attendanceRoute = attendancRoutes;
