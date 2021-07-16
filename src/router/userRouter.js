import express from "express";
import {profile} from "../controller/userController";


const userRouter = express.Router();

userRouter.get("/profile",profile);


export default userRouter;