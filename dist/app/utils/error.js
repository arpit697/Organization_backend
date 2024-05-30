"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
/**
 * @author Arpit Dwivedi
 * @description A utility class for response errors which inherit native error class to provide stack trace in app.
 * @argument status A status code to send back to client when error occur
 * @argument message A error message to send back to client when error occur
 * @argument errorCode A special optional error code to identifiy the error cause
 */
class ResponseError extends Error {
    constructor(status, message, errorCode) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.name = 'ResponseError';
    }
}
exports.ResponseError = ResponseError;
