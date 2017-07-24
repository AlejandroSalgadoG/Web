var model = require('../database/model');

exports.home = function(req, res){
    res.render('home');
}

exports.register = function(req, res){
    res.render('register');
}

exports.logged = function(req, res){
    model.consult_user( function(result){
        var user = req.body.user;
        var pass = req.body.password;

        var true_user = result.user;
        var true_pass = result.password;

        if ((user == true_user) && (pass == true_pass)) res.render('logged');
        else res.redirect('back');
    });

};

exports.registration = function(req, res){
    var name = req.body.name;
    var user = req.body.user;
    var pass = req.body.password;
    var pass2 = req.body.password2;

    if ((pass == pass2) && (pass != "")){
        res.redirect('/');
    }else{
        res.render('register');
    }
}
