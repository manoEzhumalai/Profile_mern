const mongoose = require("mongoose");  
const Schema = mongoose.Schema;
const profileSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    education:{
        type:JSON,
        required:true
    },
    career:{
        type:JSON,
        required:true
    },
  
  
    created: {type: Date, default: Date.now}
})
module.exports=mongoose.model('profile',profileSchema);
