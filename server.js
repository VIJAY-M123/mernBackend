const app = require('./app');
const dotenv = require('dotenv');
const path  = require('path');
const connectDataBase = require('./config/database');

dotenv.config({path:path.join(__dirname,"config/config.env")}) //absolute path
connectDataBase();

const server = app.listen(process.env.PORT,()=>{
console.log(`Server listening port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

process.on('unhandledRejection',(err)=>{
console.log(`Error: ${err.message}`);
console.log("shutting down unhandledRejection ");
server.close(()=>{
    process.exit(1);
})
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("uncaught Exception error ");
    server.close(()=>{
        process.exit(1);  
    })
})





