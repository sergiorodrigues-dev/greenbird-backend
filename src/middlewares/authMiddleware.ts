import { Request, Response, NextFunction } from "express";
import AuthService from "../services/authService";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string }; // add user property to request
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Access token required" });
    return;
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  try {
    const decoded = AuthService.verifyAccessToken(token) as {
      id: string;
      role: string;
    };
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired access token" });
    return;
  }
}
