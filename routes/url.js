const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const globalUrls = require('../config/default.js');
const mongoose = require('mongoose');

const Url = require('../models/Url.js');
// @route POST /api/url/shorten
// @desc  Create short Url
console.log(Url);
router.post('/shorten',async (req,res)=>{
  let longUrl = req.body.longUrl;
  let baseUrl = globalUrls.baseUrl;
  console.log(Url);
  //Check Base URL validity
  if(!validUrl.isUri(baseUrl)){
    return res.status(401).json({"msg" : "URL is invalid"});
  }

  //Generate a short ID
  let urlCode = shortid.generate();

  //Check long URL
  if(validUrl.isUri(longUrl)){
    try{
      //Checking db for previous entry
      let url = await Url.findOne({"longUrl" : longUrl});
      if(url){
        res.json(url);
      }
      else{
        //On Not found, a new Url is generated and sent to the db
        let shortUrl = baseUrl+ "/" +urlCode;
        url = new Url({
          longUrl : longUrl,
          shortUrl : shortUrl,
          urlCode : urlCode,
          date : new Date()
        });
        await url.save();
        res.json(url);
      }
    }
    catch(err){
      //Catching server errors
      console.error(err);
      res.status(500).json({"msg" : "Server Error"});
    }
  }
  else{
    //In case bad longUrl is sent!
    res.status(401).json({"msg":"Bad request, Url likely invalid"});
  }
})

module.exports = router;
