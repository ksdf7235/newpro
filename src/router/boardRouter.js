import express from "express";
import {handleBoard,postUpload,getUpload} from "../controller/boardController"



const boardRouter = express.Router();

boardRouter.get("/",handleBoard);
boardRouter.route("/upload").get(getUpload).post(postUpload);

export default boardRouter;