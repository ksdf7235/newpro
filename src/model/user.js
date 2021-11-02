import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userId: { type:String, required : true},
    avatarUrl:{type:String, default: "uploads/avatars/noimage"},
    password: { type:String, required : true,},
    username: { type:String, required : true,},
    email : { type:String, required : true, },
    administer : { type:Boolean, required : true, default : false },
    createdAt: Date,
    boards:[{
        type:mongoose.Schema.Types.ObjectId, ref:"Board"
    }],
    imgboards:[{
        type:mongoose.Schema.Types.ObjectId, ref:"imgBoard"
    }],
    buckets:[{type:mongoose.Schema.Types.ObjectId, ref:"countImg"}],
    orders:[{type:mongoose.Schema.Types.ObjectId, ref:"order"}]
});

// userSchema.pre(`save`,async function(){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password, 5);
//     }

// })


const User = mongoose.model("User", userSchema);

export default User;