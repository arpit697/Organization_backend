import { Schema, model } from "mongoose";

const attendanceSchema = new Schema<any>(
    {
      attendance: { type: Object, required: true },
    },
    {
      timestamps: true,
      collection: "attendance",
    }
  );
  
  export const AttendanceModel = model<any>("Attendance", attendanceSchema);