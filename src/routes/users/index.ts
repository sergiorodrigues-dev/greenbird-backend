import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello I'm a user"); // to do -> controller -> service (MONGO! & JWT)
});

export default router;
