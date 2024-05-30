"use strict";
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
exports.usersService = void 0;
const user_model_1 = require("./user.model");
class UsersService {
    getUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query) {
                return yield user_model_1.UserModel.find(query);
            }
            else {
                return yield user_model_1.UserModel.find({});
            }
        });
    }
    findUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findOne(query);
        });
    }
    registerUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.create(payload);
        });
    }
    deleteUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.deleteOne(payload);
        });
    }
}
exports.usersService = new UsersService();
