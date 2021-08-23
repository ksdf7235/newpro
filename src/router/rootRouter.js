import express from "express";
import {home} from "../controller/boardController";
import {GetJoin,login,PostJoin} from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get("/",home);
globalRouter.route("/join").get(GetJoin).post(PostJoin);
globalRouter.get("/login",login);

export default globalRouter;