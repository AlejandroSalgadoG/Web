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

            if (pass == true_pass) res.render('logged');
            else res.render('home', {error: "Incorrect user or password",
                                     msg: "" });
        }
    );
};

exports.registration = function(req, res){
    var user = req.body.ruser;
    var pass = req.body.rpassword;
    var pass2 = req.body.rpassword2;

    if ((pass == pass2) && (pass != "")){
        var info = [user, pass];

        model.create_user(info,
            function(err, result){
                if (err){
                    res.render('home', {error: "The user already exists",
                                        msg: "" });
                }else{
                    res.render('home', {error: "",
                                        msg: "The user has been created" });
                }
            }
        );
    }else{
        res.render('home', {error: "Bad passwords",
                            msg: "" });
    }
}

exports.read_users = function(req, res){
    model.consult_users(
        function(err, result){
            if (err){
                console.log(err);
            }

            res.render('users', { mysql : result } );
        }
    );
}

exports.delete_user = function(req, res){
    var user = req.body.user;

    model.consult_password(user,
        function(err, result){
            if (err){
                console.log(err);
            }

            if (result.length == 0){
                res.render('logged');
                return;
            }

            var pass = req.body.password;
            var true_pass = result[0].password;

            if (pass == true_pass){
                model.delete_user(user,
                    function(err, result){
                        if (err){
                            console.log("User deletion has failed");
                        }else{
                            res.redirect('/');
                        }
                    }
                );
            }
            else res.render('logged');
        }
    );   
}

exports.setcookie = function(req, res){
    res.cookie('cookieName2',1).render('logged');
    console.log('cookie created successfully');
}

exports.getcookie = function(req, res){
    console.log(req.cookies);
}
