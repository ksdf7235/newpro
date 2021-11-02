import express from "express";
import {home,page,paging,test} from "../controller/boardController";
import {getJoin,logout,postJoin,getlogin,postlogin} from "../controller/userController";
import {imgList} from "../controller/imgBoardController";



const rootRouter = express.Router();

rootRouter.get("/",home)
rootRouter.get("/test",test)
rootRouter.get("/page",page)
rootRouter.get("/page/:id([0-9]{1,10})",paging)
rootRouter.get("/img",imgList);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getlogin).post(postlogin);
rootRouter.get("/logout",logout);

export default rootRouter;