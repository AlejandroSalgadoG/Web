var bcrypt = require('bcryptjs');

//BEGIN REGISTRATION
exports.register = function(req, res){
    return function(err, result){
        if (err) res.render('home', { msg:err });
        else res.render('home', { msg:"The user has been created" });
    }
}
//END REGISTRATION

//BEGIN USERS READING
exports.read_users = function(req, res){
    return function(err, result){
        if (err) res.render('users', { mysql:"", msg:err });
        else res.render('users', { mysql:result, msg:"" });
    }
}
//END USERS READING
