var express = require('express');
var app = express();
var unirest = require("unirest");

// API 函数
exports.restful = function (url) {
  var req = unirest("GET", "https://api.bmob.cn/1/classes/" + url);
  var data;

  req.headers({
    "postman-token": "9d09f600-90f1-f98c-7b63-118c07265cd0",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "x-bmob-rest-api-key": "8a3d04621f341624f41a5db35d688abd",
    "x-bmob-application-id": "897d8343de907640340fa6b06684b181"
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    data = res.body   
    console.log(data) 
  }); 

}

