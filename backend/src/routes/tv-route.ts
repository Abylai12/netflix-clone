import { Router } from "express";
import {
  getSimilarTvs,
  getTrendingTv,
  getTvDetails,
  getTvsByCategory,
  getTvTrailers,
} from "../controllers/tv-controller";

const router = Router();
router.route("/trending").get(getTrendingTv);
router.route("/:id/trailers").get(getTvTrailers);
router.route("/:id/details").get(getTvDetails);
router.route("/:id/similar").get(getSimilarTvs);
router.route("/:category").get(getTvsByCategory);

export default router;
