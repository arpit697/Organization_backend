import { NextFunction, Request, Response } from "express";
import { createNewLogger } from "../utils/logger";

export const loggerMiddleWare = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Store the start time of the request in local variables
    res.locals.startTime = Date.now();

    // Extract the IP address of the client from the request object
    const clientIp = req.ip;

    // Check if the request path is the root path ("/")
    if (req.path === "/") {
        return next();
    }

    // Log the request information
    const startTime = Date.now();
    const serverLogger = createNewLogger("server");
    res.on("finish", () => {
        const time = Date.now() - startTime;
        const color =
            res.statusCode >= 500
                ? 31 // red
                : res.statusCode >= 400
                    ? 33 // yellow
                    : res.statusCode >= 300
                        ? 36 // cyan
                        : res.statusCode >= 200
                            ? 32 // green
                            : 0; // no color
        serverLogger.info(
            `${req.method} ${req.baseUrl + req.path} \x1b[${color}m${res.statusCode
            }\x1b[0m - ${time} ms`,
            {
                // Include IP address along with other request data
                data: {
                    ip: clientIp,
                    params: req.params || {},
                    query: req.query || {},
                    body: req.body || {},
                    headers: req.headers,
                },
            }
        );
    });

    // Continue to the next middleware or route handler
    next();
};
