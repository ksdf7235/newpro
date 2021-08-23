
import express from "express";
import morgan from "morgan"; //서버 이동 기록을 남기는 장치
import globalRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import boardRouter from "./router/boardRouter";


const app = express();
const logger = morgan("dev");


app.use(logger);
// app.user("/url") 하면 해당 url을 뿌리로 하겠다는 뜻입니다. 기억하세요 좀 
app.use("/user" , userRouter);
app.use("/login" , userRouter);
app.use("/" , globalRouter);
app.use("/board" , boardRouter);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

export default app;




