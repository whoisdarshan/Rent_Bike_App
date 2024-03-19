const productServices = require('../../services/admin/product.service')
const productservice = new productServices();


exports.addToProduct= async(req,res)=>{
    try {
        let product = await productservice.getProduct({title:req.body.title,isDelete:false})
        if(product){
            return res.json({message:"Product is already added"})
        }
        if(req.file){
            req.body.productImage= `${req.file.path}`
        }
        product= await productservice.addProduct({...req.body,isDelete:false});
        res.json({product,message:"Product is added is success."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.getproduct= async(req,res)=>{
    try {
        let product = await productservice.getSpecificProduct({_id:req.body.productId,isDelete:false})
        if(!product){
            return res.json({message:"Product is not  added"})
        }
        res.json(product);
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.getAllProducts=async(req,res)=>{
    try {
        let product = await productservice.getAllProducts({isDelete:false})
        if(!product){
            return res.json({message:"Product is not  added"})
        }
        res.json(product)
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})  
    }
}

exports.updateproduct= async (req,res)=>{
    try {
        let product= await productservice.getSpecificProduct({_id:req.body.productId,isDelete:false})
        if(!product){
            return res.json({message:"Product is not found"})
        }
        if(req.file){
            req.body.productImage= `${req.file.path}`
        }
        product =await productservice.updateProduct(product._id,{...req.body,new:true})
        res.json({product,message:"Product update success."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})  
    }
}
exports.deleteProduct= async(req,res)=>{
    try {
        let product= await productservice.getSpecificProduct({_id:req.body.productId,isDelete:false})
        if(!product){
            return res.json({message:"Product is not found"})
        }
        product =await productservice.updateProduct(product._id,{isDelete:true,new:true})
        res.json({product,message:"Product delete success."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}