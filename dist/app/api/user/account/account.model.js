"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const password_util_1 = require("../../../utils/password.util");
const logger_1 = require("../../../utils/logger");
const UserSchema = new mongoose_1.Schema({
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
}, {
    collection: 'users',
    timestamps: true
});
UserSchema.methods.verifyPassword = password_util_1.passwordUtil.verify;
UserSchema.pre('save', function (next) {
    // Call Password Hook
    logger_1.serverLogger.warn('came');
    password_util_1.passwordUtil.hook.call(this).then(next).catch(next);
    // Do other tasks
});
UserSchema.pre('updateOne', function (next) {
    // Call Password Hook
    console.log(this.getUpdate()['$setOnInsert']);
    password_util_1.passwordUtil.hookUser.call(this).then(next).catch(next);
    // Do other tasks
});
UserSchema.pre('findOneAndUpdate', function (next) {
    // Call Password Hook
    password_util_1.passwordUtil.hook.call(this).then(next).catch(next);
    // Do other tasks
});
exports.UserModel = (0, mongoose_1.model)('users', UserSchema);
