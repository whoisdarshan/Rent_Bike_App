require("dotenv").config();
const express = require('express');
const app= express();
const cors= require('cors')
const  path = require('path')
const http = require('http');
const { default: mongoose } = require('mongoose');
const imagePath = path.join(__dirname,'Public','Images')

PORT = process.env.PORT
dbURL = process.env.MONGO_URL


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/Public/Images',express.static(imagePath));

app.get('/',(req,res)=>{
    res.json("Welcome to express server")
});


const userRoute = require('./routes/user/user.routes')
const productRoute = require('./routes/admin/product.routes')
const adminRoute = require('./routes/admin/admin.routes')
const wishlistRoute = require('./routes/wishlist.routes')
const cartRoute = require('./routes/user/cart.routes')
const orderRoute = require('./routes/user/order.routes')


app.use('/api/user',userRoute)
app.use('/api/admin',productRoute)
app.use('/api/admin',adminRoute)
app.use('/api/wishlist',wishlistRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)


app.listen(PORT,()=>{
    try {
        mongoose.connect(dbURL)
        console.log("Mongodb connected")
    } catch (error) {
      console.log(error)  
    }
    console.log(`server start at http://localhost:3456`);
})