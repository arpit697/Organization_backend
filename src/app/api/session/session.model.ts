import { Schema, Types, model } from "mongoose";
import { UserType } from "../../constants/user.type.constants";
import { ISessionDocument } from "./session.interface";

const sessionSchema = new Schema(
  {
    clinet: {
      agent: String,
      ipAddr: String,
      proxy: String,
    },
    isActive: {
      default: true,
      required: true,
      type: Boolean,
    },
    userId: {
      required: true,
      type: Types.ObjectId,
    },
    type: {
      enum: Object.values(UserType),
      required: true,
      type: String,
    },
    token: String,
    socketId: String,
    // tslint:disable-next-line: object-literal-sort-keys
    createdAt: Date,
    updatedAt: Date,
  },
  {
    collection: "sessions",
    timestamps: true,
  }
);

export const SessionModel = model<ISessionDocument>('sessions', sessionSchema);