var model = require('../model/model');

exports.home = function(req, res){
    res.render('home', { msg: "" });
}

exports.logged = function(req, res){
    var user = req.body.user;
    var pass = req.body.password;

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('home', { msg: err });
                return;
            }

            if (result.length == 0){
                res.render('home', { msg: "Bad user" });
                return;
            }

            var true_pass = result[0].password;

            if (pass == true_pass){ 
                var age = 10 * 60 * 1000;
                res.cookie('user', user, {maxAge: age});
                res.render('logged', { user: user, msg: "" });
            }
            else res.render('home', { msg: "Bad password" });
        }
    );
};

exports.registration = function(req, res){
    var user = req.body.ruser;
    var pass = req.body.rpassword;
    var pass2 = req.body.rpassword2;

    if ((pass != pass2) || (pass == "")){
        res.render('home', { msg: "Bad passwords" });
        return;
    }

    model.create_user( { user: user, password: pass },
        function(err, result){
            if (err) res.render('home', { msg: err });
            else res.render('home', { msg: "The user has been created" });
        }
    );
}

exports.read_users = function(req, res){
    model.consult_users(
        function(err, result){
            if (err) res.render('users', { mysql : "", msg: err } );
            else res.render('users', { mysql : result, msg: "" } );
        }
    );
}

exports.delete_user = function(req, res){
    var user = req.cookies.user;
    var pass = req.body.password;

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('logged', { user: user, msg: err });
                return;
            }

            var true_pass = result[0].password;

            if (pass == true_pass){
                model.delete_user(user,
                    function(err, result){
                        if (err) res.render('logged', { user: user, msg: err });
                        else res.redirect('/');
                    }
                );
            }
            else res.render('logged', { user: user, msg: "Bad password" });
        }
    );   
}

exports.update_user = function(req, res){
    var user = req.cookies.user;
    var old_pass = req.body.old_password;
    var new_pass = req.body.new_password;
    var new_pass2 = req.body.new_password2;

    if ((new_pass != new_pass2) || (new_pass == "")){
        res.render('logged', { user: user, msg: "Bad passwords" });
        return;
    }

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('logged', { user: user, msg: "" });
                return;
            }

            var true_pass = result[0].password;

            if (old_pass == true_pass){
                model.change_password( { user: user, password: new_pass },
                    function(err, result){
                        if (err) res.render('logged', { user: user, msg: err });
                        else res.render('logged', { user: user, msg: "User updated" });
                    }
                );
            }
            else res.render('logged', { user: user, msg: "Bad password" });
        }
    );
}
