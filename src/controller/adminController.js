
import { async } from "regenerator-runtime";
import boardModel from "../model/board";
import Board from "../model/board"
import imgBoard from "../model/imgBoard"
import User from "../model/User";
import countModel from "../model/countBucket";
import orderModel from "../model/order";

export const admin = async (req,res) => {
    try{
       const {administer} =req.session.user
        console.log(administer)

    if(administer){     
            return res.render("admin",{pageTitle: "Admin", });
        }else{
            return res.redirect("/",{pageTitle: "관리자 아님" })
        }
    }
   catch{
       return res.redirect("/")
   }
   
   }

export const getABoard = async (req,res) => {
    const boards = await Board.find({}).populate("owner");
    const imgBoards = await imgBoard.find({}).populate("owner");

    return res.render("aboard",{pageTitle: "Admin",boards,imgBoards });
   
   }
export const getAuser = async (req,res) => {
    const users = await User.find({}).populate("imgboards").populate("buckets").populate("orders");
    console.log(users);
    return res.render("auser",{pageTitle: "Admin",users });
   
   }
export const getAorder = async (req,res) => {
    const aOrder = await orderModel.find({}).populate("orders").populate("owner");
    return res.render("aorder",{pageTitle: "Admin",aOrder });
   
   }