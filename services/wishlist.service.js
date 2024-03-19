const wishlist = require('../models/wishlist.model')

module.exports = class wishlistServices{
    async addWishlist(body){
        return wishlist.create(body)
    }
    async checkWishlist(body){
        return  wishlist.findOne(body);
    }
    async getAllWishlist(body){
        return wishlist.find(body)
    }
    async deleteWishlist(id){
        return wishlist.findByIdAndDelete(id)
    }
}