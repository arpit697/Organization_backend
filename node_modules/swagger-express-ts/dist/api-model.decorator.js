"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");
function ApiModel(args) {
    return function (target) {
        swagger_service_1.SwaggerService.getInstance().addApiModel(args, target);
    };
}
exports.ApiModel = ApiModel;
