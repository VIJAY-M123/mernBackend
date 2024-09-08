const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt =  require('jsonwebtoken')

exports.isAuthenticate = catchAsyncError(async(req,res,next)=>{
const {token} = req.cookies;

console.log("token",token);

if(!token){
    return next(new ErrorHandler("login first handle this rrsource", 401))
}

const decode = jwt.verify(token, process.env.JWT_SECRET);
console.log("decode",decode);
 req.user = await userModel.findById(decode.id)
 console.log("req1",req);
 next();
})


exports.autherizationRole = (...roles)  =>{
 return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next (new ErrorHandler(`${req.user.role} is not allow`, 401))
    }
    next();

 }
}