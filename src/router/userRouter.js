import express from "express";
import {profile,getEditProfile, postEditProfile} from "../controller/userController";
import {avatarUpload} from "../middleware";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})",profile);
userRouter.route("/:id([0-9a-f]{24})/edit").get(getEditProfile).post(avatarUpload.single("avatar"), postEditProfile);


export default userRouter;