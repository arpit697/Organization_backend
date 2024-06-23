"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const Joi = __importStar(require("joi"));
const error_1 = require("../utils/error");
function validateSchema(schema, dataResolver = 'body') {
    return (req, res, next) => {
        // console.log('Validating Schema');
        const data = typeof dataResolver === 'function' ? dataResolver(req) : req[dataResolver];
        try {
            const result = Joi.attempt(data, schema);
            req.data = Object.assign(Object.assign({}, (req.data || {})), result);
            next();
        }
        catch (error) {
            const message = error.details[0].message.split("'").join('');
            res.error(new error_1.ResponseError(244, message.replace(new RegExp('"', 'gi'), '')));
        }
    };
}
exports.validateSchema = validateSchema;
