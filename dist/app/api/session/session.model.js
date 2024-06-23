"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = require("mongoose");
const user_type_constants_1 = require("../../constants/user.type.constants");
const sessionSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
    },
    type: {
        enum: Object.values(user_type_constants_1.UserType),
        required: true,
        type: String,
    },
    token: String,
    socketId: String,
    // tslint:disable-next-line: object-literal-sort-keys
    createdAt: Date,
    updatedAt: Date,
}, {
    collection: "sessions",
    timestamps: true,
});
exports.SessionModel = (0, mongoose_1.model)('sessions', sessionSchema);
