"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
require("./api.swagger");
const user_routes_1 = require("./user/user.routes");
const testing_routes_1 = require("./testing/testing.routes");
const router = (0, express_1.Router)();
router.use('/users', user_routes_1.userRoutes);
// router.use('/attendance' , attendanceRoute)
router.use('/weather', testing_routes_1.testingRoutes);
exports.apiRouter = [router];
