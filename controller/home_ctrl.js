//BEGIN LOGIN
exports.login = function(req, res){
    var user = req.body.user;

    return function(err, result){
        if (err) return res.render('home', { msg:err });
        if (result.length == 0) return res.render('home', { msg:"Bad user" });

        var pass = req.body.password;
        var true_pass = result[0].password;

        if (pass != true_pass) return res.render('home', { msg:"Bad password" });

        res.cookie('user', user);
        res.render('logged', { user:user, search:{}, msg:"" });
    }
}
//END LOGIN

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
