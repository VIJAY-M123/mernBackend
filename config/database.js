const mongoose =  require('mongoose');

const connectDataBase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((res)=>{
        console.log(`mongoDB Connected to the host ${res.connection.host}`)
    }).catch((err)=>{
   console.log("error",err);
    })
}

module.exports = connectDataBase;