import { Router } from "express";
import User from "../models/User";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", authenticate, async (req, res) => {
  // ideal: validar rol admin
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
 