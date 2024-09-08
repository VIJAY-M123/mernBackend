const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const crypto =require('crypto')



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Please enter the name']
    },
    email:{
        type: String,
        required:[true,"Please enter the email"],
        unique:true,
        validate:[validator.isEmail, 'please enter email address']
    },
    password:{
        type: String,
        required:[true,"Please enter the password"],
        maxlength:[6,'maxlength cannot exceed 6 characters'],
        select:false
    },
    avater:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        default:'user',
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
       type : Date,
       default:new Date()
    }

})

userSchema.pre('save',async function(next){
    console.log("pass",this.password);
    if(!this.isModified('password')){
        next();
    }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function(){
    console.log("function is runing");
    console.log("process.env.JWT_SECRET",process.env.JWT_SECRET);
    console.log("process.env.JWT_EXPIRES_TIME",process.env.JWT_EXPIRES_TIME);
     return jwt.sign({id:this.id}, process.env.JWT_SECRET, {
    expiresIn:process.env.JWT_EXPIRES_TIME
  })
}

userSchema.methods.isValidPassword = async function(enterPassword){
 
       return await  bcrypt.compare(enterPassword, this.password)
 
}

userSchema.methods.getResetPassword = () =>{
    //geerate tokenn
   const token=  crypto.randomBytes(20).toString('hex')
   //reset password token 
   this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
   this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000

   return token;

   //set token expires time
}

let userModel = mongoose.model('User', userSchema)

module.exports = userModel;