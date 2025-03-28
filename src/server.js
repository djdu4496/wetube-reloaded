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
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));

app.use(localsMiddleware);
app.use("/", logger, rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;