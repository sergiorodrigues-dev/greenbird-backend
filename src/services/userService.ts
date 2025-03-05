import UserModel from "../models/userModel";

class UserService {
  static async getAllUsers() {
    return await UserModel.find().lean(); // Returns a pure JSON, without Mongoose methods, with best perfomance and safety
  }

  static async getUserById(userId: string) {
    return await UserModel.findById(userId).select("-password").lean(); // Without password
  }

  static async deleteUser(userId: string) {
    return await UserModel.findByIdAndDelete(userId);
  }
}

export default UserService;
