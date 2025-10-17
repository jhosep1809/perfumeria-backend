import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });
  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Token error" });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: "Token malformado" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as ITokenPayload;
    (req as any).user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
