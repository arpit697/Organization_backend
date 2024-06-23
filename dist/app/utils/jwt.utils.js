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
exports.tokenUtil = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const error_1 = require("./error");
const session_model_1 = require("../api/session/session.model");
const config = require('config');
/**
 * @description A utility class to handle JWT operations
 */
class TokenUtil {
    /**
     * @description A function to generate auth token while logging in.
     * @param payload A payload data which will be stored in jwt.
     * @param userType A user type for which token will be generated (secrets are different for different type of users)
     * @param expiresIn A time in which jwt will be expired
     */
    generateAuthToken(payload, userType, expiresIn) {
        const authToken = config.secrets[userType].authToken;
        const options = {};
        if (expiresIn) {
            options.expiresIn = expiresIn;
        }
        return (0, jsonwebtoken_1.sign)(payload, authToken, options);
    }
    /**
     * @description A function to generate token which will be used to send over email to reset password.
     * @param payload A payload data which will be stored in jwt.
     * @param userType A user type for which token will be generated (secrets are different for different type of users)
     * @param expiresIn A time in which jwt will be expired
     */
    generatePwdMailToken(payload, userType, expiresIn) {
        const { passwordMailToken } = config.secrets[userType.toLowerCase()];
        const options = {};
        if (expiresIn) {
            options.expiresIn = expiresIn;
        }
        return (0, jsonwebtoken_1.sign)(payload, passwordMailToken, options);
    }
    /**
     * @description A method to verify auth token and extract data from it.
     * @param {string} token A token to be verified
     * @param {VerifyOptions} options options used while verifying token.
     */
    verifyAuthToken(token, userType, options) {
        const secret = config.secrets[userType].authToken;
        let res = (0, jsonwebtoken_1.verify)(token, secret, options);
        return res;
    }
    /**
     * @description A method to verify auth token and extract data from it.
     * @param {string} token A token to be verified
     * @param {VerifyOptions} options options used while verifying token.
     */
    verifyPwdMailToken(token, userType, options) {
        const { passwordMailToken } = config.secrets[userType.toLowerCase()];
        return (0, jsonwebtoken_1.verify)(token, passwordMailToken);
    }
    isActive(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield session_model_1.SessionModel.findOne({ _id: sessionId });
            if (!data || !data.isActive) {
                return Promise.reject(new error_1.ResponseError(400, 'Session expired'));
            }
        });
    }
}
exports.tokenUtil = new TokenUtil();
