const express= require('express')
const wishlistRoute= express.Router();
const { upload } = require('../Helper/imageUploader')
const { userVerifytoken} = require('../Helper/verifyToken')
const { addToWishlist, getAllWishlists } = require('../controller/wihslist.controller')

wishlistRoute.post('/add-wishlist',upload.any(),userVerifytoken,addToWishlist)
wishlistRoute.get('/get-All-wishlists',upload.any(),userVerifytoken,getAllWishlists)


module.exports = wishlistRoute