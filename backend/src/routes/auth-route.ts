import { Router } from "express";
import { authCheck, login, signup } from "../controllers/auth-controller";
import { protectRoute } from "../middlewares/protect-route";

const router = Router();
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/authCheck").get(protectRoute, authCheck);

export default router;
