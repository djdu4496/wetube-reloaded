import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

const PORT = 4000;
// 1. App 만들기
const app = express();

// 2. App 설정하기
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/", logger, globalRouter);
app.use(express.urlencoded({ extended : true}))
app.use("/users", userRouter);
app.use("/videos", videoRouter);



// 3. App 외부에 개방하기
app.listen(PORT); 