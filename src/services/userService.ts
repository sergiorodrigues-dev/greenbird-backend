import UserModel from "../models/userModel";

class UserService {
  static async getAllUsers() {
    return await UserModel.find();
  }

  static async getUserById(userId: string) {
    return await UserModel.findById(userId);
  }

  static async deleteUser(userId: string) {
    return await UserModel.findByIdAndDelete(userId);
  }
}

export default UserService;
