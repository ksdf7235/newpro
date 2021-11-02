import multer from "multer";

export const localMiddleWare = (req,res,next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const uploadFiles = multer({dest:"uploads/"});
export const avatarUpload = multer({ dest: "uploads/avatars", limits:{
    fileSize: 3000000,
}
 });
export const videoUpload = multer({ dest:"uploads/videos", limits:{
    fileSize: 10000000,
}
 });

 export const imgUpload = multer({ dest:"uploads/imgs", limits:{
    fileSize: 10000000,
}
 });