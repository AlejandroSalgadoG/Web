var model = require('./database/model');

exports.start_fun = function(){
    model.connect_db();
};

exports.end_fun = function(){
    model.disconnect_db();
    process.exit();
};
