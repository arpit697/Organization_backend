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
exports.WeatherData = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
let WeatherData = class WeatherData {
};
exports.WeatherData = WeatherData;
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: "weather",
        required: false,
        type: '',
    }),
    __metadata("design:type", Object)
], WeatherData.prototype, "weather", void 0);
exports.WeatherData = WeatherData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: "Weather Data model",
        name: "WeatherDataModel",
    })
], WeatherData);
