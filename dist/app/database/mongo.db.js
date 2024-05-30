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
exports.mongoDAO = void 0;
const mongoose_1 = require("mongoose");
const logger_1 = require("../utils/logger");
const mongoLogger = (0, logger_1.createNewLogger)('mongodb');
const config = require('config');
class MongoDAO {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, mongoose_1.set)('debug', true);
            const { uri, dbName } = config.mongo;
            const options = {};
            if (!config.isLocal) {
                options.dbName = dbName;
            }
            mongoLogger.info(`Connecting MongoDB with URI "${uri}"`);
            yield (0, mongoose_1.connect)(uri, options);
            // await new Promise(connection.once.bind(connection, 'open'));
            mongoLogger.info('MongoDB connected successfully');
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            // boolean means [force], see in mongoose doc
            return mongoose_1.connection.close(false);
        });
    }
}
exports.mongoDAO = new MongoDAO();
