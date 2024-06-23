"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JList = exports.JFullName = exports.JID = exports.JPassword = exports.JMobile = exports.JEmail = exports.JArray = exports.JName = exports.JBoolean = exports.JString = exports.JNumber = void 0;
const joi_1 = __importDefault(require("joi"));
exports.JNumber = joi_1.default.number();
exports.JString = joi_1.default.string().trim();
exports.JBoolean = joi_1.default.boolean();
exports.JName = exports.JString.max(60);
exports.JArray = joi_1.default.array().items(joi_1.default.string().trim().required()).unique();
exports.JEmail = exports.JString.lowercase().email();
exports.JMobile = exports.JString.regex(/[0-9]{7,15}/);
exports.JPassword = exports.JString.min(6).max(24);
exports.JID = exports.JString.length(24);
exports.JFullName = joi_1.default.object({
    first: exports.JName.required(),
    middle: exports.JName,
    last: exports.JName.required()
});
exports.JList = joi_1.default.object().keys({
    pageIndex: exports.JNumber.required().min(0),
    pageSize: exports.JNumber.required().min(5),
    searchText: exports.JString,
    sort_by: exports.JString,
    sort_order: exports.JString.valid('asc', 'desc').default('desc')
});
