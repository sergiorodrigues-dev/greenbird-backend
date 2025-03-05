import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
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
      refreshToken: this.generateRefreshToken(user._id.toString()),
      user: user,
    };
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }

  static verifyRefreshToken(token: string): JwtPayload {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);

    if (typeof decoded !== "object" || decoded === null) {
      throw new Error("Invalid token format");
    }

    if (!("exp" in decoded) || !("iat" in decoded)) {
      throw new Error("Invalid token payload");
    }

    return decoded as JwtPayload;
  }
}

export default AuthService;
