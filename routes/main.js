const express = require('express');
const router = express.Router();
const path = require('path');


const Url = require('../models/Url.js');

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'../client','index.html'));
})


router.get('/:code',async (req,res)=>{
    try{
        const url = await Url.findOne({"urlCode" : req.params.code});
        if(url){
            res.redirect(url.longUrl);
        }
        else{
            res.status(400).send({"msg":"Not found!"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({"msg" : "Server Error"});
    }
});

router.get("/all/urls",async (req,res)=>{
    try{
        const allUrls = await Url.find();
        res.json(allUrls);
    }
    catch(err){
        console.error("Server error : "+err);
        res.status(500).send({"msg" : "Server Error!"})
    }
})

module.exports = router;