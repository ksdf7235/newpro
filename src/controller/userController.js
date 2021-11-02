import User from "../model/User"
import countModel from "../model/countBucket";
import orderModel from "../model/order";
import { async } from "regenerator-runtime";



export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin =  async(req, res) => {
  const {userId,password,username,email} = req.body;
  try{
    await User.create({
      userId,
      password,
      username,
      email,
      createdAt: Date.now(),
    });
  return res.redirect("/");
  }catch(error){
    console.log(error);
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,

    });
  }
};


export const getlogin = (req, res) => res.render("Login",{pageTitle: "Login"});

export const postlogin = async(req, res) => {
    const {userId,password} = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({
      userId,
      password
    })
    if (!user){
      return res.status(400).render("login",{
        pageTitle,
        errorMessage : "아이디 혹은 비밀번호 오류"
      })
    }
    
    if(password == user.password){
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
  }
}


export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
}


export const profile = async(req, res) => {
  const {id} = req.params;
  const user = await User.findById(id).populate("imgboards").populate("boards").populate("buckets");
  if(!user){
    return res.render("/",{ pageTitle:" Not Yours"});
  }
  return res.render("profile",
  {pageTitle: user.username,
    user
  });
}

// res.render("profile",{pageTitle: "username"});


export const getEditProfile = (req, res) => res.render("profile-edit",{pageTitle: "username"});

export const postEditProfile = async(req, res) => {
  const {
    session: {
      user:{_id, avatarUrl},
    },
    body:{ username, email,admin },file,
  }= req;
  console.log(admin);
 let updateUser;
if(admin == "admin"){
  updateUser= await User.findByIdAndUpdate(
    _id,{
    avatarUrl: file ? file.path : avatarUrl,
    username,
    email,
    administer : true,
},{new:true});
}else{
  updateUser = await User.findByIdAndUpdate(
    _id,{
    avatarUrl: file ? file.path : avatarUrl,
    username,
    email,
},{new:true});

}
req.session.user = updateUser;
console.log(req.session.user);
return res.redirect("/");
  
}

//장바구니

export const getBucket = async(req, res) => {
  const {id} = req.params;
  const user = await User.findById(id).populate("buckets");
  let value = 0;
  const count = await countModel.find({owner : id}&&{payment : false});
  if(count.length != 0){

    for(var i = 0;i <count.length; i++){
      value += count[i].price * count[i].count;
      
    }
  
  }
  if(!user){
    return res.render("/",{ pageTitle:" Not Yours"});
  }


  return res.render("buckets",{pageTitle: "username", count,value,id});
  
 }


 export const postBucket = async(req, res) => {
   const {id} = req.params;
   const {sel,pay} = req.body; 
   const user = await User.findById(id).populate("buckets");
   const payment = await orderModel.create({
      owner: id,
      pay : pay
    })
  try{  
        user.buckets.forEach( async(item,idx,a) => {
          const bucket = await countModel.findById(item._id);  
          bucket.count = sel[idx];
          bucket.payment = true;
          payment.orders.push(item._id)
          if(payment.orders.length == a.length){
            payment.save();
          }
          bucket.save();  
        });
        user.buckets = [];
        user.orders.push(payment._id);
        user.save();
        return res.redirect("/")
      }catch(error){
  console.log(error);
  return res.status(400).render("eroror")
  }
 }
 


export const getBucketDel = async(req,res) => {
  const {id} = req.params;
  console.log(id);
  const {
    user:{_id},
  }=req.session;
  const count = await countModel.findById(id);
  const userM = await User.findById(_id).populate("buckets");
  const newBucket = userM.buckets.filter((a) => {return a._id !=id});
  userM.buckets = newBucket;
  userM.save();
  if(String(count.owner)!==String(_id)){
        return res.status(400).render("404", {pageTitle: "NOT Found"});
    }
    if(String(count.owner)!==String(_id)){
        return res.status(403).redirect("/");
    }
    await countModel.findByIdAndDelete(id);
  return res.redirect(`/users/${_id}/bucket`);
}


export const getOrder = async(req,res) =>{
  const {id} = req.params;
  const user = await User.findById(id).populate("orders");
  const userOrders = await orderModel.find({owner : id}).populate("orders").populate("owner");
  console.log(userOrders.orders);
  
  
  
  if(!user){
    return res.render("/",{ pageTitle:" Not Yours"});
  }


  return res.render("order",{pageTitle: "username",userOrders});
  

}