import { NextFunction, Request, Response } from "express";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete,
} from "swagger-express-ts";
import { attservice } from "./attendanc.service";

@ApiPath({
    path: '/attendance',
    name: 'Attendance'
})
class AttendanceController {
  @ApiOperationPost({
    description: "Post Attendance",
    summary: "Post Attendance",
    parameters: {
      body: {
        description: "Post Attendance",
        required: true,
        model: "AttendanceDataModel",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "Object",
      },
    },
  })
    async attendance(req: Request, res: Response, next: NextFunction) {
      attservice.addAttendance(req.body)
      res.success("attendance added successfully" )
    }

}
export const attendanceController = new AttendanceController();