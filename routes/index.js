var model = require('../database/model');

exports.home = function(req, res){
    res.render('home');
};

exports.log = function(req, res){
    res.render('home');
    console.log(req.body.user);
    console.log(req.body.password);
};
