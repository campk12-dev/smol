const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const urlSchema = require('./models/Url.js');
const app = express();

//Connect to DB
connectDB();
//Enable JSON 
app.use(express.json({extended:false}));


//Defining Routes
app.use("/",require('./routes/main.js'));
app.use("/api/url",require('./routes/url.js'));



const PORT = 5000;

app.listen(PORT,()=>{console.log(`This server has started on ${PORT}`);})
