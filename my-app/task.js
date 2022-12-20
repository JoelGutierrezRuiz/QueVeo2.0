const mongoose=require("mongoose");
const {Schema} = mongoose;
const TaskSchema=new Schema ({}, {strict: false})
module.exports = mongoose.model("queveo", TaskSchema);