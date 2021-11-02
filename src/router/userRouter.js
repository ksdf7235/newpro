import express from "express";
import {profile,getEditProfile,postEditProfile,getBucket,postBucket,getBucketDel,getOrder} from "../controller/userController";
import {avatarUpload} from "../middleware";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})",profile);
userRouter.route("/:id([0-9a-f]{24})/bucket").get(getBucket).post(postBucket);
userRouter.route("/:id([0-9a-f]{24})/bucket/:id([0-9a-f]{24})/delete").get(getBucketDel);
userRouter.route("/:id([0-9a-f]{24})/order").get(getOrder);
userRouter.route("/:id([0-9a-f]{24})/edit").get(getEditProfile).post(avatarUpload.single("avatar"), postEditProfile);


export default userRouter;