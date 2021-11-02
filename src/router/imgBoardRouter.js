import express from "express";
import { handleImgBoard,imgBucket,deleteImgBoard,getEditImg,postEditImg,copyImgBoard } from "../controller/imgBoardController";



const imgBoardRouter = express.Router();



imgBoardRouter.get("/:id([0-9a-f]{24})",handleImgBoard).post("/:id([0-9a-f]{24})",imgBucket);
imgBoardRouter.route("/:id([0-9a-f]{24})/delete").get(deleteImgBoard);
imgBoardRouter.route("/:id([0-9a-f]{24})/copy").get(copyImgBoard);
imgBoardRouter.route("/:id([0-9a-f]{24})/edit").get(getEditImg).post(postEditImg);


export default imgBoardRouter;