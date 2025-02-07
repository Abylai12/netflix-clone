import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

export const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "15d",
  });

  res.cookie("jwtnetflix", token, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // prevents CSRF attack, cross-site request forgery attack
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};
