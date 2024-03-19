const wishlistServices= require('../services/wishlist.service')
const wishlistservice= new wishlistServices();


exports.addToWishlist= async(req,res)=>{
    try {
        let wishlist = await wishlistservice.checkWishlist({wishlistItems:req.body.wishlistItems,user:req.user._id,isDelete:false})
        if(wishlist){
            wishlist = await wishlistservice.deleteWishlist(wishlist._id)
            res.json({message:"UnWishllist successful",isWishlist:0})
        }else{
            wishlist = await wishlistservice.addWishlist({...req.body,user:req.user._id})
            res.json({message:"Wishlist added successfull.",isWishlist:1});
        }
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.getAllWishlists= async(req,res)=>{
    try {
        let wishlist= await wishlistservice.getAllWishlist({user:req.user._id,isDelete:false})
        if(!wishlist){
            return res.json({message:"Wishlist is not founded"})
        }
        res.json(wishlist);
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}
