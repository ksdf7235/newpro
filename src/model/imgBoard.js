import mongoose  from "mongoose";


const imgBoardSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    imgfileUrl: { type: String},
    description : { type: String, required: true, trim: true},
    contents: { type: String, required: true, trim: true },
    price: {    type: Number, required : true},
    createdAt :{type: Date, required: true, default: Date.now}, 
    owner:{type:mongoose.Schema.Types.ObjectId, required: true, ref:"User"},

});

const imgBoardModel = mongoose.model("imgBoard", imgBoardSchema);

export default imgBoardModel;