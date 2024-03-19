const express = require('express')
const productRoute = express.Router()
const {upload} = require('../../Helper/imageUploader')
const { addToProduct, getproduct, getAllProducts, updateproduct }= require('../../controller/admin/product.controller')


productRoute.post('/add-product',upload.single('productImage'),addToProduct);
productRoute.get('/get-specific-product',upload.any(),getproduct);
productRoute.get('/get-all-products',upload.any(),getAllProducts);
productRoute.put('/update-products',upload.single('productImage'),updateproduct);



module.exports = productRoute
