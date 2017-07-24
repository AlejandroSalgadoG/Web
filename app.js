var express = require('express');
var app = express();

// Routes
app.get('/', function(req, res){
    res.send("Hey there I'm the server");
});

app.listen(3000, function(){
    console.log("The application is running on localhost:3000");
});
