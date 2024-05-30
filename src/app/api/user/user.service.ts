import { FilterQuery } from "mongoose";
import { UserModel } from "./user.model";

class UsersService {
  async getUsers(query?: any) {
    if (query) {
      return await UserModel.find(query);
    } else {
      return await UserModel.find({});
    }
  }

  async findUser(query?: any) {
    return await UserModel.findOne(query);
  }

  async registerUser(payload: any) {
    return await UserModel.create(payload);
  }

  async deleteUser(payload: any) {
    return await UserModel.deleteOne(payload);
  }
}

export const usersService = new UsersService();
