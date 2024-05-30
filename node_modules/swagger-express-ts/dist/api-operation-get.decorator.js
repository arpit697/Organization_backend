"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");
function ApiOperationGet(args) {
    return function (target, propertyKey, descriptor) {
        swagger_service_1.SwaggerService.getInstance().addOperationGet(args, target, propertyKey);
    };
}
exports.ApiOperationGet = ApiOperationGet;
