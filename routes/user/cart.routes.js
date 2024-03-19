const express= require('express')
const cartRoute= express.Router()
const  { upload } = require('../../Helper/imageUploader')
const {userVerifytoken} = require('../../Helper/verifyToken')
const { addToCart, getAllCarts, updateCart, deleteCart } = require('../../controller/user/cart.controller')

cartRoute.post('/create-cart',upload.any(),userVerifytoken,addToCart)
cartRoute.get('/all-carts',upload.any(),userVerifytoken,getAllCarts)
cartRoute.put('/update-cart',upload.any(),userVerifytoken,updateCart)
cartRoute.delete('/delete-cart',upload.any(),userVerifytoken,deleteCart)

module.exports= cartRoute