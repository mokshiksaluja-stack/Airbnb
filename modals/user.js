const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose").default || require("passport-local-mongoose");


const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
})

userSchema.plugin(passportlocalmongoose); 
//this will automatically creat pass feild with hashing and salting
// and username feild 

module.exports=mongoose.model("User",userSchema);