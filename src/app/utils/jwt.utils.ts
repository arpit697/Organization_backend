const config = require('config');
import { UserType } from "../constants/user.type.constants";
import { SignOptions, sign } from "jsonwebtoken";

class TokenUtil {
  /**
   * @description A function to generate auth token while logging in.
   * @param payload A payload data which will be stored in jwt.
   * @param userType A user type for which token will be generated (secrets are different for different type of users)
   * @param expiresIn A time in which jwt will be expired
   */
  generateAuthToken(payload: {[key: string]: any}, userType: UserType, expiresIn?: number | string) {
    const authToken = config.secrets[userType].authToken;

    const options: SignOptions = {};
    if (expiresIn) {
      options.expiresIn = expiresIn;
    }
    return sign(payload, authToken, options);
  }
}

export const tokenUtil = new TokenUtil();
