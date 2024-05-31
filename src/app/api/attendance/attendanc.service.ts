import { AttendanceModel } from "./attendance.model";

class attendanceService {
    static addAttendance(body: import("stream/web").ReadableStream<any> | null) {
        throw new Error("Method not implemented.");
    }
    async addAttendance(payload:any){
        console.log(payload)
        return await AttendanceModel.create(payload);
      }
}

export const attservice = new attendanceService();