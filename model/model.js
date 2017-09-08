var mysql = require('mysql');

var info = {
    host: '127.0.0.1',
    user: 'alejandro',
    password: 'jaja19',
    database: 'image_manager',
}

var connection = mysql.createPool(info);

//BEGIN GENERIC FUNCTIONS
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
//END GENERIC FUNCTIONS

exports.consult_password = function(user, callback_fun){
    var query_var = 'SELECT password FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.create_user = function(user, pass, callback_fun){
    var query_var = 'INSERT INTO users VALUES ("'+user+'", "'+pass+'");';
    execute_query(query_var, callback_fun);
}

exports.consult_users = function(callback_fun){
    var query_var = 'SELECT user FROM users;';
    execute_query(query_var, callback_fun);
}

exports.search_user_image = function(user, img, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON id=imageid \
                     WHERE userid="'+user+'" AND name="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.create_image = function(info, callback_fun){
    var query_var = 'INSERT INTO images (file, name, path, private) \
                     VALUES ("'+info.file+'", "'+info.name+'", "'+info.path+'", "'+info.scope+'");';
    execute_query(query_var, callback_fun);
}

exports.search_user = function(user, callback_fun){
    var query_var = 'SELECT user FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.create_image_association = function(info, callback_fun){
    var query_var = 'INSERT INTO associations \
                     VALUES ("'+info.user+'", "'+info.img+'", "'+info.scope+'");';
    execute_query(query_var, callback_fun);
}

exports.delete_image_association = function(info, callback_fun){
    var query_var = 'DELETE FROM associations WHERE userid="'+info.user+'" AND imageid="'+info.img+'";';
    execute_query(query_var, callback_fun);
}

exports.update_image = function(info, callback_fun){
    var query_var = 'UPDATE images SET ';
    if (info.new_name != ""){
        query_var += 'name="'+info.new_name+'" ';
        if (info.scope != undefined) query_var += ', ';
    }
    if (info.scope != undefined) query_var += 'private="'+info.scope+'" ';
    
    query_var += 'WHERE id="'+info.id+'";';
    execute_query(query_var, callback_fun);
}

exports.delete_all_image_associations = function(img, callback_fun){
    var query_var = 'DELETE FROM associations WHERE imageid="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.delete_image = function(img, callback_fun){
    var query_var = 'DELETE FROM images WHERE id="'+img+'";';
    execute_query(query_var, callback_fun);
}

exports.search_like_user_images = function(user, img, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON id=imageid \
                     WHERE (userid="'+user+'" or private="false") AND name LIKE "%'+img+'%";';
    execute_query(query_var, callback_fun);
}

exports.search_public_images = function(callback_fun){
    var query_var = 'SELECT * FROM images WHERE private="false";';
    execute_query(query_var, callback_fun);
}

exports.search_shared_images = function(user, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON id=imageid \
                     WHERE userid="'+user+'" AND owner="false";';
    execute_query(query_var, callback_fun);
}

exports.search_private_images = function(user, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON id=imageid \
                     WHERE userid="'+user+'" AND owner="true";';
    execute_query(query_var, callback_fun);
}

exports.search_user_images = function(user, callback_fun){
    var query_var = 'SELECT * FROM images \
                     INNER JOIN associations ON id=imageid \
                     WHERE userid="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.delete_user = function(user, callback_fun){
    var query_var = 'DELETE FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.change_password = function(user, pass, callback_fun){
    var query_var = 'UPDATE users SET password="'+pass+'" WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}
