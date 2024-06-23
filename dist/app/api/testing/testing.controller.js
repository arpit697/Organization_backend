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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingController = void 0;
const testing_service_1 = require("./testing.service");
const swagger_express_ts_1 = require("swagger-express-ts");
let TestingController = class TestingController {
    getWeatherData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            testing_service_1.testingService.getWeatherData(page, limit)
                .then((data) => {
                res.success("Data", data);
            })
                .catch((err) => next());
        });
    }
    addWeatherData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            yield testing_service_1.testingService.addWeatherData(payload);
            res.success("attendance added successfully");
        });
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: "Weather",
        summary: "Get Weather Data Country Wise",
        responses: {
            200: {
                description: "Success",
                type: "String",
            },
        },
        parameters: {
            query: {
                page: {
                    type: "string",
                    required: false,
                    description: "Page Numbre",
                },
                limit: {
                    type: "string",
                    required: false,
                    description: "Limit",
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TestingController.prototype, "getWeatherData", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: "Add Weather Data",
        summary: "Add Weather Data",
        parameters: {
            body: {
                description: "Add Weather Data",
                required: true,
                model: "WeatherDataModel"
            },
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TestingController.prototype, "addWeatherData", null);
TestingController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: '/weather',
        name: 'Weather'
    })
], TestingController);
exports.testingController = new TestingController();
