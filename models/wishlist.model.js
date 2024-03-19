const mongoose = require('mongoose')

const wishlistShemca= mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    wishlistItems:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
    isDelete:{type:Boolean,default:false}
},{
    versionKey:false,
    timestamps:true
});

module.exports= mongoose.model('wishlists',wishlistShemca)