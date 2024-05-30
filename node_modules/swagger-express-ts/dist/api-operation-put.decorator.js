"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");
function ApiOperationPut(args) {
    return function (target, propertyKey, descriptor) {
        swagger_service_1.SwaggerService.getInstance().addOperationPut(args, target, propertyKey);
    };
}
exports.ApiOperationPut = ApiOperationPut;
