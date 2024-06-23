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
exports.passwordUtil = void 0;
const bcrypt_1 = require("bcrypt");
const config = require('config');
/**
 * @description A utility class to handle password
 */
exports.passwordUtil = {
    /**
     * @description A function which can be used to verify password in a mongoose document
     * @param this Execution Context or Scope
     * @param password A string to be compared with password hash
     */
    verify(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.compare)(password, this.password);
        });
    },
    /**
     * @description A mongoose pre hook function to hash password before storing it in database
     * @param this Execution Context or Scope
     */
    hook() {
        return __awaiter(this, void 0, void 0, function* () {
            const password = this.password;
            if (this.isModified('password')) {
                // console.log('password modified');
                const round = parseInt(config.salt_round + '', 10);
                this.password = yield (0, bcrypt_1.hash)(password, yield (0, bcrypt_1.genSalt)(round));
            }
        });
    },
    hookUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const round = parseInt(config.SALT_ROUND, 10);
            this.getUpdate().$setOnInsert.password = yield (0, bcrypt_1.hash)(this.getUpdate()['$setOnInsert'].password, yield (0, bcrypt_1.genSalt)(round));
        });
    }
};
