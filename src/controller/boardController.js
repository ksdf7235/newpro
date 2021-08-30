import { async } from "regenerator-runtime";
import boardModel from "../model/board";
import Board from "../model/board"
import User from "../model/User";


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
    try{
        const newBoard = await boardModel.create({
            title:title,
            description:description,
            contents:contents,
            creatAt:Date.now(),
            owner:_id,
        });
        const user= await User.findById(_id);
        user.boards.push(newBoard._id);
        user.save();
        return res.redirect("/");
    }catch(error){
        console.log(error);
        return res.status(400).render("upload",{ 
            pageTitle: "Upload Video", 
            errorMessage :error._message,});
    }
    }
    
    export const getEdit = async(req, res) => {
        const {id} = req.params;
        const { user:{_id}} =req.session;
        const board= await Board.findById(id);
        if(board == null) {
            return res.status(400).render("494", {pageTitle: "NOT Found"})
        }
        return res.render("edit",{ pageTitle:`수정 | ${board.title}`,board});
    }
    
    
    export const postEdit = async(req, res) => {
        const {id} = req.params;
        const { user:{_id}} =req.session;
        const {title,description,contents} = req.body;
        const board= await Board.findById(id);
        if(!board){
            return res.status(400).render("494", {pageTitle: "NOT Found"});
        }
        if(String(board.owner)!==String(_id)){
            return res.status(403).redirect("/");
        }
        await Board.findByIdAndUpdate(id,{
            title,
            description,
            contents
        });
        return res.redirect(`/board/${id}`);

    }
    
    export const deleteBoard = async(req, res) => {
        const {id} = req.params;
        const {
            user:{_id},
        }=req.session;
        const board = await Board.findById(id);
        if(!board){
            return res.status(400).render("494", {pageTitle: "NOT Found"});
        }
        if(String(board.owner)!==String(_id)){
            return res.status(403).redirect("/");
        }
        await Board.findByIdAndDelete(id);
        return res.redirect("/");
    }