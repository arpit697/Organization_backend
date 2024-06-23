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
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cron_1 = require("cron");
const socket_io_1 = require("socket.io"); // Import Socket.IO
const attendanc_service_1 = require("./api/attendance/attendanc.service");
const serverLogger = (0, logger_1.createNewLogger)("server");
const envFilePath = path_1.default.resolve(__dirname, `../.env.${process.env.NODE_ENV || "default"}`);
dotenv_1.default.config({ path: envFilePath });
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
        this.environment = process.env.NODE_ENV || "default";
        const port = config_1.default.get("app.port") || 3000;
        this.instance.set("port", port);
        serverLogger.info(`Application initialized. Port: ${port}. Environment: ${this.environment}`);
        // Create HTTP server and initialize Socket.IO
        this.httpServer = new http_1.Server(this.instance);
        this.io = new socket_io_1.Server(this.httpServer);
        this.setupSocketIO(); // Setup Socket.IO
        // Handle HTTP server events
        this.httpServer
            .listen(port, () => {
            serverLogger.info(`Server is running on port ${port}`);
        })
            .on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                serverLogger.error(`Port ${port} is already in use`);
                process.exit(1);
            }
            else {
                throw error;
            }
        });
    }
    /**
     * Get the configured port.
     * @returns {number} The configured port.
     */
    get port() {
        return this.instance.get("port");
    }
    /**
     * Initialize the application and start the server.
     * @static
     */
    static init() {
        const app = new Application();
        // Handle SIGTERM signal for graceful shutdown
        process.on("SIGTERM", () => {
            serverLogger.info("SIGTERM signal received.");
            serverLogger.info("Closing HTTP server.");
            app.httpServer.close(() => __awaiter(this, void 0, void 0, function* () {
                serverLogger.info("HTTP server closed.");
                // Close All Database Connections
                yield Promise.all([mongo_db_1.mongoDAO.close()]);
                // Close process
                process.exit(0);
            }));
        });
        // Load application configurations and start the server
        app.load().catch((error) => {
            serverLogger.error(error.message || "App Loading failed");
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
            this.instance.use("/api/v1", api_routes_1.apiRouter);
            yield Promise.all([mongo_db_1.mongoDAO.connect()]);
            // Root route to render the index page
            this.instance.get("/", (req, res) => {
                res.render("index", { title: "My App" });
            });
            this.instance.use((err, req, res, next) => {
                res.status(err.status || 400).json({ message: err.message });
            });
            this.instance.use((req, res) => {
                res.status(404).json({ message: "Not Found" });
            });
        });
    }
    /**
     * Initialize configurations and middleware.
     */
    initConfig() {
        // Enable CORS only in development environment
        if (this.environment === "development") {
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
        this.instance.disable("x-powered-by");
        // Parse JSON requests with a limit of 50mb
        this.instance.use(express_1.default.json({ limit: "50mb" }));
        // Parse URL-encoded requests with a limit of 50mb
        this.instance.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
        // Set EJS as the view engine
        this.instance.set("view engine", "ejs");
        this.instance.set("views", path_1.default.join(__dirname, "../views")); // Adjust path as necessary
        // Start the cron job
        // this.startCronJob();
    }
    /**
     * Initialize Swagger documentation.
     */
    initSwagger() {
        // Serve Swagger UI and definition files
        this.instance.use("/api-docs/swagger", express_1.default.static("swagger"));
        this.instance.use("/api-docs/swagger/assets", express_1.default.static("node_modules/swagger-ui-dist"));
        // Initialize swagger-express-ts middleware
        this.instance.use(swagger.express({
            definition: {
                info: {
                    title: "Organization Back-End",
                    version: "1.0.0",
                    description: "API documentation for the Organization Back-End",
                    termsOfService: process.env.TERMS_URL || "http://example.com/terms/",
                    contact: {
                        name: "API Support",
                        url: process.env.SUPPORT_URL || "http://example.com/support",
                        email: process.env.SUPPORT_EMAIL || "support@example.com",
                    },
                    license: {
                        name: "Apache 2.0",
                        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
                    },
                },
                basePath: "/api/v1",
                schemes: ["http", "https"],
                openapi: "2.0.0",
                host: process.env.HOST || "localhost:3000",
                models: {
                    ExampleModel: {
                        description: "An example model",
                        properties: {
                            exampleProperty: {
                                type: "string",
                                description: "An example property",
                            },
                        },
                    },
                },
                securityDefinitions: {
                    bearerAuth: {
                        type: "http",
                        in: "header",
                        name: "Authorization",
                    },
                    apiKeyAuth: {
                        type: "apiKey",
                        in: "header",
                        name: "X-API-KEY",
                    },
                },
                responses: {
                    ExampleResponse: {
                        description: "An example response",
                    },
                },
            },
        }));
    }
    /**
     * Setup Socket.IO.
     */
    setupSocketIO() {
        this.io.on("connection", (socket) => {
            console.log("a user connected", socket.id);
            // console.log(socket , 'socket')
            this.io.emit("connection", "hello you are connected......");
            socket.on("disconnect", () => {
                console.log("user disconnected");
            });
            socket.on("chat-message", (msg) => {
                console.log("message: ");
                console.log("message: " + msg);
                this.io.emit("chat message", msg);
            });
        });
    }
    /**
     * Start the cron job.
     */
    startCronJob() {
        const job = new cron_1.CronJob("* * * * *", // cronTime
        function () {
            return __awaiter(this, void 0, void 0, function* () {
                // let user = await usersService.getUsers()
                attendanc_service_1.attservice.addAttendance({
                    attendance: {},
                });
                console.log("You will see this message every minute");
            });
        }, // onTick
        null, // onComplete
        true, // start
        "America/Los_Angeles" // timeZone
        );
        job.start();
    }
}
exports.Application = Application;
