import express, { Request, Response } from "express";
import config from 'config';
import { Server } from "http";
import { createNewLogger } from './utils/logger';
import * as swagger from 'swagger-express-ts';
import { mongoDAO } from "./database/mongo.db";
import { apiMiddleware } from "./middlewares/api";
import { loggerMiddleWare } from "./middlewares/logger";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { ResponseError } from "./utils/error";
import { apiRouter } from "./api/api.routes";

const serverLogger = createNewLogger('server');

/**
 * The main application class responsible for initializing the Express server.
 * @class
 */
export class Application {
    instance = express();
    environment = process.env.NODE_ENV || 'development' || 'production';

    /**
     * Constructs an instance of Application.
     * @constructor
     */
    constructor() {
        this.instance.set('port', config.get<number>('app.port'));
        serverLogger.info(`Application initialized. Port: ${this.instance.get('port')}. Environment: ${this.environment}`);
    }

    /**
     * Get the configured port.
     * @returns {number} The configured port.
     */
    get port():number {
        return this.instance.get('port');
    }

    /**
     * Initialize the application and start the server.
     * @static
     */
    static init() {
        const app = new Application();
        const server = new Server(app.instance);
        
        // Event listeners for server startup and error handling
        server.on('listening', () => {
            const addr = server.address();
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
            serverLogger.info('Listening on ' + bind);
        });

        server.on('error', (error: any) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind: any = typeof app.port === 'string' ? 'Pipe ' + app.port : 'Port ' + app.port;
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
            server.close(async () => {
                serverLogger.info('Http server closed.');
                // Close All Database Connections
                await Promise.all([mongoDAO.close()]);
                // close process
                process.exit(0);
            });
        });

        // Load application configurations and start the server
        app
            .load()
            .then(() => {
                server.listen(app.port, () => {
                    serverLogger.info(`Swagger URL "${config.get('swagger.url')}/api-docs/swagger"`);
                });
            })
            .catch((error: any) => {
                serverLogger.info(Object.keys(error));
                serverLogger.error(error.message || 'App Loading failed');
                process.exit(1);
            });
    }

    /**
     * Load configurations, middleware, routes, and start the server.
     * @async
     */
    async load() {
        this.initConfig()
        this.instance.use('/api/v1', apiRouter);
        await Promise.all([mongoDAO.connect()]);
        this.instance.use((err: ResponseError, req: Request, res: Response, next: express.NextFunction) => {
            res.status(err.status || 400).json({ message: err.message });
        });
        this.instance.use((req: express.Request, res: express.Response) => {
            res.status(404).json({ message: 'Not Found' });
        });
    }

    /**
     * Initialize configurations and middleware.
     */
    initConfig() {
        // Enable CORS only in development environment
        if (this.environment === 'development') {
            this.instance.use(cors());
        }
        
        // Use API middleware
        this.instance.use(apiMiddleware);

        // Initialize Swagger documentation
        this.initSwagger()

        // Use logger middleware
        this.instance.use(loggerMiddleWare)

        // Add security headers with Helmet
        this.instance.use(helmet())

        // Enable compression for response
        this.instance.use(compression())

        // Disable 'x-powered-by' header
        this.instance.disable('x-powered-by');

        // Parse JSON requests with a limit of 50mb
        this.instance.use(express.json({ limit: '50mb' }));

        // Parse URL-encoded requests with a limit of 50mb
        this.instance.use(express.urlencoded({ extended: true, limit: '50mb' }));
    }

    /**
     * Initialize Swagger documentation.
     */
    initSwagger() {
        // Serve Swagger UI and definition files
        this.instance.use('/api-docs/swagger', express.static('swagger'));
        this.instance.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
        
        // Initialize swagger-express-ts middleware
        this.instance.use(
            swagger.express({
                definition: {
                    info: {
                        title: 'Organization Back-End',
                        version: '1.0'
                    },
                    basePath: '/api/v1',
                    schemes: ['http']
                }
            })
        );
    }
}
