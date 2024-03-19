const orderServices= require('../../services/user/order.service')
const orderService= new orderServices();
const cartServices = require('../../services/user/cart.service')
const cartService= new cartServices();


exports.addToOrder= async(req,res)=>{
    try {
        let cart = await cartService.getAllCarts({user: req.user._id, isDelete: false})
        if(!cart){
            return res.json({message:"Cart is not found"})
        }
        let  orderItem= cart.map((item)=>({
                cartItem : item.cartItem._id,
                quantity:item.quantity,
                price:item.cartItem.price
            }))
            let totalPrice = orderItem.reduce(((total,item)=>total+=(item.quantity*item.price)),0);   
            let newOrder = await orderService.addToOrder({
                user: req.user._id,
                items : orderItem,
                totalAmount: totalPrice
            })    
        cart = await cartService.updateCart(req.user._id,{isDelete:true});
        res.json({newOrder,message:"Order new create success."})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
};


exports.getOrder = async(req,res)=>{
    try {
        let order = await orderService.getOrder({user:req.user._id,isDelete:false})
        if(!order){
            return res.json({messgae:"Order is not found"})
        }
        res.json(order);
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}

exports.deleteOrder= async(req,res)=>{
    try {
        let order = await orderService.getOrder({user:req.user._id,isDelete:false})
        if(!order){
            return res.json({messgae:"Order is not found"})
        }
        order= await orderService.updateOrder(order._id,{isDelete:true,new:true});
        res.json({order,message:"Order delete ssuccess"})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal Server Error"})
    }
}