import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

class AuthService {
  static generateAccessToken(userId: string, role: string) {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }
  static generateRefreshToken(userId: string) {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: "7d",
    });
  }

  static async register(name: string, email: string, password: string) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserModel.create({ name, email, password: hashedPassword });
  }

  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    return {
      accessToken: this.generateAccessToken(user._id.toString(), user.role),
      refreshTolen: this.generateRefreshToken(user._id.toString()),
    };
  }

  static vefifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
  }
}

export default AuthService;
