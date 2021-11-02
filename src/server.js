import express from "express";
import morgan from "morgan"; //서버 이동 기록을 남기는 장치
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./router/userRouter";
import boardRouter from "./router/boardRouter";
import imgBoardRouter from "./router/imgBoardRouter";
import adminRouter from "./router/adminRouter";
import rootRouter from "./router/rootRouter";
import { localMiddleWare } from "./middleware";


const app = express();
const logger = morgan("dev");


app.use(logger);
// app.user("/url") 하면 해당 url을 뿌리로 하겠다는 뜻입니다. 기억하세요 좀 
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({  
    saveUninitialized:false,
    resave:false,
    secret:'secretsessionkey',
    store : MongoStore.create({mongoUrl:"mongodb://127.0.0.1:27017/newpro" }),
    })
);
app.use(localMiddleWare);
app.use("/" , rootRouter);
app.use("/uploads" , express.static("uploads"));
app.use("/client", express.static("src/client"));
app.use("/users" , userRouter);
app.use("/login" , userRouter);
app.use("/board" , boardRouter);
app.use("/img", imgBoardRouter)
app.use("/admin", adminRouter)

export default app;




