import mongoose  from "mongoose";


const countSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    id : { type: String, requrired : true},
    title: { type: String, required: true, trim: true },
    price: {    type: Number, required : true},
    imgfileUrl: { type: String},
    count : { type: Number, default : 1},
    payment : {type : Boolean, default : false}
});

const countModel = mongoose.model("countImg", countSchema);

export default countModel;