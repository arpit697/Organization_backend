"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRoutes = void 0;
const express_1 = require("express");
const testing_controller_1 = require("./testing.controller");
const testingRouter = (0, express_1.Router)();
testingRouter.route('/').get(testing_controller_1.testingController.getWeatherData).post(testing_controller_1.testingController.addWeatherData);
exports.testingRoutes = testingRouter;
