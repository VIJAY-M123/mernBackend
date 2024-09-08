const connectDataBase = require('../config/database');
const product = require('../data/products.json');
const ProductModel= require('../models/productModel');
const dotenv = require('dotenv');

dotenv.config({path:'backend/config/config.env'})
connectDataBase();
const seedProdcut=async () =>{
    try{
        await ProductModel.deleteMany();
        console.log("All Product deleted");
         await ProductModel.insertMany(product);
         console.log("All Product Added");
    }
    catch(err){
    console.log("error",err);
    }
    process.exit();
  
}

seedProdcut();