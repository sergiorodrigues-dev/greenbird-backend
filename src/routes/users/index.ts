import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Route to get users"); // to do -> controller -> service (MONGO & JWT)
});

router.get("/user", (req: Request, res: Response) => {
  res.send("Route to get user by id for example"); // to do -> controller -> service (MONGO & JWT)
});

export default router;
