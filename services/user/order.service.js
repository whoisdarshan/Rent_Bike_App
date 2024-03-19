const order = require('../../models/order.model')

module.exports=class orderServices{
    async addToOrder(body){
        return order.create(body)
    }
    async getOrder(body){
        return order.findOne(body)
    }
    async getAllOrders(body){
        return order.find(body)
    }
    async updateOrder(id,body){
        return order.findByIdAndUpdate(id,{$set:body},{new:true})
    }
    async deleteOrder(id){
        return order.findByIdAndDelete(id)
    }
}