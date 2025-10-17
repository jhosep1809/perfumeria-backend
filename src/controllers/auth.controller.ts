import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/password.util";
import { signToken } from "../utils/jwt.util";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email ya registrado" });

  const hashed = await hashPassword(password);
  const user = new User({ name, email, password: hashed, role });
  await user.save();
  const token = signToken({ id: user._id, role: user.role });
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = signToken({ id: user._id, role: user.role });
  res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
};
