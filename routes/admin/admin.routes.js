const express = require('express');
const adminRoute = express.Router();
const { adminVerifyToken } = require('../../Helper/verifyToken');
const { upload } = require('../../Helper/imageUploader');
const { registerAdmin, getAllAdmin, getAdmin, updateAdmin, deleteAdmin, deleteAdminPer, loginAdmin, updatePassAdmin } = require('../../controller/admin/admin.controller');

adminRoute.post('/add-Admin',upload.single('profileImage'),registerAdmin);
adminRoute.get('/login-Admin',upload.any(),loginAdmin);
adminRoute.get('/get-all-Admin',getAllAdmin);
adminRoute.get('/get-Admin',upload.any(),adminVerifyToken,getAdmin);
adminRoute.put('/update-Admin',adminVerifyToken,upload.single('profileImage'),updateAdmin);
adminRoute.put('/update-pass-Admin',upload.any(),adminVerifyToken,updatePassAdmin);
adminRoute.delete('/delete-Admin',adminVerifyToken,deleteAdmin);
adminRoute.delete('/delete-Per-Admin',adminVerifyToken,deleteAdminPer);

module.exports = adminRoute;