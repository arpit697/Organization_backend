"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiMiddleware = void 0;
function apiMiddleware(req, res, next) {
    res.success = function (message, result = null, status = 200) {
        this.status(status).json({ message, result });
    };
    res.error = function ({ status, message }) {
        message = message || "Sorry! we couldn't process your request, please try later!";
        this.status(status || 500).json({ message, errorCode: 0 });
    };
    next();
}
exports.apiMiddleware = apiMiddleware;
