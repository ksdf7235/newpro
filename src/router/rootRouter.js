import express from "express";
import {view} from "../controller/boardController";
import {Join,login} from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get("/",view);
globalRouter.get("/join",Join);
globalRouter.get("/login",login);

export default globalRouter;