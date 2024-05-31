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
exports.userController = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            user_service_1.usersService
                .getUsers(req.query)
                .then((data) => {
                res.success("Data", data);
            })
                .catch((err) => next());
        });
    }
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_name, user_email, user_password, confirm_password } = req.body;
            yield user_service_1.usersService
                .findUser({ user_email: user_email })
                .then((data) => {
                if (data) {
                    res.status(409).json({ message: "User Already Exist" });
                }
                else {
                    if (user_name && user_email && user_password && confirm_password) {
                        if (user_password === confirm_password) {
                            user_service_1.usersService.registerUser({ user_name, user_email, user_password });
                            res.success("User Registerd Successfully in Data base", {
                                user_name, user_email
                            });
                        }
                        else {
                            res.status(400).json({ message: "Password And Confirm Password" });
                        }
                    }
                }
            })
                .catch((err) => res.status(400).json({ message: "Error" }));
            // console.log(user , 'uuuuuuuuuuuuuuuuuuuuuuuuuu')
            // usersService
            //   .registerUser(payload)
            //   .then((data) => res.status(200).json(data))
            //   .catch((err) => res.status(400).json({ message: "Error" }));
        });
    }
    // static userRegistration = async (req, res) => {
    //   const { name, email, password, password_confirmation} = req.body
    //   const user = await UserModel.findOne({ email: email })
    //   if (user) {
    //     res.send({ "status": "failed", "message": "Email already exists" })
    //   } else {
    //     if (name && email && password && password_confirmation) {
    //       if (password === password_confirmation) {
    //         try {
    //           const salt = await bcrypt.genSalt(10)
    //           const hashPassword = await bcrypt.hash(password, salt)
    //           const doc = new UserModel({
    //             name: name,
    //             email: email,
    //             password: hashPassword,
    //           })
    //           await doc.save()
    //           const saved_user = await UserModel.findOne({ email: email })
    //           // Generate JWT Token
    //           const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
    //           res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
    //         } catch (error) {
    //           console.log(error)
    //           res.send({ "status": "failed", "message": "Unable to Register" })
    //         }
    //       } else {
    //         res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
    //       }
    //     } else {
    //       res.send({ "status": "failed", "message": "All fields are required" })
    //     }
    //   }
    // }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                // Implement the update logic using usersService
                res.status(200).json({ message: "User updated successfully" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            user_service_1.usersService
                .deleteUser(req.query)
                .then((data) => {
                if (data.deletedCount > 0) {
                    res
                        .status(200)
                        .json(Object.assign({ message: "User deleted successfully" }, data));
                }
                else {
                    res.status(400).json(Object.assign({ message: "User not found" }, data));
                }
            })
                .catch((err) => res.status(400).json({ message: "Error" }));
        });
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: "Get all user",
        summary: "Get all user",
        responses: {
            200: {
                description: "Success",
                type: "String",
            },
        },
        parameters: {
            query: {
                name: {
                    type: "string",
                    required: false,
                    description: "Name of the user",
                },
                email: {
                    type: "string",
                    required: false,
                    description: "Name of the user",
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
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
__decorate([
    (0, swagger_express_ts_1.ApiOperationPut)({
        description: "Update User",
        summary: "Update User",
        parameters: {
            body: {
                description: "User Update Data",
                model: "UpdateDataModel",
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
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationDelete)({
        description: "Delete User",
        summary: "Delete User",
        parameters: {
            query: {
                email: {
                    type: "string",
                    required: true,
                    description: "user email",
                },
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
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: "/users",
        name: "Users",
    })
], UserController);
exports.userController = new UserController();
