const userServices = require('../../services/user/user.services')
const userservice = new userServices()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.addNewUser= async(req,res)=>{
    try {
        let user = await userservice.getuser({email:req.body.email,isDelete:false})
        if(user){
            return res.json({message:"User is already register"})
        }
        if(req.file){
            req.body.profileImage= `${req.file.path}`
        }
        let hashpasword = await bcrypt.hash(req.body.password,10)
        user = await userservice.adduser({...req.body,password:hashpasword})
        res.json({user,message:"User create new  account."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
};

exports.login= async(req,res)=>{
    try {
        let user = await userservice.getuser({email:req.body.email,isDelete:false})
        if(!user){
            return res.json({message:"User is not register"})
        }
        let comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword){
            return res.json({message:"Password is incorrect"})
        }
        let payLoad={
            userId : user._id
        }
        let token = jwt.sign(payLoad,'darshan')
        res.json({token,message:"User login success."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
};

exports.getprofile=async(req,res)=>{
    try {
        let user=req.user;
        res.json(user);
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.updateProfile = async(req,res)=>{
    try {
        let user = req.user
        if(!user){
            return res.json({message:"User in not found"})
        }
        if(req.file){
            
            req.body.profileImage= `${req.file.path}`
        }
        user = await userservice.updateuser(user._id,{...req.body,new:true})
        res.json({message:"User update profile success."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.deleteAccount= async(req,res)=>{
    try {
        let user = req.user
        if(!user){
            return res.json({message:"User in not found"})
        }
        user = await userservice.updateuser(user._id,{isDelete:true}); 
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.userUpdatePassword= async(req,res)=>{
    try {
        let {oldPassword,newPassword,confirmPassword}= req.body;
        let user = req.user
        if(!user){
            return res.json({message:"User in not found"})
        }
        let comparePassword = await bcrypt.compare(oldPassword,user.password)
        if(!comparePassword){
            return res.json({message:"Passowrd is incorrect."})
        }
        if(oldPassword==newPassword){
            return res.json({message:"OLD and NEW password are same"})
        }
        if(newPassword!==confirmPassword){
            return res.json({message:"Password are not same "})
        }
        let hashNewPassword = await bcrypt.hash(confirmPassword,10)
        user = await userservice.updateuser(user._id,{...req.body,password:hashNewPassword,new:true})
        res.json({user,messae:"User password successfull."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"}) 
    }
}