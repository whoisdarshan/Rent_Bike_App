require('dotenv').config();
const adminServices = require('../../services/admin/admin.service');
const adminservice = new adminServices();
const userServices = require('../../services/user/user.services');
const userservice = new userServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerAdmin = async (req,res)=>{
    try {
        let admin = await adminservice.getadmin({email:req.body.email,isDelete: false});
        if (admin) {
            return res.json("User already registered.Please try to login");
        };
        if (req.file) {
            req.body.profileImage = `${req.file.path}`
        };
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        admin = await adminservice.addadmin({...req.body, password: hashpassword, isAdmin: true});
        return res.json({ADMIN:admin,MESSAGE:"New Admin Registration successfully done"});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.loginAdmin = async (req,res)=>{
    try {
        let admin = await adminservice.getadmin({email:req.body.email,isDelete: false,isAdmin: true});
        if (!admin) {
            return res.json("User is not found");
        };
        let comparePass = await bcrypt.compare(req.body.password,admin.password);
        if (!comparePass) {
            return res.json("Password is not matched");
        };
        let payLoad = {
            adminID : admin._id
        };
        let token = jwt.sign(payLoad,'darshan');
        return res.json({TOKEN: token , MESSAGE: "Token succesfully generated"});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getAdmin = async (req,res)=>{
    try {
        let admin = req.admin;
        return res.json({admin});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getAllAdmin = async (req,res)=>{
    try {
        let admin = await adminservice.getAllAdmins({isAdmin: true, isDelete: false});
        if (!admin) {
            return res.json("User is not found.Please try again");
        };
        return res.json({USERS: admin});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.updateAdmin = async (req,res)=>{
    try {
        let admin = await adminservice.getadmin(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        if (req.file) {
            req.body.profileImage = `${req.file.path}`
        };
        admin = await adminservice.updateadmin(admin._id,{...req.body});
        return res.json({admin,MESSAGE: "User is updated succesfully"});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.updatePassAdmin = async (req,res)=>{
    try {
        let admin = await adminservice.getadmin(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        let Old = req.body.OldPassword;
        let New = req.body.NewPassword;
        let Confirm = req.body.ConfirmPassword;
        let comparePass = await bcrypt.compare(Old,admin.password);
        if (!Old) {
            return res.json("Old Password is not found");
        };
        if (!comparePass) {
            return res.json("Password is not match");
        };
        if (!New) {
            return res.json("New Password is not found");
        };
        if (!Confirm) {
            return res.json("Confirm Password is not found");
        };
        if (Old == New) {
            return res.json("Old & New Password is same,Please try different");
        };
        if (New !== Confirm) {
            return res.json("New & Confirm is not same,Please try again");
        };
        let hashPassword = await bcrypt.hash(Confirm,10);
        admin = await adminservice.updateadmin(admin._id,{password: hashPassword,new:true});
        return res.json("Password is changed succesfully");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.deleteAdmin = async (req,res)=>{
    try {
        let admin = await adminservice.getadmin(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        admin = await adminservice.updateadmin(admin._id,{ isDelete: true});
        return res.json("User is deleted succesfully done.");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.deleteAdminPer = async (req,res)=>{
    try {
        let admin = await adminservice.getadmin(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        admin = await adminservice.deleteaccount(req.admin._id);
        return res.json("User is Permanently delted succesfully");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getAllUser = async (req,res)=>{
    try {
        let admin = await adminservice.getadmin(req.admin._id);
        if (!admin) {
        return res.json("User is not found");
        };
        let users = await userservice.getAllUsers({isAdmin: false, isDelete: false});
        if (!users) {
            return res.json("Users is not available...");
        };
        return res.json({USERS: users});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    }
};