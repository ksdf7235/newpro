import { async } from "regenerator-runtime";
import boardModel from "../model/board";
import Board from "../model/board"


export const home = async (req,res) => {
     try{
         const boards = await Board.find({});
    return res.render("home",{pageTitle: "Home", boards});
}
    catch{
        return res.redirect("/board")
    }
    
    }
     
export const handleBoard = async (req, res) => {
    const {id} = req.params;
    const board = await Board.findById(id).populate("owner");
    return res.render("board",{ pageTitle: board.title, board });
}

export const getUpload = (req, res) => {
    res.render("upload",{ pageTitle:"Upload"});
}
export const postUpload = async(req, res) => {
    const {
        user:{_id},
    }= req.session;
    const {title,
        description,
        contents} = req.body;
        console.log(req.body);
     await boardModel.create({
        title:title,
        description:description,
        contents:contents,
        creatAt:Date.now(),
        owner:_id,
    });

    return res.redirect("/");
}




