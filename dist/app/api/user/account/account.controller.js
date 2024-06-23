"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const account_service_1 = require("./account.service");
const account_constants_1 = require("./account.constants");
const error_1 = require("../../../utils/error");
const message_constants_1 = require("../../../constants/message.constants");
class AccountController {
    login(req, res, next) {
        const { email, password } = req.body;
        account_service_1.userService
            .createSession(email, password, req.client)
            .then((result) => {
            res.status(200).json({ message: account_constants_1.ACCOUNT_MESSAGES.LOGIN.SUCCESS, result: result });
        })
            .catch(next);
        // userService.createNewAccount();
    }
    signup(req, res, next) {
        const { email, password, fullName } = req.body;
        account_service_1.userService
            .createAccount(email, password, fullName)
            .then((result) => {
            res.success(account_constants_1.ACCOUNT_MESSAGES.SIGNUP.SUCCESS, result);
        })
            .catch(next);
    }
    /**
     * @description A function to handle admin profile requests
     * @param {Request} req App request object
     * @param {Response} res App response object
     * @param {NextFunction} res A callback function to call next handler
     */
    profile(req, res, next) {
        const { userId } = req.user || { userId: null };
        account_service_1.userService
            .details(userId)
            .then((result) => {
            if (result) {
                res.success(account_constants_1.ACCOUNT_MESSAGES.PROFILE.SUCCESS, result);
                // res
                //   .status(200)
                //   .json({ message: ACCOUNT_MESSAGES.PROFILE.SUCCESS, result: result });
            }
            else {
                next(new error_1.ResponseError(401, message_constants_1.AUTHORIZATION.EXPIRED));
            }
        })
            .catch(next);
    }
    /**
     * @description A function to handle admin update requests
     * @param {Request} req App request object
     * @param {Response} res App response object
     * @param {NextFunction} res A callback function to call next handler
     */
    update(req, res, next) {
        const { userId } = req.user || { userId: null };
        account_service_1.userService
            .update(userId, req.data)
            .then((result) => {
            res.success(account_constants_1.ACCOUNT_MESSAGES.PROFILE.UPDATED, result);
        })
            .catch(next);
    }
}
exports.accountController = new AccountController();
