import { Request, Response } from "express";
import UserService from "../services/userService";
import mongoose from "mongoose";

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ error: "Invalid user ID format" });
        return;
      }

      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;
