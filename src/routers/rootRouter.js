import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController.js";
import { home, search } from "../controllers/videoController.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/search", search);
export default rootRouter;