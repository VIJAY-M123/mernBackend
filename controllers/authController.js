
const catchAsyncError = require("../middlewares/catchAsyncError");
const userModel = require('../models/userModel');
const sendMail = require("../utils/email");
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');

exports.registerUser = catchAsyncError(async(req,res,next)=>{
const {username, email,password,avater} = req.body;

//const userEmail = userModel.findOne({email})

//console.log("userEmail",userEmail);

const user = await  userModel.create({username, email,password,avater})

sendToken(user, 201, res);  // reuseFunction
// const token = user.getJwtToken()

// console.log("Token",token);

// res.status(201).json({
//     sucess:true,
//     user,
//     token

// })
})


exports.loginUser = catchAsyncError(async(req,res,next)=>{
  console.log("login",req);
 const {email, password} = req.body

 if(!email || !password){
   return next(new ErrorHandler("Please enter email & password", 400))
 }

 const user = await userModel.findOne({email}).select('+password')

 console.log("user",user);

 if(!user){
    return next(new ErrorHandler("Invalid email or password", 401))
 }

 console.log("isValidPassword",!user.isValidPassword(password))
 if(!await user.isValidPassword(password)){
    return next(new ErrorHandler("Invalid email or password", 401))
 }

 sendToken(user, 201, res);
})

exports.logout= (req, res, next)=>{
                 res.cookie('token',null,{
                  expires:new Date(Date.now()),
                  httpOnly:true
                 })
                 .status(200)
                 .json({
                  success:true,
                  message:"Logout"
                 })
}

exports.resetPassword = catchAsyncError(async(req,res,next)=>{
       const user = await userModel.findOne({email:req.body.email})

       if(!user){
         return next(new ErrorHandler("User not found",401));
       }

       const resetToken = user.getResetPassword()
       console.log("resetToken",resetToken);
       await user.save({validateBeforeSave:false})

       //create reseturl
       const resetUrl = `${req.protocol}://${req.get('host')}/app/v1/password/reset/${resetToken}`
       const message = `Your Password reset Url is as follow \n\n
       ${resetUrl} \n\n if you have not request email`

       try{
          sendMail({
            email:user.email,
            subject:"E-com password recovery",
            message
          })

          res.status(200).json({
            success:true,
            message:`message sent to ${user.email}`
          })

       }catch(err){
          user.resetPasswordToken = undefined;
          user.resetPasswordTokenExpire = undefined;
          await user.save({validateBeforeSave:false})
          return next(new ErrorHandler(err.message),401)
       }
})