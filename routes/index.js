var model = require('../database/model');

exports.home = function(req, res){
    res.render('home', { error: "", msg: "" });
}

exports.logged = function(req, res){
    var user = req.body.user;

    model.consult_password(user,
        function(err, result){
            if (err){
                console.log(err);
            }

            var pass = req.body.password;
            var true_pass = result[0].password;

            if (pass == true_pass) res.render('logged', { user: user });
            else res.redirect('back');
        }
    );
};

exports.registration = function(req, res){
    var name = req.body.name;
    var user = req.body.user;
    var pass = req.body.password;
    var pass2 = req.body.password2;

    if ((pass == pass2) && (pass != "")){
        var info = [user, pass];

        model.create_user(info,
            function(err, result){
                if (err){
                    res.render('home', {error: "The user already exists",
                                        msg: "" });
                }else{
                    console.log("User creation is finished");
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

exports.delete_user = function(req, res){
    var user = req.body.user;

    model.consult_password(user,
        function(err, result){
            if (err){
                console.log(err);
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
            else res.render('logged', { user: user });
        }
    );   
}
