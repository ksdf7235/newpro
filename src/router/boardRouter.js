import express from "express";
import {deleteBoard,handleBoard,postUpload,getUpload,getEdit,postEdit} from "../controller/boardController"
import {videoUpload,} from "../middleware";


const boardRouter = express.Router();

boardRouter.get("/:id([0-9a-f]{24})",handleBoard);
boardRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
boardRouter.route("/:id([0-9a-f]{24})/delete").get(deleteBoard);
boardRouter.route("/upload").get(getUpload).post(videoUpload.single("video"), postUpload);
export default boardRouter;