"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");
function ApiOperationDelete(args) {
    return function (target, propertyKey, descriptor) {
        swagger_service_1.SwaggerService.getInstance().addOperationDelete(args, target, propertyKey);
    };
}
exports.ApiOperationDelete = ApiOperationDelete;
