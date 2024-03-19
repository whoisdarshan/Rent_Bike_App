const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profileImage:{type : String,required:true},
    name:{type:String},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    phoneNo :{type:String},
    isAdmin:{type:Boolean,default:false},
    isDelete:{type:Boolean,default:false}
},
{
    versionKey:false,
    timestamps:true
})

module.exports= mongoose.model("users",userSchema)