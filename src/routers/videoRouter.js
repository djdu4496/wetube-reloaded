import express from "express";
import {see, edit, search, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/search", search);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;



