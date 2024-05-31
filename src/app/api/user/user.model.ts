import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true , unique : true },
    user_password : {type:String , required : true}
  },
  {
    timestamps: true,
    collection: "user",
  }
);

export const UserModel = model<IUser>("User", userSchema);

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
