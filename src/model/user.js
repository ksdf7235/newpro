import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    id: { type:String, required : true, unique: true},
    password: { type:String, required : true,},
    username: { type:String, required : true,},
    email : { type:String, required : true, },
    createdAt: Date,
    boards:[{
        type:mongoose.Schema.Types.ObjectId, ref:"Board"
    }],
});

// userSchema.pre(`save`,async function(){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password, 5);
//     }

// })


const User = mongoose.model("User", userSchema);

export default User;