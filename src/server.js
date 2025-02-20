import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import { localsMiddleware } from "./middlewares.js";

// 1. App 만들기
const app = express();

// 2. App 설정하기
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended : true}))

app.use(session({
  secret: "Hello!",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
}));

app.use(localsMiddleware);
app.use("/", logger, rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;