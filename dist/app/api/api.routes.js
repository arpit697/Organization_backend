"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
require("./api.swagger");
const user_routes_1 = require("./user/user.routes");
const router = (0, express_1.Router)();
router.use('/users', user_routes_1.userRoutes);
exports.apiRouter = router;
