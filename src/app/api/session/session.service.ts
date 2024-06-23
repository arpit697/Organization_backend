import { UserType } from "../../constants/user.type.constants";
import { IClient, ISessionUser } from "./session.interface";
import { tokenUtil } from "../../utils/jwt.utils";
import { SessionModel } from "./session.model";

class SessionService {
  async create(client: IClient, user: ISessionUser): Promise<string> {
    const id = user.userId;
    if (user.type === UserType.SUPER_ADMIN) {
      await SessionModel.updateMany(
        { type: 'SUPER_ADMIN', userId: id, isActive: true },
        { isActive: false }
      );
    }
    const session = await new SessionModel({ client, ...user }).save();
    return tokenUtil.generateAuthToken(
      {
        ...user,
        sessionId: session._id,
      },
      user.type
    );
  }
}
export const sessionService = new SessionService();