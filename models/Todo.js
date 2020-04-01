const mongoose=require("mongoose");
const todo=mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
complete:{
    type:Boolean,
    required:true,
    default:false
},
time:{
    type:Date,
    default:Date.now()
}
});

const Todo=mongoose.model('Todo',todo);
module.exports=Todo;