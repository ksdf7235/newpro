import mongoose  from "mongoose";


const boardSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description : { type: String, required: true, trim: true},
    contents: { type: String, required: true, trim: true },
    createdAt :{type: Date, required: true, default: Date.now}, 


});

const boardModel = mongoose.model("Board", boardSchema);

export default boardModel;