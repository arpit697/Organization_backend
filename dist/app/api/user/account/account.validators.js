"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../../../middlewares/validator");
const api_validators_1 = require("../../../middlewares/api.validators");
exports.userValidators = {
    forgetPassword: (0, validator_1.validateSchema)(joi_1.default.object().keys({
        email: api_validators_1.JEmail.required()
    }), 'body'),
    login: (0, validator_1.validateSchema)(joi_1.default.object().keys({
        email: api_validators_1.JEmail.required(),
        password: api_validators_1.JPassword.required()
    }), 'body'),
    signup: (0, validator_1.validateSchema)(joi_1.default.object().keys({
        email: api_validators_1.JEmail.required(),
        password: api_validators_1.JPassword.required(),
        fullName: api_validators_1.JString.required().max(60)
    }), 'body'),
    reset: (0, validator_1.validateSchema)(joi_1.default.object().keys({
        token: api_validators_1.JString.required(),
        password: api_validators_1.JPassword.required()
    }), 'body'),
    profile: (0, validator_1.validateSchema)(joi_1.default.object({
        name: api_validators_1.JName.optional(),
        photoUrl: api_validators_1.JString.uri()
    }), 'body')
};
