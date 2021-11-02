import { async } from "regenerator-runtime";
import imgBoardModel from "../model/imgBoard";
import imgBoard from "../model/imgBoard"
import User from "../model/User";
import countModel from "../model/countBucket";


export const imgList = async (req,res) => {
    try{
        const imgBoards = await imgBoard.find({});
   return res.render("imgList",{pageTitle: "IMG",imgBoards});
}
   catch{
       return res.redirect("/")
   }
   
   }


export const getImgUpload = (req, res) => {
    res.render("imgUpload",{ pageTitle:"이미지 업로드"});
}

export const postImgUpload = async (req,res) => {
    let imgfileUrl = "";
    const {
        user:{_id},
    }= req.session;
    req.file ? imgfileUrl = req.file.path : imgfileUrl = "";
    const {title,
        description,
        price,
        contents} = req.body;
        try{
            const newBoard = await imgBoardModel.create({
                title:title,
                description:description,
                contents:contents,
                price:price,
                imgfileUrl,
                createdAt:Date.now(),
                owner:_id,
            });
            const user= await User.findById(_id);
            user.imgboards.push(newBoard._id);
            user.save();
            return res.redirect("/");
        }catch(error){
            console.log(error);
            return res.status(400).render("upload",{ 
                pageTitle: "이미지 업로드", 
                errorMessage :error._message,});
        }

}




export const handleImgBoard = async (req, res) => {

    const {id} = req.params;
    const imgBoard = await imgBoardModel.findById(id).populate("owner");
    return res.render("boardimg",{ pageTitle: imgBoard.title, imgBoard });
}

export const imgBucket = async (req,res) => {
    const {
        user:{_id},
    }= req.session;
    const {id} = req.params;
    const imgBoard = await imgBoardModel.findById(id).populate("owner");
    const user= await User.findById(_id).populate("buckets");
    const con = await countModel.find({owner : _id});
    const {title,price,imgfileUrl} = imgBoard;
    const fCon = await countModel.find({imgfileUrl}).find({payment:false});
    console.log(fCon);

    if(user.buckets.length == 0 || fCon.length == 0){
        const bucket = await countModel.create({
                owner : _id,
                id:id,
                title,
                price,
                imgfileUrl  

        });
        user.buckets.push(bucket._id);
        user.save();
    }
    for(var i = 0; i< con.length; i ++){
        if(con[i].imgfileUrl == imgfileUrl ){
        const coun = await countModel.findById(con[i]._id);
        coun.count = coun.count + 1;
        coun.save();
        }
    }

    return res.render("boardimg",{ pageTitle: imgBoard.title, imgBoard});
}



export const deleteImgBoard = async(req, res) => {
    const {id} = req.params;
    const {
        user:{_id,administer},
    }=req.session;
    const imgboard = await imgBoard.findById(id);
    if(!imgboard){
        return res.status(400).render("404", {pageTitle: "NOT Found"});
    }
    if(String(imgboard.owner) == String(_id) || administer == true){
        await imgBoard.findByIdAndDelete(id);
        return res.redirect("/");
    }
    return res.status(403).redirect("/");
}
export const copyImgBoard = async(req, res) => {
    const {
        user:{_id},
    }= req.session;
    const {id} = req.params;
    const {title,description,contents,price,imgfileUrl} = await imgBoard.findById(id);
    for(var i = 0; i< 100; i++){
        imgBoardModel.create({
            title,
            description: description +(i+1),
            contents,
            price,
            imgfileUrl,
            createdAt:Date.now(),
            owner:_id,
        });

    }
    return res.status(403).redirect("/");
}




export const getEditImg = async(req, res) => {
    const {id} = req.params;
    const { user:{_id}} =req.session;
    const board= await imgBoard.findById(id);
    if(board == null) {
        return res.status(400).render("404", {pageTitle: "NOT Found"})
    }
    if(String(board.owner)!==String(_id)){
        return res.status(403).redirect("/");
    }
    return res.render("editImg",{ pageTitle:`수정 | ${board.title}`,board});
}


export const postEditImg = async(req, res) => {
    const {id} = req.params;
    const { user:{_id}} =req.session;
    const {title,description,contents,price} = req.body;
    const board= await imgBoard.findById(id);
    if(!board){
        return res.status(400).render("494", {pageTitle: "NOT Found"});
    }
    if(String(board.owner)!==String(_id)){
        return res.status(403).redirect("/");
    }
    await imgBoard.findByIdAndUpdate(id,{
        title,
        description,
        price,
        contents,
    });
    return res.redirect(`/img/${id}`);
    

}