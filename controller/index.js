var file_system = require('fs');

var home_ctrl = require('./home_ctrl');
var logged_ctrl = require('./logged_ctrl');
var account_ctrl = require('./account_ctrl');

var model = require('../model/model');

//BEGIN ROOT FUNCTION
exports.home = function(req, res){
    res.render('home', { msg:"" });
}
//END ROOT FUNCTION

//BEGIN HOME FUNCTIONS
exports.login = function(req, res){
    var user = req.body.user;
    model.consult_password(user, home_ctrl.login(req, res));
}

exports.register = function(req, res){
    var user = req.body.ruser;
    var pass = req.body.rpassword;
    model.create_user( { user:user, pass:pass }, home_ctrl.register(req, res));
}

exports.read_users = function(req, res){
    model.consult_users(home_ctrl.read_users(req,res));
}
//END HOME FUNCTIONS

//BEGIN LOGGED FUNCTIONS
exports.manage_account = function(req, res){
    if (req.cookies.user == undefined) res.render('error');
    else res.render('account', { msg:"" });
}

exports.logout = function(req, res){
    res.clearCookie('user');
    res.redirect('/');
}

exports.create_image = function(req, res){
    var name = req.body.img_name;
    model.search_image(name, logged_ctrl.create_image(req, res));
}

exports.share_image = function(req, res){
    var user = req.cookies.user;
    var image = req.body.img_name_share;
    model.search_user_image(user, image, logged_ctrl.share_image(req, res));
}

exports.update_image = function(req, res){
    var user = req.cookies.user;
    var name = req.body.img_name;
    model.search_user_image(user, name, logged_ctrl.update_image(req, res));
}

exports.delete_image = function(req, res){
    var user = req.cookies.user;
    var image = req.body.del_img_name;
    model.search_user_image(user, image, logged_ctrl.delete_image(req, res));
}
//END LOGGED FUNCTIONS

//BEGIN ACCOUNT FUNCTIONS
exports.delete_user = function(req, res){
    var user = req.cookies.user;
    model.consult_password(user, account_ctrl.delete_user(req, res));
}

exports.update_password = function(req, res){
    var user = req.cookies.user;
    model.consult_password(user, account_ctrl.update_password(req, res));
}
//END ACCOUNT FUNCTIONS

exports.search_public_images = function(req, res){
    if (req.cookies.user == undefined){
        res.render('error');
        return;
    }

    var user = req.cookies.user;
    model.search_public_images(
        function(err, result){
            if (err) res.render('logged', { user: user, search : {}, msg: err } );
            else res.render('logged', { user: user, search : result, msg: "" } );
        }
    );
}

exports.search_private_images = function(req, res){
    if (req.cookies.user == undefined){
        res.render('error');
        return;
    }

    var user = req.cookies.user;
    model.search_private_images(user,
        function(err, result){
            if (err) res.render('logged', { user: user, search : {}, msg: err } );
            else res.render('logged', { user: user, search : result, msg: "" } );
        }
    );
}

exports.search_shared_images = function(req, res){
    if (req.cookies.user == undefined){
        res.render('error');
        return;
    }

    var user = req.cookies.user;
    model.search_shared_images(user,
        function(err, result){
            if (err) res.render('logged', { user: user, search : {}, msg: err } );
            else res.render('logged', { user: user, search : result, msg: "" } );
        }
    );
}

exports.search_user_images = function(req, res){
    if (req.cookies.user == undefined){
        res.render('error');
        return;
    }

    var user = req.cookies.user;
    var image = req.query.img_search;

    model.search_like_user_images(user, image,
        function(err, result){
            if (err) res.render('logged', { user: user, search: {}, msg: err });
            else if (result.length == 0) res.render('logged', { user: user, search: {}, msg: "Bad image" });
            else res.render('logged', { user: user, search : result, msg: "" } );
        }
    );
}
