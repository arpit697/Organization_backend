"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CART_MESSAGES = exports.AUTHORIZATION = exports.ERROR = exports.LOGIN = exports.ACCOUNT = void 0;
exports.ACCOUNT = {
    CREATED: 'Account created successfully.',
    DETAILS: 'Account details fetch successful.',
    NOT_FOUND: 'Account does not exists.'
};
exports.LOGIN = {
    FAILED: 'Invalid credentials.',
    SUCCESS: 'Logined Successfully.'
};
exports.ERROR = {
    INTERNAL: 'Internal server error.'
};
exports.AUTHORIZATION = {
    VALID: 'Authorization is verified.',
    EXPIRED: 'Authorization is expired.',
    INVALID: 'Authorization is not valid',
    REQUIRED: 'Authorization is required',
    NO_ACCESS: 'You are not authorized to access',
    INVALID_MEHTOD: 'Invalid authorization method'
};
exports.CART_MESSAGES = {
    ADD_SUCCESS: 'Product Added Successfully'
};
