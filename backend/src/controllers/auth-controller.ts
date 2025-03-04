import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateToken } from "../utils/generate-token";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { email, password, username } = data;
    if (!email || !password || !username) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      res.status(201).json({ success: false, message: "Invalid email" });
      return;
    }

    if (password.length < 6) {
      res.status(201).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
      return;
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      res.status(201).json({ success: false, message: "Email already exists" });
      return;
    }

    const existingUserByUsername = await User.findOne({ userName: username });

    if (existingUserByUsername) {
      res
        .status(201)
        .json({ success: false, message: "Username already exists" });
      return;
    }

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = await User.create({
      email,
      password,
      userName: username,
      image,
    });
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(201)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(201).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(201).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = generateToken({ id: user._id });

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// export const logout = async (_: Request, res: Response) => {
//   try {
//     res.clearCookie("jwtnetflix");
//     res.status(200).json({ success: true, message: "Logged out successfully" });
//   } catch (error: any) {
//     console.log("Error in logout controller", error.message);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const authCheck = async (req: Request, res: Response) => {
  try {
    const user = {
      username: req.user.userName,
      email: req.user.email,
      image: req.user.image,
    };
    res.status(200).json(user);
  } catch (error: any) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
