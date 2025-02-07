import { Request, Response } from "express";
import { fetchFromTMDB } from "../services/tmdb-service";

export const getTrendingTv = async (req: Request, res: Response) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTvTrailers = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error: any) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
      return;
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTvDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error: any) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
      return;
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSimilarTvs = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTvsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
