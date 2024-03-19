const express = require('express')
const orderRoute= express.Router()
const {upload}= require('../../Helper/imageUploader')
const {userVerifytoken} = require('../../Helper/verifyToken')
const { addToOrder, getOrder, deleteOrder } = require('../../controller/user/order.controller')

orderRoute.post('/add-order',upload.any(),userVerifytoken,addToOrder);
orderRoute.get('/get-order',upload.any(),userVerifytoken,getOrder);
orderRoute.delete('/delete-order',upload.any(),userVerifytoken,deleteOrder);


module.exports= orderRoute