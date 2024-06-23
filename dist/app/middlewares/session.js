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
exports.session = void 0;
const message_constants_1 = require("../constants/message.constants");
const session_constants_1 = require("../constants/session.constants");
const jsonwebtoken_1 = require("jsonwebtoken");
const error_1 = require("../utils/error");
const config = require('config');
const BASIC_TOKEN = Buffer.from(`arpit:arpit`).toString('base64');
function session(users) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new error_1.ResponseError(400, message_constants_1.AUTHORIZATION.REQUIRED));
        }
        const [type, token] = authorization.split(' ');
        if (!type || !token || !Object.values(session_constants_1.AUTH_TYPES).includes(type)) {
            return next(new error_1.ResponseError(400, message_constants_1.AUTHORIZATION.INVALID_MEHTOD));
        }
        if (type === session_constants_1.AUTH_TYPES.BASIC && token === BASIC_TOKEN) {
            if (!users.length) {
                return next();
            }
            return next(new error_1.ResponseError(401, message_constants_1.AUTHORIZATION.NO_ACCESS));
        }
        else if (type === session_constants_1.AUTH_TYPES.BEARER) {
            try {
                const verifiedUser = users.reduce((result, userType) => {
                    if (result) {
                        return result;
                    }
                    try {
                        const secret = config.secrets[userType].authToken;
                        let user = (0, jsonwebtoken_1.verify)(token, secret, {});
                        return result || user;
                    }
                    catch (err) {
                        if (err.name === 'JsonWebTokenError') {
                            return null;
                        }
                        throw err;
                    }
                }, null);
                if (!verifiedUser) {
                    return next(new error_1.ResponseError(401, message_constants_1.AUTHORIZATION.NO_ACCESS));
                }
                req.user = verifiedUser;
                return next();
            }
            catch ({ name, message }) {
                return next(new error_1.ResponseError(401, message));
            }
        }
        return next(new error_1.ResponseError(401, message_constants_1.AUTHORIZATION.INVALID));
    });
}
exports.session = session;
