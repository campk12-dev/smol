const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const urlSchema = require('./models/Url.js');
const app = express();

//Connect to DB
connectDB();
//Enable JSON 
app.use(express.json({extended:false}));

app.get("/",(req,res)=>{
    res.send("Welcome home!");
})


//Defining Routes
app.use("/",require('./routes/main.js'));
app.use("/api/url",require('./routes/url.js'));



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`This server has started on ${PORT}`);})
