import { UserType } from "../../constants/user.type.constants";
import { IClient, ISessionUser } from "./session.interface";
import { SessionModel } from "./session.model";
import { utilityFunctions } from "../../../../src/app/utils/utility.function";

class SessionService {
  async create(
    req: Request,
    client: IClient,
    user: ISessionUser,
    expiresIn?: any
  ): Promise<{ sessionId: string; sessionExpireAt: Date }> {
    const id = user.userId;
    if (user.type === UserType.SUPER_ADMIN) {
      await SessionModel.updateMany(
        { type: "SUPER_ADMIN", userId: id, isActive: true },
        { isActive: false }
      );
    }
    const sessionExpireation = await utilityFunctions.calculateExpiration(
      expiresIn
    );

    const session = await new SessionModel({
      client,
      ...user,
      expireAt: sessionExpireation,
    }).save();

    return {
      sessionId: session._id.toString(),
      sessionExpireAt: sessionExpireation,
    };
  }
}
export const sessionService = new SessionService();
