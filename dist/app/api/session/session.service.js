"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionService = void 0;
const user_type_constants_1 = require("src/app/constants/user.type.constants");
const jwt_utils_1 = require("src/app/utils/jwt.utils");
const session_model_1 = require("./session.model");
class SessionService {
    create(client, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = user.userId;
            if (user.type === user_type_constants_1.UserType.SUPER_ADMIN) {
                yield session_model_1.SessionModel.updateMany({ type: 'SUPER_ADMIN', userId: id, isActive: true }, { isActive: false });
            }
            const session = yield new session_model_1.SessionModel(Object.assign({ client }, user)).save();
            return jwt_utils_1.tokenUtil.generateAuthToken(Object.assign(Object.assign({}, user), { sessionId: session._id }), user.type);
        });
    }
}
exports.sessionService = new SessionService();
