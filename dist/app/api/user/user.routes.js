"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const account_routes_1 = require("./account/account.routes");
const userRouter = (0, express_1.Router)();
// userRouter.route('/').get(userController.getUsers).post(userController.registerUser);
// userRouter.route('/').post(userController.registerUser);
// userRouter.route('/').delete(userController.deleteUser)
userRouter.use(account_routes_1.accountRoutes.path, account_routes_1.accountRoutes.accountRouter);
exports.userRoutes = userRouter;
