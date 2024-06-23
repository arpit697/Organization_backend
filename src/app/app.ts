import express, { Request, Response } from "express";
import config from "config";
import { Server } from "http";
import { createNewLogger } from "./utils/logger";
import * as swagger from "swagger-express-ts";
import { mongoDAO } from "./database/mongo.db";
import { apiMiddleware } from "./middlewares/api";
import { loggerMiddleWare } from "./middlewares/logger";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { ResponseError } from "./utils/error";
import { apiRouter } from "./api/api.routes";
import dotenv from "dotenv";
import path from "path";
import { CronJob } from "cron";
import { usersService } from "./api/user/user.service";
import { Server as SocketIOServer } from "socket.io"; // Import Socket.IO
import { attservice } from "./api/attendance/attendanc.service";
const serverLogger = createNewLogger("server");

const envFilePath = path.resolve(
  __dirname,
  `../.env.${process.env.NODE_ENV || "default"}`
);
dotenv.config({ path: envFilePath });

/**
 * The main application class responsible for initializing the Express server.
 * @class
 */
export class Application {
  instance = express();
  environment = process.env.NODE_ENV || "default";
  httpServer: Server;
  io: SocketIOServer; // Add a Socket.IO server instance

  /**
   * Constructs an instance of Application.
   * @constructor
   */
  constructor() {
    const port = config.get<number>("app.port") || 3000;
    this.instance.set("port", port);
    serverLogger.info(
      `Application initialized. Port: ${port}. Environment: ${this.environment}`
    );

    // Create HTTP server and initialize Socket.IO
    this.httpServer = new Server(this.instance);
    this.io = new SocketIOServer(this.httpServer);
    this.setupSocketIO(); // Setup Socket.IO

    // Handle HTTP server events
    this.httpServer
      .listen(port, () => {
        serverLogger.info(`Server is running on port ${port}`);
      })
      .on("error", (error: any) => {
        if (error.code === "EADDRINUSE") {
          serverLogger.error(`Port ${port} is already in use`);
          process.exit(1);
        } else {
          throw error;
        }
      });
  }

  /**
   * Get the configured port.
   * @returns {number} The configured port.
   */
  get port(): number {
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
      app.httpServer.close(async () => {
        serverLogger.info("HTTP server closed.");
        // Close All Database Connections
        await Promise.all([mongoDAO.close()]);
        // Close process
        process.exit(0);
      });
    });

    // Load application configurations and start the server
    app.load().catch((error: any) => {
      serverLogger.error(error.message || "App Loading failed");
      process.exit(1);
    });
  }

  /**
   * Load configurations, middleware, routes, and start the server.
   * @async
   */
  async load() {
    this.initConfig();
    this.instance.use("/api/v1", apiRouter);
    await Promise.all([mongoDAO.connect()]);

    // Root route to render the index page
    this.instance.get("/", (req: Request, res: Response) => {
      res.render("index", { title: "My App" });
    });

    this.instance.use(
      (
        err: ResponseError,
        req: Request,
        res: Response,
        next: express.NextFunction
      ) => {
        res.status(err.status || 400).json({ message: err.message });
      }
    );
    this.instance.use((req: express.Request, res: express.Response) => {
      res.status(404).json({ message: "Not Found" });
    });
  }

  /**
   * Initialize configurations and middleware.
   */
  initConfig() {
    // Enable CORS only in development environment
    if (this.environment === "development") {
      this.instance.use(cors());
    }

    // Use API middleware
    this.instance.use(apiMiddleware);

    // Initialize Swagger documentation
    this.initSwagger();

    // Use logger middleware
    this.instance.use(loggerMiddleWare);

    // Add security headers with Helmet
    this.instance.use(helmet());

    // Enable compression for response
    this.instance.use(compression());

    // Disable 'x-powered-by' header
    this.instance.disable("x-powered-by");

    // Parse JSON requests with a limit of 50mb
    this.instance.use(express.json({ limit: "50mb" }));

    // Parse URL-encoded requests with a limit of 50mb
    this.instance.use(express.urlencoded({ extended: true, limit: "50mb" }));

    // Set EJS as the view engine
    this.instance.set("view engine", "ejs");
    this.instance.set("views", path.join(__dirname, "../views")); // Adjust path as necessary

    // Start the cron job
    // this.startCronJob();
  }

  /**
   * Initialize Swagger documentation.
   */
  initSwagger() {
    // Serve Swagger UI and definition files
    this.instance.use("/api-docs/swagger", express.static("swagger"));
    this.instance.use(
      "/api-docs/swagger/assets",
      express.static("node_modules/swagger-ui-dist")
    );

    // Initialize swagger-express-ts middleware
    this.instance.use(
      swagger.express({
        definition: {
          info: {
            title: "Organization Back-End",
            version: "1.0.0",
            description: "API documentation for the Organization Back-End",
            termsOfService:
              process.env.TERMS_URL || "http://example.com/terms/",
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
      })
    );
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
    const job = new CronJob(
      "* * * * *", // cronTime
      async function () {
        // let user = await usersService.getUsers()
        attservice.addAttendance({
          attendance: {},
        });
        console.log("You will see this message every minute");
      }, // onTick
      null, // onComplete
      true, // start
      "America/Los_Angeles" // timeZone
    );

    job.start();
  }
}
