import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth-route";
import movieRoutes from "./routes/movie-route";
import tvRoutes from "./routes/tv-route";
import searchRoutes from "./routes/search-route";
import { protectRoute } from "./middlewares/protect-route";

import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow requests only from your frontend
  credentials: true, // Allow credentials (cookies or authorization tokens)
};

app.use(cors(corsOptions));

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.get("/", async (_: Request, res: Response) => {
  res.send("Welcome Netflix API Server");
  //localhost:8000/
});
connectDB(MONGO_URI);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа`);
});
