import mongoose  from "mongoose";


const orderSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    orders :[{type:mongoose.Schema.Types.ObjectId, ref:"countImg"}],
    pay: { type: Number, required : true},
    createdAt :{type: Date, required: true, default: Date.now}, 
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;