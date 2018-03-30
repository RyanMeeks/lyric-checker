var express = require('express');  
var request = require('request');

var app = express();  
app.use(require("cors")());
app.use('/', function(req, res) {  
    console.log(req.url);
  var url = "https://neutrinoapi.com/bad-word-filter" + req.url.substring(1);
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);  