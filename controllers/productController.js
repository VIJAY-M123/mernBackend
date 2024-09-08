const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures   = require('../utils/apiFeatures');

//get All product
exports.getProducts = catchAsyncError( async(req, res, next) =>{
  console.log("getProductReq",req);
  const page = 2
   const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(page);
  const products = await apiFeatures.query;
  res.status(200).json({
    success : true,
    count : products.length,
    products
  })
})

//post All product - app/v1/products/new
exports.newProduct = catchAsyncError(async (req, res, next) =>{
  req.body.user=req.user.id //thislineforwhichusercreeatetheproduct
   const product = await Product.create(req.body);
   res.status(201).json({
    success : true,
    product
   })
})

//getSingle Product- app/v1/products/667af342060d2f1b81a4c367

exports.getSingleProduct =async (req,res,next) =>{
   const product = await Product.findById(req.params.id)

   if(!product){
    // return res.status(404).json({
    //   success:false,
    //   message:"Product Not found"
    // })
    return next(new ErrorHandler("Product Not found", 400))
    
   }

   res.status(401).json({
    success:true,
    product,
   })
}

// update Product - app/v1/products/667af342060d2f1b81a4c367

exports.updateProdcut = async (req, res, next)  =>{
  let product = await Product.findById(req.params.id)

  if(!product){
    return res.status(404).json({
      success:false,
      message:"Product Not found"
    })
   }


   product = await Product.findByIdAndUpdate(req.params.id , req.body , {
    new:true,
    runValidators:true
   })
      res.status(200).json({
      success:true,
      product

})
}

//delete product
exports.deleteProdcut = async(req,res,next) =>{
  const product = await Product.findById(req.params.id)

  if(!product){
    return res.status(404).json({
      success:false,
      message:"Product Not found"
    })
   }

   await product.deleteOne()

   res.status(200).json({
    success:true,
    message:"Product delete successfully"
   })
}