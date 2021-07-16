import express from "express";
import {handleBoard,uploadBoard} from "../controller/boardController"



const boardRouter = express.Router();

boardRouter.get("/",handleBoard);
boardRouter.get("/upload",uploadBoard);

export default boardRouter;