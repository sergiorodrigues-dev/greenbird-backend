import { Router, Request, Response } from "express";
import { authenticateToken } from "../../middlewares/authMiddleware";
import UserController from "../../controllers/userController";

const router = Router();

router.get("/", authenticateToken, UserController.getAllUsers);

router.get("/user/:userID", authenticateToken, UserController.getUserById);

export default router;
