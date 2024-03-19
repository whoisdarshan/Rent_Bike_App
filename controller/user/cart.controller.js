const cartServices= require('../../services/user/cart.service')
const cartservice= new cartServices()

exports.addToCart= async(req,res)=>{
    try {
        let cart = await cartservice.getCart({cartItem:req.body.cartItem,user:req.user._id})
        if(cart){
            return res.json({message:"Cart is already added."})
        }
        cart = await cartservice.addToCart({...req.body,user:req.user._id});
        res.json({cart,message:"Cart add successfull"})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.getAllCarts= async (req,res)=>{
    try {
        let cart = await cartservice.getAllCarts({user:req.user._id})
        if(!cart){
            return res.json({messsage:"Cart is not found"})
        }
        let carts = cart.map((item)=>({
            _id: item._id,
            user : item.user._id,
            cartItem : item.cartItem._id,
            title : item.cartItem.title,
            description : item.cartItem.description,
            price:item.cartItem.price,
            category : item.cartItem.category,
            quantity : item.quantity

        }));

        res.json(carts);
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})   
    }
}

exports.updateCart= async(req,res)=>{
    try {
        let cart = await cartservice.getCart({user:req.user._id,cartItem:req.body.cartItem})
        if(!cart){
            return res.json({message:"Cart is not found"})
        }
        cart = await cartservice.updateCart(cart._id,{...req.body});
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"}) 
    }
}

exports.deleteCart = async(req,res)=>{
    try {
        let cart = await cartservice.getCart({user:req.user._id,cartItem:req.body.cartItem})
        if(!cart){
            return res.json({message:"Cart is not found"})
        }
        cart = await cartservice.deleteCart(cart._id)
        res.json({message:"Cart delete successs."});
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

