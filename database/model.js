var mysql = require('mysql');

var info = {
    host: 'localhost',
    user: 'alejandro',
    password: 'jaja19',
    database: 'image_manager'
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

exports.consult_password = function(user, callback_fun){
    var query_var = 'SELECT * FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.create_user = function(info, callback_fun){
    var query_var = 'INSERT INTO users VALUES ("'+info[0]+'", "'+info[1]+'");';
    execute_query(query_var, callback_fun);
}

exports.delete_user = function(user, callback_fun){
    var query_var = 'DELETE FROM users WHERE user="'+user+'";';
    execute_query(query_var, callback_fun);
}

exports.disconnect_db = function(){
    console.log("The application will disconnect from the database");
    connection.end(error_fun);

    console.log('Good bye');
}
