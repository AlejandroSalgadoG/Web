var model = require('../model/model');

exports.home = function(req, res){
    res.render('home', { error: "", msg: "" });
}

exports.logged = function(req, res){
    var user = req.body.user;
    var pass = req.body.password;

    model.consult_password(user,
        function(err, result){
            if (err){
                console.log(err);
            }

            if (result.length == 0){
                res.render('home', {error: "Bad user",
                                    msg: "" });
                return;
            }

            var true_pass = result[0].password;

            if (pass == true_pass){ 
                var age = 10 * 60 * 1000;
                res.cookie('user', user, {maxAge: age});
                res.render('logged', { user: user,
                                       error: "",
                                       msg: "" });
            }else{
                res.render('home', { error: "Bad password",
                                     msg: "" });
            }
        }
    );
};

exports.registration = function(req, res){
    var user = req.body.ruser;
    var pass = req.body.rpassword;
    var pass2 = req.body.rpassword2;

    if ((pass != pass2) || (pass == "")){
        res.render('home', {error: "Bad passwords", msg: "" });
        return;
    }

    model.create_user( { user: user, password: pass },
        function(err, result){
            if (err) res.render('home', { error: err, msg: "" });
            else res.render('home', { error: "", msg: "The user has been created" });
        }
    );
}

exports.read_users = function(req, res){
    model.consult_users(
        function(err, result){
            if (err) res.render('users', { mysql : "", error: err } );
            else res.render('users', { mysql : result, error: "" } );
        }
    );
}

exports.delete_user = function(req, res){
    var user = req.cookies.user;
    var pass = req.body.password;

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('logged', { user: user,
                                       error: err,
                                       msg: "" });
            }

            var true_pass = result[0].password;

            if (pass == true_pass){
                model.delete_user(user,
                    function(err, result){
                        if (err){
                            res.render('logged', { user: user,
                                                   error: err,
                                                   msg: "" });
                        }else{
                            res.redirect('/');
                        }
                    }
                );
            }
            else res.render('logged', { user: user,
                                        error: "Bad password",
                                        msg: "" });
        }
    );   
}

exports.update_user = function(req, res){
    var user = req.cookies.user;
    var old_pass = req.body.old_password;
    var new_pass = req.body.new_password;
    var new_pass2 = req.body.new_password2;

    if ((new_pass != new_pass2) || (new_pass == "")){
        res.render('logged', { user: user, 
                               error: "Bad passwords",
                               msg: "" });
        return;
    }

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('logged', { user: user,
                                       error: err,
                                       msg: "" });
            }

            var true_pass = result[0].password;

            if (old_pass == true_pass){
                model.change_password( { user: user, password: new_pass },
                    function(err, result){
                        if (err){
                            res.render('logged', { user: user,
                                                   error: err,
                                                   msg: "" });
                        }else{
                            res.render('logged', { user: user,
                                                   error: "",
                                                   msg: "User updated" });
                        }
                    }
                );
            }
            else res.render('logged', { user: user,
                                        error: "Bad password",
                                        msg: "" });
        }
    );
}
