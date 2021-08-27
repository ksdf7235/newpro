import express from "express";
import {home} from "../controller/boardController";
import {getJoin,logout,postJoin,getlogin,postlogin} from "../controller/userController";

const rootRouter = express.Router();

rootRouter.get("/",home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getlogin).post(postlogin);
rootRouter.get("/logout",logout);

export default rootRouter;