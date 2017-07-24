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

exports.connect_db = function(){
    console.log("The application will connect to the database");
    connection.connect(error_fun);
}

exports.consult_user = function(callback_fun){
    var query_var = 'SELECT * FROM users;';
    connection.query(query_var, function(err, result){
                callback_fun(result[0]);
            });
}

exports.disconnect_db = function(){
    console.log("The application will disconnect from the database");
    connection.end(error_fun);

    console.log('Good bye');
}
