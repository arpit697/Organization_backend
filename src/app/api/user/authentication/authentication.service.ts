import { sessionService } from "../../session/session.service";
import { AuthenticationModel } from "./authentication.model";
import { IUserDocument, IUser } from "./authentication.interface";
import { IClient } from "../../session/session.interface";
import { UserType } from "../../../constants/user.type.constants";
import {
  ACCOUNT_MESSAGES,
  TokenStatus,
  USER_STATUS,
} from "./authentication.constants";
import { SessionModel } from "../../session/session.model";

import { ResponseError } from "../../../utils/error";
import { passwordUtil } from "../../../utils/password.util";
import { tokenUtil } from "../../../utils/jwt.utils";
import { utilityFunctions } from "../../../utils/utility.function";
import mongoose from "mongoose";

class AuthenticationService {
  private static readonly ACCESS_TOKEN_EXPIRY = "1d";
  private static readonly REFRESH_TOKEN_EXPIRY = "7d";

  private async generateTokens(
    userId: string,
    sessionId: string,
    userType: UserType
  ) {
    const accessTokenExpiration = await utilityFunctions.calculateExpiration(
      AuthenticationService.ACCESS_TOKEN_EXPIRY
    );
    const refreshTokenExpiration = await utilityFunctions.calculateExpiration(
      AuthenticationService.REFRESH_TOKEN_EXPIRY
    );

    const accessToken = await tokenUtil.generateAuthToken(
      { userId, sessionId },
      userType,
      AuthenticationService.ACCESS_TOKEN_EXPIRY
    );

    const refreshToken = await tokenUtil.generateAuthToken(
      { userId, sessionId },
      userType,
      AuthenticationService.REFRESH_TOKEN_EXPIRY
    );

    return {
      accessToken,
      accessTokenExpiry: accessTokenExpiration,
      refreshToken,
      refreshTokenExpiry: refreshTokenExpiration,
    };
  }

  /**
   * @description Create a session for a user by verifying email and password
   * @param {string} email User email
   * @param {string} password User password
   * @param {IClient} client Client information
   */
  async createSession(
    email: string,
    password: string,
    client: IClient
  ): Promise<any> {
    const user = await AuthenticationModel.findOne<IUserDocument>({ email });
    if (!user || !(await user.verifyPassword(password))) {
      return Promise.reject(
        new ResponseError(401, ACCOUNT_MESSAGES.LOGIN.INVALID, 4012)
      );
    }

    const { sessionId, sessionExpireAt } = await sessionService.create(
      client,
      { userId: user._id, type: UserType.USER },
      AuthenticationService.ACCESS_TOKEN_EXPIRY
    );
    const tokens = await this.generateTokens(
      user._id,
      sessionId,
      UserType.USER
    );

    return {
      sessionId,
      sessionExpiry: sessionExpireAt,
      tokens,
      profile: {
        ...user.toObject(),
        password: undefined,
        passwordToken: undefined,
      },
    };
  }

  /**
   * @description Renew the session by generating a new access token using the provided refresh token
   * @param {string} refreshToken - The refresh token to validate and use for generating a new access token
   * @param {string} [userType] - Optional user type (defaults to UserType.USER)
   * @returns {Promise<object>} - An object containing the new access token and its expiration time
   */
  async renewSession(
    refreshToken: string,
    userType: string = UserType.USER
  ): Promise<any> {
    try {
      const decoded = tokenUtil.verifyAuthToken(
        refreshToken,
        <UserType>userType
      );

      const session = await SessionModel.findOne({
        _id: decoded.sessionId,
        isActive: true,
      });

      console.log(session);

      if (!session) {
        return Promise.reject(new ResponseError(401, "Invalid session", 4013));
      }
      const tokens = await this.generateTokens(
        decoded.userId,
        session._id,
        <UserType>userType
      );
      await SessionModel.updateOne(
        { _id: session._id },
        {
          $set: {
            updatedAt: new Date(),
            expireAt: tokens.accessTokenExpiry,
          },
        }
      );
      return tokens;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return Promise.reject(
          new ResponseError(401, "Refresh token expired", 4014)
        );
      } else if (err.name === "JsonWebTokenError") {
        return Promise.reject(new ResponseError(401, "Invalid token", 4015));
      }
      return Promise.reject(err);
    }
  }

  /**
   * @description Update session status to inactive
   * @param {string} sessionId Session document ObjectId
   */
  async updateSession(sessionId: string) {
    try {
      if (!mongoose.isValidObjectId(sessionId)) {
        return Promise.reject(
          new ResponseError(400, `${sessionId} is not a valid string`)
        );
      }

      const session = await SessionModel.findOne({ _id: sessionId });
      if (!session) {
        return { status: 400, message: `${sessionId} :- session not found` };
      }

      await SessionModel.updateOne(
        { _id: sessionId },
        { $set: { isActive: false } }
      );
      return {
        status: 200,
        result: `${sessionId} :- is now inactive`,
        message: `User logged out successfully`,
      };
    } catch (error: any) {
      return Promise.reject(new ResponseError(400, error.message));
    }
  }

  /**
   * @description Create a new account or return an error if the account already exists
   * @param {string} email User email
   * @param {string} password User password
   * @param {string} fullName User full name
   */
  async createAccount(email: string, password: string, fullName: string) {
    try {
      const { modifiedCount, upsertedId } = await AuthenticationModel.updateOne(
        { email },
        {
          $set: {},
          $setOnInsert: {
            email,
            password,
            fullName,
            status: USER_STATUS.INACTIVE,
          },
        },
        { upsert: true }
      );

      if (modifiedCount) {
        return Promise.reject(
          new ResponseError(400, ACCOUNT_MESSAGES.SIGNUP.ALREADY_EXISTS)
        );
      }
      return upsertedId ? upsertedId : null;
    } catch (err: any) {
      return Promise.reject(new ResponseError(400, err.message));
    }
  }

  /**
   * @description Fetch user details by ID
   * @param {string} id User document ObjectId
   */
  async details(id: string): Promise<IUser | null> {
    return await AuthenticationModel.findById(id, { password: 0 })
      .lean()
      .exec();
  }

  /**
   * @description Update user details by ID
   * @param {string} id User document ObjectId
   */
  async update(id: string, payload: any): Promise<IUser | null> {
    const user = await AuthenticationModel.findByIdAndUpdate(id, payload, {
      new: true,
      projection: { password: false },
    });

    if (!user) {
      return Promise.reject(
        new ResponseError(400, ACCOUNT_MESSAGES.UPDATE.NOT_FOUND)
      );
    }
    return user.toObject();
  }

  /**
   * @description Verify the token for the forget password process
   * @param {string} token Password reset token
   */
  async verifyForgetPasswordToken(token: string): Promise<TokenStatus> {
    try {
      tokenUtil.verifyPwdMailToken(token, UserType.USER);
      const isExists = await AuthenticationModel.exists({
        passwordToken: token,
      });

      return isExists ? TokenStatus.Active : TokenStatus.Invalid;
    } catch (err: any) {
      return err.name === "TokenExpiredError"
        ? TokenStatus.Expired
        : Promise.reject(err);
    }
  }

  /**
   * @description Reset password using the provided token
   * @param {string} token Password reset token
   * @param {string} password New password
   */
  async resetPassword(token: string, password: string): Promise<void> {
    try {
      tokenUtil.verifyPwdMailToken(token, UserType.USER);

      const doc = { password, isModified: () => true };
      await passwordUtil.hook.call(doc as any);

      const user = await AuthenticationModel.findOneAndUpdate(
        { passwordToken: token },
        {
          $set: { password: doc.password },
          $unset: { passwordToken: "" },
        }
      );

      if (!user) {
        return Promise.reject(
          new ResponseError(400, ACCOUNT_MESSAGES.RESET_PASSWORD.NOT_FOUND)
        );
      }

      await SessionModel.updateMany(
        { userId: user._id, isActive: true },
        { $set: { isActive: false } }
      );
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return Promise.reject(
          new ResponseError(400, ACCOUNT_MESSAGES.RESET_PASSWORD.INVALID_TOKEN)
        );
      } else if (err.name === "TokenExpiredError") {
        return Promise.reject(
          new ResponseError(400, ACCOUNT_MESSAGES.RESET_PASSWORD.TOKEN_EXPIRED)
        );
      }
      return Promise.reject(err);
    }
  }
}

export const authenticationService = new AuthenticationService();
