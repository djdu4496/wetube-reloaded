import express from "express";
import { join, login } from "../controllers/userController.js";
import { home } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/login", login);
globalRouter.get("/join", join);
export default globalRouter;