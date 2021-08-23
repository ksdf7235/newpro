import { async } from "regenerator-runtime";
import Board from "../model/board"


export const home = async (req,res) => {
     await Board.find();
    return res.render("home",{pageTitle: "Home"});}

export const handleBoard = (req, res) => res.render("board");

export const uploadBoard = (req, res) => res.render("uploadBoard");




