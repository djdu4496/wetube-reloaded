import express from "express";
import { join, login } from "../controllers/userController.js";
import { trending } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/login", login);
globalRouter.get("/join", join);
export default globalRouter;