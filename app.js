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
app.get('/read_users', routes.read_users);

app.post('/login', routes.login);
app.post('/logout', routes.logout);
app.post('/manage_account', routes.manage_account);
app.post('/register', routes.registration);
app.post('/delete_user', routes.delete_user);
app.post('/update_password', routes.update_user);
app.post('/update_image', routes.update_image);
app.post('/search_public_images', routes.search_public_images);
app.post('/search_private_images', routes.search_private_images);
app.post('/search_shared_images', routes.search_shared_images);
app.post('/search_user_images', routes.search_user_images);
app.post('/create_image', routes.create_image);
app.post('/delete_image', routes.delete_image);

var server = app.listen(3000, helper.start_fun);
function cleanup(){ server.close( helper.end_fun ); }

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
