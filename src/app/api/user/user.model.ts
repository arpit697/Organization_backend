import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true , unique : true },
    user_password : {type:String , required : true},
    date_of_birth : {type:String , require :false},
    role:{type:String , enum : ['User' , 'Admin'] , default:'User'}
  },
  {
    timestamps: true,
    collection: "user",
  }
);

export const UserModel = model<IUser>("User", userSchema);


