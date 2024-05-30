"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");
function ApiModelProperty(args) {
    return function (target, propertyKey) {
        var propertyType = Reflect.getMetadata("design:type", target, propertyKey)
            .name;
        swagger_service_1.SwaggerService.getInstance().addApiModelProperty(args, target, propertyKey, propertyType);
    };
}
exports.ApiModelProperty = ApiModelProperty;
