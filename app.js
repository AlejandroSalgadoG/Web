var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var routes = require('./controller');
var model = require('./model/model');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', routes.home);
app.get('/logout', routes.logout);
app.get('/read_users', routes.read_users);
app.get('/manage_account', routes.manage_account);
app.get('/search_public_images', routes.search_public_images);
app.get('/search_private_images', routes.search_private_images);
app.get('/search_shared_images', routes.search_shared_images);
app.get('/search_user_images', routes.search_user_images);

app.post('/login', routes.login);
app.post('/register', routes.registration);
app.post('/delete_user', routes.delete_user);
app.post('/update_password', routes.update_user);
app.post('/create_image', routes.create_image);
app.post('/update_image', routes.update_image);
app.post('/share_image', routes.share_image);
app.post('/delete_image', routes.delete_image);

var start_fun = function(){
    console.log("The application will connect to the database");
    model.connect_db();
};

var end_fun = function(){
    console.log("The application will disconnect from the database");
    model.disconnect_db();
    console.log('Good bye');
    process.exit();
};

var server = app.listen(3000, start_fun);
function cleanup(){ server.close( end_fun ); }

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
