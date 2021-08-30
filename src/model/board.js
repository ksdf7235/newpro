import mongoose  from "mongoose";


const boardSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    fileUrl: { type: String,},
    description : { type: String, required: true, trim: true},
    contents: { type: String, required: true, trim: true },
    createdAt :{type: Date, required: true, default: Date.now}, 
    owner:{type:mongoose.Schema.Types.ObjectId, required: true, ref:"User"},

});

const boardModel = mongoose.model("Board", boardSchema);

export default boardModel;