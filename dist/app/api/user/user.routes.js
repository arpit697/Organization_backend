"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.route('/').get(user_controller_1.userController.getUsers).post(user_controller_1.userController.registerUser);
userRouter.route('/').delete(user_controller_1.userController.deleteUser);
exports.userRoutes = userRouter;
