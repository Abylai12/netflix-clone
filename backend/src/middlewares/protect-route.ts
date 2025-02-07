import dotenv from "dotenv";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/decode-token";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: string | any;
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["jwt-netflix"];
    console.log("token", token);
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
      return;
    }

    const userId = decodeToken(token);

    if (!userId) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
      return;
    }

    const user = await User.findById(userId).select(
      "-password -otp -passwordResetToken"
    );

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    req.user = user;

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
