var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var routes = require('./controller');
var helper = require('./app_helper');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Routes
app.get('/', routes.home);
app.post('/logged', routes.logged);
app.post('/register', routes.registration);
app.post('/delete', routes.delete_user);
app.post('/update', routes.update_user);
app.get('/users', routes.read_users);

var server = app.listen(3000, helper.start_fun);
function cleanup(){ server.close( helper.end_fun ); }

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
