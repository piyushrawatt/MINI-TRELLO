import mongoose from "mongoose";
 import User from "../Schema/user.js"
const trello = new mongoose.Schema({
    task:{type:String,required:true},
    description:{type:String},
    status:{type:String,default:"todo"},
    userid:{type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    }
},{timestamps:true})
const trelloschema = mongoose.model("trelloschema",trello)
export default trelloschema