"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterData = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
let RegisterData = class RegisterData {
};
exports.RegisterData = RegisterData;
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: "name of user",
        required: true,
        type: '',
    }),
    __metadata("design:type", String)
], RegisterData.prototype, "user_name", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: "email of user",
        required: true,
        type: '',
    }),
    __metadata("design:type", String)
], RegisterData.prototype, "user_email", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: "password of user",
        required: true,
        type: '',
    }),
    __metadata("design:type", String)
], RegisterData.prototype, "user_password", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: "confirm user password",
        required: true,
        type: '',
    }),
    __metadata("design:type", String)
], RegisterData.prototype, "confirm_password", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'user date of birth',
        required: false,
        type: ''
    }),
    __metadata("design:type", String)
], RegisterData.prototype, "date_of_bitrh", void 0);
exports.RegisterData = RegisterData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: "Register User Data",
        name: "RegisterDataModel",
    })
], RegisterData);
