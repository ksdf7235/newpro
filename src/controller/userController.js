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


export const login = (req, res) => res.render("login",{pageTitle: "Login"});
export const profile = (req, res) => res.render("profile-edit",{pageTitle: "username"});

