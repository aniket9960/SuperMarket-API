const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const connectDB = require("./api/dbModel/dbConfig");

connectDB();

const dbController = require("./api/dbModel/dbController")
const userRoutes = require('./api/user/route')


//logging requests
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());
/* const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['POST','PATCH','DELETE'],
    optionsSuccessStatus: 200
  };

app.options('*',corsOptions); */
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content_type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


//Routes Middleware
app.post("/signup",dbController.signup);
app.post("/icreate",dbController.icreate);
app.post("/product",dbController.product);
app.get("/getProduct",dbController.getProduct);
app.get("/getAllProducts",dbController.getAllProducts);
app.get("/getInvoiceByNumber",dbController.getInvoiceByNumber);


app.use("/auth",userRoutes);

//Route Error Handling
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status= 404;
    next(err);
});
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            msg: err.message
        }
    });
});

module.exports = app;

//