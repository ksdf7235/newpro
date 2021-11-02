import express from "express";
import {admin,getABoard,getAuser,getAorder} from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.get("/",admin);
adminRouter.get("/board",getABoard);
adminRouter.get("/user",getAuser);
adminRouter.get("/order",getAorder);

export default adminRouter;