const mongoose = require('mongoose')


const productModel = new mongoose.Schema({
    name :{
        type:String,
        required:[true,"Please enter Product name"],
        trim:true,
        maxLength:[100,"Product name cannot exceed 100 character"]
    },
    price:{
        type:Number,
        required:true,  // Default value mention, not need for requiredd
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please enter Product description"],
    },
   rating:{
    type:String,
    default:0
   },
   images:[
    {
        image:{
            type:String,
            required:true
        }
    }
   ],
   categories:{
    type:String,
    required:[true,"Please enter categories name"],
    enum:{
        values:[
            "electronics",
            "mobile Phones",
            "laptop",
            "Accessories",
            "headphones",
            'food',
            "books",
            "clothes/Shoes",
            "Beauty/Health",
            "sports",
            "out doors",
            "Home",
        ],message:'Please select correct categories'
    }
   },
   seller:{
    type:String,
    required:[true,"Please enter Product seller"],
   },
   stock:{
    type:Number,
    required:[true,"Please enter Product Stock"],  // Default value mention, not need for requiredd
    maxLength:[20,"Product stock exceed 20"]
   },
   noOfReviews:{
    type:Number,
    default:0
   },
   reviews:[
    {
        name:{
         type:String,
         required:true
        },
        rating:{
            type:String,
            required:true
        },
        command:{
            type:String,
            required:true
        }
    }
   ],
   user:{
    type:mongoose.Schema.Types.ObjectId
   },
   createdAt:{
    type:Date,
    default:Date.now()
   }

   
})

const ProductSchema = mongoose.model("Product",productModel);

module.exports = ProductSchema;