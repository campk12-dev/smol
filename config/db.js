const mongoose = require('mongoose');
const globalUrls = require('./default.js');
const db = globalUrls.mongoUri;

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useUnifiedTopology : true    
        });
    console.log("MongoDB connected!")
    }
    catch(err){
        console.log(`Error : ${err}`);
        process.exit(1);
    }
} 


module.exports = connectDB;