import { Router } from "express";
import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search-controller";

const router = Router();
router.route("/person/:query").get(searchPerson);
router.route("/movie/:query").get(searchMovie);
router.route("/tv/:query").get(searchTv);
router.route("/history").get(getSearchHistory);
router.route("/history/:id").delete(removeItemFromSearchHistory);

export default router;
