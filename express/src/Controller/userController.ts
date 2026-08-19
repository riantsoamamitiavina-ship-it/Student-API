import { Router, Request, Response } from "express";
import * as UserService from "../Service/userService";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const newUser = await UserService.registerUser(email, password);
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});


router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
    if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  try {
    const token = await UserService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;