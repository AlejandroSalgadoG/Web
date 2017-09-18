var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');
var session  = require('express-session');
var morgan = require('morgan');

var passport = require('passport');

var app = express();

require('./model/model')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 's3cretK3y',
	resave: true,
	saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());

require('./model/routes')(app, passport);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var server = app.listen(3000);
function cleanup(){ server.close(); }

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);