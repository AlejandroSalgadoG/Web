var mysql = require('mysql');

var info = {
    host: 'localhost',
    user: 'alejandro',
    password: 'jaja19',
    database: 'image_manager',
    port: '/var/run/mysqld/mysqld.sock'
}

var connection = mysql.createConnection(info);

var error_fun = function(err) {
    if (err) throw err
    console.log('Action completed');
}

function execute_query(query_var, callback_fun){
    connection.query(query_var,
        function(err, result){
            callback_fun(err, result);
        }
    );
}

exports.connect_db = function(){
    console.log("The application will connect to the database");
    connection.connect(error_fun);
}

exports.consult_users = function(callback_fun){
    var query_var = 'SELECT user FROM users;';
    execute_query(query_var, callback_fun);
}

exports.consult_password = function(user, callback_fun){
    var query_var = 'SELECT password FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.create_user = function(info, callback_fun){
    var query_var = 'INSERT INTO users VALUES ("'+info.user+'", "'+info.password+'");';
    execute_query(query_var, callback_fun);
}

exports.delete_user = function(user, callback_fun){
    var query_var = 'DELETE FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.change_password = function(info, callback_fun){
    var query_var = 'UPDATE users SET password="'+info.password+'" WHERE user="'+info.user+'";';
    execute_query(query_var, callback_fun);
}

exports.read_public_images = function(callback_fun){
    var query_var = 'SELECT * FROM images WHERE private="false";';
    execute_query(query_var, callback_fun);
}

exports.read_private_images = function(callback_fun){
    var query_var = 'SELECT * FROM images WHERE private="true";';
    execute_query(query_var, callback_fun);
}

exports.read_shared_images = function(user, callback_fun){
    var query_var = 'SELECT * FROM associations WHERE owner="false" AND userid="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.create_image = function(info, callback_fun){
    var query_var = 'INSERT INTO images (name, type, size, dimension, private) \
                     VALUES ("'+info.name+'", "'+info.type+'", '+info.size+', "'+info.dimension+'", "'+info.scope+'");';
    execute_query(query_var, callback_fun);
}

exports.add_private_association = function(user, img, callback_fun){
    var query_var = 'INSERT INTO associations \
                     VALUES ("'+user+'", "'+img+'", "true");';
    execute_query(query_var, callback_fun);
}

exports.search_user_image = function(user, img, callback_fun){
    var query_var = 'SELECT imageid FROM associations WHERE userid="'+user+'" AND imageid="'+img+'" AND owner="true";';
    execute_query(query_var, callback_fun);
}

exports.delete_image = function(img, callback_fun){
    var query_var = ' DELETE FROM images WHERE name="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.delete_image_associations = function(user, img, callback_fun){
    var query_var = ' DELETE FROM associations WHERE userid="'+user+'" AND imageid="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.disconnect_db = function(){
    console.log("The application will disconnect from the database");
    connection.end(error_fun);
    console.log('Good bye');
}
