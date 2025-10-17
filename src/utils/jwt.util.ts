import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

export const signToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"]
  };
  return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET);
};
