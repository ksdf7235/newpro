 import { async } from "regenerator-runtime";
import User from "../model/User"





export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const {id,password,username,email} = req.body;
  console.log(req.body);
  await User.create({
    id,
    password,
    username,
    email,
    createdAt: Date.now(),
  });
return res.redirect("/");
};


export const getlogin = (req, res) => res.render("Login",{pageTitle: "Login"});

export const postlogin = async(req, res) => {
    const {id,password} = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({
      id,
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


export const profile = (req, res) => res.render("profile-edit",{pageTitle: "username"});

