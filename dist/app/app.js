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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const http_1 = require("http");
const logger_1 = require("./utils/logger");
const swagger = __importStar(require("swagger-express-ts"));
const mongo_db_1 = require("./database/mongo.db");
const api_1 = require("./middlewares/api");
const logger_2 = require("./middlewares/logger");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const api_routes_1 = require("./api/api.routes");
const serverLogger = (0, logger_1.createNewLogger)('server');
/**
 * The main application class responsible for initializing the Express server.
 * @class
 */
class Application {
    /**
     * Constructs an instance of Application.
     * @constructor
     */
    constructor() {
        this.instance = (0, express_1.default)();
        this.environment = process.env.NODE_ENV || 'development' || 'production';
        this.instance.set('port', config_1.default.get('app.port'));
        serverLogger.info(`Application initialized. Port: ${this.instance.get('port')}. Environment: ${this.environment}`);
    }
    /**
     * Get the configured port.
     * @returns {number} The configured port.
     */
    get port() {
        return this.instance.get('port');
    }
    /**
     * Initialize the application and start the server.
     * @static
     */
    static init() {
        const app = new Application();
        const server = new http_1.Server(app.instance);
        // Event listeners for server startup and error handling
        server.on('listening', () => {
            const addr = server.address();
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            serverLogger.info('Listening on ' + bind);
        });
        server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = typeof app.port === 'string' ? 'Pipe ' + app.port : 'Port ' + app.port;
            switch (error.code) {
                case 'EACCES':
                    serverLogger.error(bind + ' requires elevated privileges');
                    process.exit(1);
                case 'EADDRINUSE':
                    serverLogger.error(bind + ' is already in use');
                    process.exit(1);
                default:
                    throw error;
            }
        });
        // Handle SIGTERM signal for graceful shutdown
        process.on('SIGTERM', () => {
            serverLogger.info('SIGTERM signal received.');
            serverLogger.info('Closing http server.');
            server.close(() => __awaiter(this, void 0, void 0, function* () {
                serverLogger.info('Http server closed.');
                // Close All Database Connections
                yield Promise.all([mongo_db_1.mongoDAO.close()]);
                // close process
                process.exit(0);
            }));
        });
        // Load application configurations and start the server
        app
            .load()
            .then(() => {
            server.listen(app.port, () => {
                serverLogger.info(`Swagger URL "${config_1.default.get('swagger.url')}/api-docs/swagger"`);
            });
        })
            .catch((error) => {
            serverLogger.info(Object.keys(error));
            serverLogger.error(error.message || 'App Loading failed');
            process.exit(1);
        });
    }
    /**
     * Load configurations, middleware, routes, and start the server.
     * @async
     */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initConfig();
            this.instance.use('/api/v1', api_routes_1.apiRouter);
            yield Promise.all([mongo_db_1.mongoDAO.connect()]);
            this.instance.use((err, req, res, next) => {
                res.status(err.status || 400).json({ message: err.message });
            });
            this.instance.use((req, res) => {
                res.status(404).json({ message: 'Not Found' });
            });
        });
    }
    /**
     * Initialize configurations and middleware.
     */
    initConfig() {
        // Enable CORS only in development environment
        if (this.environment === 'development') {
            this.instance.use((0, cors_1.default)());
        }
        // Use API middleware
        this.instance.use(api_1.apiMiddleware);
        // Initialize Swagger documentation
        this.initSwagger();
        // Use logger middleware
        this.instance.use(logger_2.loggerMiddleWare);
        // Add security headers with Helmet
        this.instance.use((0, helmet_1.default)());
        // Enable compression for response
        this.instance.use((0, compression_1.default)());
        // Disable 'x-powered-by' header
        this.instance.disable('x-powered-by');
        // Parse JSON requests with a limit of 50mb
        this.instance.use(express_1.default.json({ limit: '50mb' }));
        // Parse URL-encoded requests with a limit of 50mb
        this.instance.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
    }
    /**
     * Initialize Swagger documentation.
     */
    initSwagger() {
        // Serve Swagger UI and definition files
        this.instance.use('/api-docs/swagger', express_1.default.static('swagger'));
        this.instance.use('/api-docs/swagger/assets', express_1.default.static('node_modules/swagger-ui-dist'));
        // Initialize swagger-express-ts middleware
        this.instance.use(swagger.express({
            definition: {
                info: {
                    title: 'Organization Back-End',
                    version: '1.0'
                },
                basePath: '/api/v1',
                schemes: ['http', 'https']
            }
        }));
    }
}
exports.Application = Application;
