"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverLogger = exports.createNewLogger = void 0;
const json_colorizer_1 = __importDefault(require("json-colorizer"));
const winston_1 = require("winston");
const createNewLogger = (mod, filename) => {
    return (0, winston_1.createLogger)({
        levels: winston_1.config.syslog.levels,
        defaultMeta: { module: mod },
        transports: [
            new winston_1.transports.Console({
                format: winston_1.format.combine(winston_1.format.timestamp({
                    format: 'YY-MM-DD HH:mm:ss.SSS'
                }), winston_1.format.colorize({
                    all: true
                }), winston_1.format.printf((info) => {
                    const data = info.data ? '\n' + (0, json_colorizer_1.default)(JSON.stringify(info.data, null, 2)) : '';
                    return `${info.timestamp} [${mod.toUpperCase()}] ${info.message}${data}`;
                }))
            }),
            new winston_1.transports.File({
                filename: filename || 'combined.log',
                dirname: 'logs'
            })
        ]
    });
};
exports.createNewLogger = createNewLogger;
exports.serverLogger = (0, exports.createNewLogger)('Server');
