import boardModel from "../model/board";
import Board from "../model/board"


export const home = async (req,res) => {
     await Board.find();
    return res.render("home",{pageTitle: "Home"});}

export const handleBoard = (req, res) => res.render("board");

export const getUpload = (req, res) => {
    res.render("upload",{ pageTitle:"Upload"});
}
export const postUpload = async(req, res) => {
    const {title,
        description,
        contents} = req.body;
        console.log(req.body);
     await boardModel.create({
        title:title,
        description:description,
        contents:contents,
        creatAt:Date.now(),
    });

    return res.redirect("/");
}




