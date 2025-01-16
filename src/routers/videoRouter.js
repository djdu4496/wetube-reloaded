import express from "express";
import {watch, edit, search, upload, deleteVideo } from "../controllers/videoController.js";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/search", search);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;



