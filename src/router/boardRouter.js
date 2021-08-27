import express from "express";
import {handleBoard,postUpload,getUpload} from "../controller/boardController"



const boardRouter = express.Router();

boardRouter.get("/:id([0-9a-f]{24})",handleBoard);
boardRouter.route("/upload").get(getUpload).post(postUpload);

export default boardRouter;