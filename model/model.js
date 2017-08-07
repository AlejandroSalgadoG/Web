var mysql = require('mysql');

var info = {
    host: 'localhost',
    user: 'alejandro',
    password: 'jaja19',
    database: 'image_manager',
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

exports.search_public_images = function(callback_fun){
    var query_var = 'SELECT * FROM images WHERE private="false";';
    execute_query(query_var, callback_fun);
}

exports.search_private_images = function(user, callback_fun){
    var query_var = 'SELECT name,type,size,dimension \
                     FROM images INNER JOIN associations ON name=imageid \
                     WHERE owner="true" AND userid="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.search_shared_images = function(user, callback_fun){
    var query_var = 'SELECT name,type,size,dimension \
                     FROM images INNER JOIN associations ON name=imageid \
                     WHERE owner="false" AND userid="'+user+'";';
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

exports.search_image = function(img, callback_fun){
    var query_var = 'SELECT * FROM images WHERE name="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.search_user_image = function(user, img, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON name=imageid \
                     WHERE userid="'+user+'" AND imageid="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.search_user_images = function(user, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON name=imageid \
                     WHERE userid="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.search_like_user_images = function(user, img, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON name=imageid \
                     WHERE (userid="'+user+'" or private="false") AND imageid LIKE "%'+img+'%";';
    execute_query(query_var, callback_fun);
}

exports.search_user = function(user, callback_fun){
    var query_var = 'SELECT user FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.delete_image = function(img, callback_fun){
    var query_var = 'DELETE FROM images WHERE name="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.delete_image_association = function(user, img, callback_fun){
    var query_var = 'DELETE FROM associations WHERE userid="'+user+'" AND imageid="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.delete_all_image_associations = function(img, callback_fun){
    var query_var = 'DELETE FROM associations WHERE imageid="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.update_image = function(info, callback_fun){
    var query_var = 'UPDATE images SET ';

    query_var += 'name="'+info.name+'" ';

    if (info.type != "") query_var += ', type="'+info.type+'" ';
    if (info.size != "") query_var += ', size="'+info.size+'" ';
    if (info.dimension != "") query_var += ', dimension="'+info.dimension+'" ';
    if (info.scope != undefined) query_var += ', private="'+info.scope+'" ';

    query_var += 'WHERE name="'+info.name+'";';

    execute_query(query_var, callback_fun);
}

exports.share_image = function(user, img, callback_fun){
    var query_var = 'INSERT INTO associations \
                     VALUES ("'+user+'", "'+img+'", "false");';
    execute_query(query_var, callback_fun);
}

exports.disconnect_db = function(){
    connection.end(error_fun);
}
