const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const urlSchema = require('./models/Url.js');
const cors = require('cors');
const app = express();
const path = require('path');
// app.use(cors);

//Connect to DB
connectDB();
//Enable JSON 
app.use(express.json({extended:false}));
app.use(express.static(path.join(__dirname,'client')));


//Defining Routes
app.use("/",require('./routes/main.js'));
app.use("/api/url",require('./routes/url.js'));



const PORT = process.env.PORT || 5000 ;

app.listen(PORT,()=>{console.log(`This server has started on ${PORT}`);});
