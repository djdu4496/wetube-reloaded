import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

// 1. App 만들기
const app = express();

// 2. App 설정하기
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended : true}))
app.use("/", logger, rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;