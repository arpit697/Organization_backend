"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenStatus = exports.USER_STATUS = exports.ACCOUNT_MESSAGES = void 0;
exports.ACCOUNT_MESSAGES = {
    LOGIN: {
        SUCCESS: 'You are logged in successfully.',
        INVALID: 'Incorrect email or password, please ensure credentials were entered correctly.',
        NOT_FOUND: 'User not found.'
    },
    PROFILE: {
        SUCCESS: 'Successfull',
        UPDATED: 'Profile updated successfully.'
    },
    FORGOT_PASSWORD: {
        SUCCESS: 'Success',
        NOT_FOUND: 'Admin does not found.'
    },
    RESET_PASSWORD: {
        Success: 'Success.',
        NOT_FOUND: 'Admin does not found.',
        INVALID_TOKEN: 'Invalid token!',
        TOKEN_EXPIRED: 'Token expired!'
    },
    UPDATE: {
        NOT_FOUND: 'Admin does not found.'
    },
    SIGNUP: {
        ALREADY_EXISTS: 'This email is already in use.',
        SUCCESS: 'Account created successfully.'
    }
};
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "ACTIVE";
    USER_STATUS["BLOCKED"] = "BLOCKED";
})(USER_STATUS || (exports.USER_STATUS = USER_STATUS = {}));
var TokenStatus;
(function (TokenStatus) {
    TokenStatus[TokenStatus["Active"] = 0] = "Active";
    TokenStatus[TokenStatus["Expired"] = 1] = "Expired";
    TokenStatus[TokenStatus["Invalid"] = 2] = "Invalid";
})(TokenStatus || (exports.TokenStatus = TokenStatus = {}));
