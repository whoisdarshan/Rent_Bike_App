const express= require('express')
const userRoute = express.Router()
const { addNewUser, getprofile, login, updateProfile, deleteAccount, userUpdatePassword } = require('../../controller/user/user.controller')
const {upload} = require('../../Helper/imageUploader');
const { userVerifytoken }  = require('../../Helper/verifyToken');


userRoute.post('/add-user',upload.single('profileImage'),addNewUser);
userRoute.post('/user-login',upload.any(),login);
userRoute.get('/user-profile',upload.any(),userVerifytoken,getprofile);
userRoute.put('/user-update-profile',upload.single('profileImage'),userVerifytoken,updateProfile);
userRoute.delete('/user-delete-account',upload.any(),userVerifytoken,deleteAccount);
userRoute.put('/user-update-password',upload.any(),userVerifytoken,userUpdatePassword);


module.exports=userRoute