var model = require('../database/model');

exports.home = function(req, res){
    res.render('home');
}

exports.register = function(req, res){
    res.render('register', {error: "" });
}

exports.logged = function(req, res){
    model.consult_password(req.body.user,
        function(err, result){
            if (err){
                console.log(err);
            }

            var pass = req.body.password;
            var true_pass = result[0].password;

            if (pass == true_pass) res.render('logged');
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
                    console.log(err);
                    res.render('register', {error: "The user already exists" });
                }else{
                    console.log("User creation is finished");
                    res.redirect('/');
                }
            }
        );
    }else{
        res.render('register', {error: "" });
    }
}
