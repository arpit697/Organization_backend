import { NextFunction, Request, Response } from "express";
import { authenticationService } from "./authentication.service";
import { ACCOUNT_MESSAGES } from "./authentication.constants";
import { ResponseError } from "../../../utils/error";
import { AUTHORIZATION } from "../../../constants/message.constants";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete,
} from "swagger-express-ts";

/**
 * @class AccountController
 * @description Controller to handle account-related operations such as login, logout, signup, profile management, and updating user details.
 */
@ApiPath({
  path: "",
  name: "User Registration and Authentication",
})
class AuthenticationController {
  /**
   * @method login
   * @description Authenticates a user with email and password, and creates a session.
   * @param {Request} req - Express request object containing email and password in the body.
   * @param {Response} res - Express response object to send the authentication result.
   * @param {NextFunction} next - Express next function to handle errors.
   */
  @ApiOperationPost({
    path: "/login",
    description: "User Login",
    summary:
      "Authenticates a user with email and password, and creates a session.",
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
    parameters: {
      body: {
        description: "Account Login Model",
        required: true,
        model: "Login Model",
      },
    },
  })
  login(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    authenticationService
      .createSession(req, email, password, req.client!)
      .then((result: any): void => {
        res
          .status(200)
          .json({ message: ACCOUNT_MESSAGES.LOGIN.SUCCESS, result });
      })
      .catch(next);
  }

  /**
   * @method logout
   * @description Logs out a user by invalidating the session based on session ID.
   * @param {Request} req - Express request object containing the session ID in the body.
   * @param {Response} res - Express response object to send the result of the logout operation.
   * @param {NextFunction} next - Express next function to handle errors.
   */
  @ApiOperationPost({
    path: "/logout",
    description:
      "Logs out a user by invalidating the session based on session ID",
    summary: "Logs out a user by invalidating the session based on session ID",
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
    parameters: {
      body: {
        description: "Account Logout",
        required: true,
        model: "Logout Model",
      },
    },
  })
  logout(req: Request, res: Response, next: NextFunction): void {
    const { sessionId } = req.body;
    authenticationService
      .updateSession(sessionId)
      .then((data): void => {
        res.status(data.status).json({ result: data });
      })
      .catch(next);
  }

  /**
   * @method signup
   * @description Registers a new user account with email, password, and full name.
   * @param {Request} req - Express request object containing email, password, and full name in the body.
   * @param {Response} res - Express response object to send the result of the signup operation.
   * @param {NextFunction} next - Express next function to handle errors.
   */
  @ApiOperationPost({
    path: "/sign-up",
    summary:'Registers a new user account with email, password, and full name',
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
    parameters: {
      body: {
        description: "Account Registration",
        required: true,
        model: "Account Registration Model",
      },
    },
  })
  signup(req: Request, res: Response, next: NextFunction): void {
    const { email, password, fullName } = req.body;
    authenticationService
      .createAccount(email, password, fullName)
      .then((result): void => {
        res
          .status(201)
          .json({ message: ACCOUNT_MESSAGES.SIGNUP.SUCCESS, result });
      })
      .catch(next);
  }
  /**
   * @method renew
   * @description Renews a user session using a refresh token and user type.
   * @param {Request} req - Express request object containing refreshToken and userType in the body.
   * @param {Response} res - Express response object to send the result of the session renewal operation.
   * @param {NextFunction} next - Express next function to handle errors.
   */

  @ApiOperationPost({
    path: "/renew-session",
    summary:'Renews a user session using a refresh token and user type',
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
    parameters: {
      body: {
        description:
          "Renews a user session using a refresh token and user type",
        required: true,
        model: "Renew Session Model",
      },
    },
  })
  renew(req: Request, res: Response, next: NextFunction) {
    const { refreshToken, userType } = req.body;
    authenticationService
      .renewSession(refreshToken, userType)
      .then((data): void => {
        res.status(200).json({ result: data });
      })
      .catch(next);
  }

  /**
   * @method profile
   * @description Retrieves the profile details of the authenticated user.
   * @param {Request} req - Express request object containing user data, such as userId.
   * @param {Response} res - Express response object to send the user's profile details.
   * @param {NextFunction} next - Express next function to handle errors.
   */
  // profile(req: Request, res: Response, next: NextFunction): void {
  //   const userId = <string>req.user?.userId;
  //   if (!userId) {
  //     return next(new ResponseError(401, AUTHORIZATION.EXPIRED));
  //   }

  //   authenticationService
  //     .details(userId)
  //     .then((result): void => {
  //       if (result) {
  //         res.status(200).json({ message: ACCOUNT_MESSAGES.PROFILE.SUCCESS, result });
  //       } else {
  //         next(new ResponseError(401, AUTHORIZATION.EXPIRED));
  //       }
  //     })
  //     .catch(next);
  // }

  /**
   * @method update
   * @description Updates the authenticated user's profile with new data.
   * @param {Request} req - Express request object containing userId and updated data in the body.
   * @param {Response} res - Express response object to send the result of the update operation.
   * @param {NextFunction} next - Express next function to handle errors.
   */
  // update(req: Request, res: Response, next: NextFunction): void {
  //   const userId = <string>req.user?.userId;
  //   if (!userId) {
  //     return next(new ResponseError(401, AUTHORIZATION.EXPIRED));
  //   }

  //   authenticationService
  //     .update(userId, req.body)
  //     .then((result): void => {
  //       res.status(200).json({ message: ACCOUNT_MESSAGES.PROFILE.UPDATED, result });
  //     })
  //     .catch(next);
  // }
}

export const authenticationController = new AuthenticationController();
