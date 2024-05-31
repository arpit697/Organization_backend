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
exports.attendanceController = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const attendanc_service_1 = require("./attendanc.service");
let AttendanceController = class AttendanceController {
    attendance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            attendanc_service_1.attservice.addAttendance(req.body);
            res.success("attendance added successfully");
        });
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: "Post Attendance",
        summary: "Post Attendance",
        parameters: {
            body: {
                description: "Post Attendance",
                required: true,
                model: "AttendanceDataModel",
            },
        },
        responses: {
            200: {
                description: "Success",
                type: "Object",
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "attendance", null);
AttendanceController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: '/attendance',
        name: 'Attendance'
    })
], AttendanceController);
exports.attendanceController = new AttendanceController();
