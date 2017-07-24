var model = require('../database/model');

exports.home = function(req, res){
    res.render('home');
};

exports.log = function(req, res){
    model.consult_user( function(result){
        var user = req.body.user;
        var pass = req.body.password;

        var true_user = result.user;
        var true_pass = result.password;

        if ((user == true_user) && (pass == true_pass)) res.render('logged');
        else res.redirect('back');
    });

};
