const product = require('../../models/product.model')

module.exports= class productServices{
    async addProduct (body){
        return product.create(body)
    }
    async getSpecificProduct(id){
        return product.findById(id)
    }
    async getAllProducts (body){
        return product.find(body)
    }
    async updateProduct (id,body){
        return product.findByIdAndUpdate(id,{$set:body},{new:true});
    };
}