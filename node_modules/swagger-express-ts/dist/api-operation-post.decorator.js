"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");
function ApiOperationPost(args) {
    return function (target, propertyKey, descriptor) {
        swagger_service_1.SwaggerService.getInstance().addOperationPost(args, target, propertyKey);
    };
}
exports.ApiOperationPost = ApiOperationPost;
