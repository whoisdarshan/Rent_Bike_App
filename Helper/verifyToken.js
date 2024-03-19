const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.userVerifytoken = async(req,res,next)=>{
    try {
        let authorized = req.headers['authorization'];
        if(typeof authorized!=='undefined'){
            let token = authorized.split(" ")[1]
            let {userId} = jwt.verify(token,'darshan')
            req.user = await User.findOne({_id:userId,isDelete:false})
            req.user?next():res.json({message:"User is invalid"}) 
        }
    } catch (error) {
        console.log(error);
        res.json({message:"Internal Server Error in verify token. "})   
    }
};

exports.adminVerifyToken = async(req,res,next)=>{
    try {
        let authorized = req.headers['authorization']
        if(typeof authorized!=='undefined'){
            let token = authorized.split(' ')[1]
            let {adminId}= jwt.verify(token,'darshan')
            req.amdin = await User.findOne({_id : adminId,isDelete:false});
            req.admin?next():res.json({message:"Admin is invalid"})
        }
    } catch (error) {
        console.log(error);
        res.json({message:"Internal Server Error in verify token. "})
    }
}