import jwt from "jsonwebtoken";

export const DecodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_TOKEN_KEY || "");
};
