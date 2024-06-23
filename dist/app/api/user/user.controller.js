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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./user.service");
let UserController = class UserController {
    // @ApiOperationGet({
    //   description: "Get all user",
    //   summary: "Get all user",
    //   responses: {
    //     200: {
    //       description: "Success",
    //       type: "String",
    //     },
    //   },
    //   parameters: {
    //     query: {
    //       name: {
    //         type: "string",
    //         required: false,
    //         description: "Name of the user",
    //       },
    //       email: {
    //         type: "string",
    //         required: false,
    //         description: "Name of the user",
    //       },
    //     },
    //   },
    // })
    // async getUsers(req: Request, res: Response, next: NextFunction) {
    //   usersService
    //     .getUsers(req.query)
    //     .then((data) => {
    //       res.success("Data", data);
    //     })
    //     .catch((err) => next());
    // }
    // @ApiOperationGet({
    //   description: "Get all user",
    //   summary: "Get all user",
    //   responses: {
    //     200: {
    //       description: "Success",
    //       type: "String",
    //     },
    //   },
    //   parameters: {
    //     query: {
    //       name: {
    //         type: "string",
    //         required: false,
    //         description: "Name of the user",
    //       },
    //       email: {
    //         type: "string",
    //         required: false,
    //         description: "Name of the user",
    //       },
    //     },
    //   },
    // })
    // @ApiOperationGet({
    //   path: "/:userId",
    //   description: "Get user by ID",
    //   parameters: {
    //     path: {
    //       userId: {
    //         description: "ID of the user",
    //         required: true,
    //         type: "string"
    //       }
    //     }
    //   },
    //   responses: {
    //     200: { model: "User" },
    //     404: { description: "User not found" }
    //   }
    // })
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_name, user_email, user_password, confirm_password } = req.body;
            yield user_service_1.usersService
                .findUser({ user_email: user_email })
                .then((data) => __awaiter(this, void 0, void 0, function* () {
                if (data) {
                    res.status(409).json({ message: "User Already Exist" });
                }
                else {
                    if (user_name && user_email && user_password && confirm_password) {
                        if (user_password === confirm_password) {
                            try {
                                const salt = yield bcrypt_1.default.genSalt(100);
                                const hashPassword = yield bcrypt_1.default.hash(user_password, parseInt(salt));
                                user_service_1.usersService.registerUser({
                                    user_name,
                                    user_email,
                                    user_password: hashPassword,
                                }).then(() => {
                                    res.success("User Registerd Successfully in Data base", {
                                        user_name,
                                        user_email,
                                    });
                                });
                            }
                            catch (error) { }
                        }
                        else {
                            res
                                .status(400)
                                .json({ message: "Password And Confirm Password" });
                        }
                    }
                }
            }))
                .catch((err) => res.status(400).json({ message: "Error" }));
        });
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: "Register User",
        summary: "Register User",
        parameters: {
            body: {
                description: "User Register Data",
                required: true,
                model: "RegisterDataModel",
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
], UserController.prototype, "registerUser", null);
UserController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: "/users",
        name: "Users",
    })
], UserController);
exports.userController = new UserController();
