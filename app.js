const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
const erroMiddleware = require("./middlewares/error")
app.use(express.json());
app.use(cookieParser());  //without this package don't accesss cookies


const products = require('./routes/product');
const auth = require('./routes/auth')
app.use("/app/v1/",products);
app.use("/app/v1/",auth);

app.use(erroMiddleware);

module.exports = app;