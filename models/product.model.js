const mongoose= require('mongoose')

const productSchema = mongoose.Schema({
    productImage:{type:String,required:true},
    title:{type:String,unique:true,required:true},
    description:{type:String},
    price:{type:Number},
    category:[{
        type:String
    }],
    isDelete:{type:Boolean,default:false}
},{
    versionKey : false,
    timestamps: true
})

module.exports= mongoose.model("products",productSchema);