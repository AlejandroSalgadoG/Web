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
app.post('/login', routes.login);
app.post('/logout', routes.logout);
app.post('/register', routes.registration);
app.post('/delete_user', routes.delete_user);
app.post('/update_password', routes.update_user);
app.get('/read_users', routes.read_users);
app.get('/read_public_images', routes.read_public_images);
app.post('/read_private_images', routes.read_private_images);
app.post('/read_shared_images', routes.read_shared_images);

var server = app.listen(3000, helper.start_fun);
function cleanup(){ server.close( helper.end_fun ); }

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
