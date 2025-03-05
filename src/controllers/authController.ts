import { Request, Response } from "express";
import AuthService from "../services/authService";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newUser = await AuthService.register(name, email, password);
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await AuthService.login(
        email,
        password
      );
      res.json({ accessToken, refreshToken, user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(401).json({ error: "Refresh token is required" });
        return;
      }

      const decoded = AuthService.verifyRefreshToken(refreshToken);
      const newAccessToken = AuthService.generateAccessToken(
        decoded.id,
        "user"
      );

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(403).json({ error: "Invalid or expired refresh token" });
    }
  }
}

export default AuthController;
