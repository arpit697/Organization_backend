import {Schema, model} from 'mongoose';
import {IUserDocument} from './authentication.interface';
import {passwordUtil} from '../../../utils/password.util';

const AuthenticationSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    status: String,
    email: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    passwordToken: String,
    photoUrl: {
      type: String
    },
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'users',
    timestamps: true
  }
);
AuthenticationSchema.methods.verifyPassword = passwordUtil.verify;

AuthenticationSchema.pre('save', function (this: IUserDocument, next: any) {
  // Call Password Hook
  // serverLogger.warn('came');
  passwordUtil.hook.call(this).then(next).catch(next);
  // Do other tasks
});

AuthenticationSchema.pre('updateOne', function (this: any, next: any) {
  console.log(this.getUpdate()['$setOnInsert']);

  passwordUtil.hookUser.call(this).then(next).catch(next);
  // Do other tasks
});

AuthenticationSchema.pre('findOneAndUpdate', function (this: IUserDocument, next: any) {
  // Call Password Hook
  passwordUtil.hook.call(this).then(next).catch(next);
  // Do other tasks
});

export const AuthenticationModel = model<IUserDocument>('authentication', AuthenticationSchema);
