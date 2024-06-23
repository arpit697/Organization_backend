"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const session_service_1 = require("../../session/session.service");
const account_model_1 = require("./account.model");
const user_type_constants_1 = require("../../../constants/user.type.constants");
const account_constants_1 = require("./account.constants");
const session_model_1 = require("../../session/session.model");
const api_constants_1 = require("../../../constants/api.constants");
const error_1 = require("../../../utils/error");
const password_util_1 = require("../../../utils/password.util");
const jwt_utils_1 = require("../../../utils/jwt.utils");
const logger_1 = require("../../../utils/logger");
class UserService {
    /**
     * @description A function to create sesssion of user by given email and password
     * @param {string} email Admin email
     * @param {string} password Admin password
     */
    createSession(email, password, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield account_model_1.UserModel.findOne({ email });
            if (!user) {
                return Promise.reject(new error_1.ResponseError(401, account_constants_1.ACCOUNT_MESSAGES.LOGIN.NOT_FOUND, 4011));
            }
            if (!(yield user.verifyPassword(password))) {
                return Promise.reject(new error_1.ResponseError(401, account_constants_1.ACCOUNT_MESSAGES.LOGIN.INVALID, 4012));
            }
            const token = yield session_service_1.sessionService.create(client, {
                userId: user._id,
                type: user_type_constants_1.UserType.USER
            });
            return {
                token,
                profile: Object.assign(Object.assign({}, user.toObject()), { password: undefined, passwordToken: undefined })
            };
        });
    }
    createAccount(email, password, fullName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = { email, password, fullName };
                logger_1.serverLogger.warning(JSON.stringify(payload));
                const { modifiedCount, upsertedId } = yield account_model_1.UserModel.updateOne({ email: email }, {
                    $set: {},
                    $setOnInsert: Object.assign(Object.assign({}, payload), { status: account_constants_1.USER_STATUS.ACTIVE })
                }, { upsert: true });
                if (modifiedCount) {
                    return Promise.reject(new error_1.ResponseError(400, account_constants_1.ACCOUNT_MESSAGES.SIGNUP.ALREADY_EXISTS));
                }
                return upsertedId ? upsertedId : null;
            }
            catch (err) {
                let message = err.message;
                if (err.name === 'MongoError') {
                    message = api_constants_1.API_MESSAGES.INTERNAL;
                }
                return Promise.reject(new error_1.ResponseError(400, message));
            }
        });
    }
    /**
     * @description A function to fetch user details by given id
     * @param {string} id Admin document ObjectId
     */
    details(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield account_model_1.UserModel.findById(id, { password: 0 }).lean().exec();
        });
    }
    /**
     * @description A function to update user details
     * @param {string} id Admin document ObjectId
     */
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield account_model_1.UserModel.findByIdAndUpdate(id, payload, {
                new: true,
                projection: {
                    password: false
                }
            });
            if (!user) {
                return Promise.reject(new error_1.ResponseError(400, account_constants_1.ACCOUNT_MESSAGES.UPDATE.NOT_FOUND));
            }
            return user.toObject();
        });
    }
    // async forgetPassword(email: string) {
    //   Console.info(email);
    //   const token: string = tokenUtil.generatePwdMailToken(
    //     { email },
    //     UserType.USER
    //   );
    //   const user = await UserModel.findOneAndUpdate(
    //     { email },
    //     {
    //       $set: {
    //         passwordToken: token,
    //       },
    //     },
    //     {
    //       projection: { name: true },
    //     }
    //   );
    //   if (!user) {
    //     return Promise.reject(
    //       new ResponseError(400, ADMIN_MESSAGES.FORGOT_PASSWORD.NOT_FOUND)
    //     );
    //   } else {
    //     mailer
    //       .sendMail(App.MailType.ForgotPassword, email, {
    //         name: user.name,
    //         url: environment.url + "/v1/admins/verify-forget/" + token,
    //       })
    //       .then(() => {
    //         Console.info("Mail Sent");
    //       })
    //       .catch((err: any) => {
    //         Console.error(JSON.stringify(err));
    //       });
    //   }
    // }
    verifyForgetPasswordToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                jwt_utils_1.tokenUtil.verifyPwdMailToken(token, user_type_constants_1.UserType.USER);
                const isExists = yield account_model_1.UserModel.exists({ passwordToken: token });
                if (!isExists) {
                    return account_constants_1.TokenStatus.Invalid;
                }
                return account_constants_1.TokenStatus.Active;
            }
            catch (err) {
                if (err.name === 'JsonWebTokenError') {
                    return account_constants_1.TokenStatus.Active;
                }
                else if (err.name === 'TokenExpiredError') {
                    return account_constants_1.TokenStatus.Expired;
                }
                return Promise.reject(err);
            }
        });
    }
    resetPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                jwt_utils_1.tokenUtil.verifyPwdMailToken(token, user_type_constants_1.UserType.USER);
                const doc = { password, isModified: (el) => true };
                yield password_util_1.passwordUtil.hook.call(doc);
                const user = yield account_model_1.UserModel.findOneAndUpdate({ passwordToken: token }, {
                    $set: { password: doc.password },
                    $unset: {
                        passwordToken: ''
                    }
                });
                if (!user) {
                    return Promise.reject(new error_1.ResponseError(400, account_constants_1.ACCOUNT_MESSAGES.RESET_PASSWORD.NOT_FOUND));
                }
                // @TODO remove all sessions
                yield session_model_1.SessionModel.updateOne({
                    userId: user._id,
                    isActive: true
                }, { $set: { isActive: false } });
            }
            catch (err) {
                if (err.name === 'JsonWebTokenError') {
                    return Promise.reject(new error_1.ResponseError(400, account_constants_1.ACCOUNT_MESSAGES.RESET_PASSWORD.INVALID_TOKEN));
                }
                else if (err.name === 'TokenExpiredError') {
                    return Promise.reject(new error_1.ResponseError(400, account_constants_1.ACCOUNT_MESSAGES.RESET_PASSWORD.TOKEN_EXPIRED));
                }
                return Promise.reject(err);
            }
        });
    }
}
exports.userService = new UserService();
