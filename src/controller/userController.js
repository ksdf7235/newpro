import {User} from "../model/user"







export const login = (req, res) => res.render("login",{pageTitle: "Login"});
export const profile = (req, res) => res.render("profile-edit",{pageTitle: "username"});
export const GetJoin = (req, res) => res.render("join",{pageTitle: "Join"});

export const PostJoin = async (req, res) => {
 const cs = req.body;
 console.log(cs);
//  const pageTitle = "Join";

// try {
//     await User.create({
//         id,
//         username,
//         email,
//         password,
        
//     });
//     return res.redirect("/login");
// }catch(error){
//     return res.render("join", {
//         pageTitle: pageTitle
//     });
}

