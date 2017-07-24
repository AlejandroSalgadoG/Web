var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var routes = require('./routes');

// Routes
app.get('/', routes.home);

app.listen(3000, function(){
    console.log("The application is running on localhost:3000");
});
