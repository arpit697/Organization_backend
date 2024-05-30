"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenUtil = void 0;
const config = require('config');
const jsonwebtoken_1 = require("jsonwebtoken");
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
}
exports.tokenUtil = new TokenUtil();
