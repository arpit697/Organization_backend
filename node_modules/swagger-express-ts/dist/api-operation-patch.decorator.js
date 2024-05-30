"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");
function ApiOperationPatch(args) {
    return function (target, propertyKey, descriptor) {
        swagger_service_1.SwaggerService.getInstance().addOperationPatch(args, target, propertyKey);
    };
}
exports.ApiOperationPatch = ApiOperationPatch;
