 import { async } from "regenerator-runtime";
import User from "../model/User"





export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const {userId,password,username,email} = req.body;
  await User.create({
    userId,
    password,
    username,
    email,
    createdAt: Date.now(),
  });
return res.redirect("/");
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
  const user = await User.findById(id).populate("boards");
  if(!user){
    return res.render("/",{ pageTitle:" Not Yours"});
  }
  return res.render("profile",
  {pageTitle: user.name,
    user,
  });
}

// res.render("profile",{pageTitle: "username"});


export const getEditProfile = (req, res) => res.render("profile-edit",{pageTitle: "username"});

export const postEditProfile = async(req, res) => {
  const {
    session: {
      user:{_id, avatarUrl},
    },
    body:{ username, email },file,
  }= req;
  const updateUser = await User.findByIdAndUpdate(
    _id,{
    avatarUrl: file ? file.path : avatarUrl,
    username,
    email,
},{new:true}
);
req.session.user = updateUser;
console.log(req.session.user);
return res.redirect("/");
  
}
