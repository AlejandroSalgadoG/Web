var file_system = require('fs');
var model = require('../model/queries');
var writter = require('./nfs_checker');
var async = require('async');

//BEGIN GENERIC FUNCTIONS
function err_fun(req, res){
    return function(err, result){
        if (err) res.render('account', { msg:err });
    }
}
//END GENERIC FUNCTIONS

//BEGIN USER DELETE
exports.delete_user = function(req, res){
    var user = req.cookies.user;
    var pass = req.body.password;

    return function(err, result){
        if (err) return res.render('account', { msg: err });

        var true_pass = result[0].password;
        if (pass != true_pass) return res.render('account', { msg: "Bad password" });

        model.search_user_images(user, delete_user_helper(req, res));
    }
}

function delete_user_helper(req, res){
    var user = req.cookies.user;

    return function(err, results){
        if (err) return res.render('account', { msg: err });
        var iterator = delete_image_association(req, res);
        async.each(results, iterator, function(){model.delete_user(user, delete_user_finalization(req, res));});
    }
}

function delete_image_association(req, res){
    var user = req.cookies.user;

    return function(result, callback){
        var img_info = { user: user,
                         img:  result.id,
                         path: result.path,
                         file: result.file };

        if (result.owner == "true") model.delete_all_image_associations(img_info.img, delete_image_association_helper(req, res, img_info, callback));
        else model.delete_image_association(img_info, function(err, result){ if (err) res.render('account', { msg:err }); callback(null); });
    }
}

function delete_image_association_helper(req, res, info, callback){
    return function(err, result){
        if (err) return res.render('account', { msg: err });

        model.delete_image(info.img, err_fun(req, res));
        responce = { good: err_fun(req, res),
                     bad: err_fun(req, res) };
        writter.remove(info.path, info.file, responce);
        callback(null);
    }
}

function delete_user_finalization(req, res){
    return function(err, result){
        if (err) return res.render('account', { msg: err });
        res.clearCookie('user');
        res.redirect('/');
    }
}
//END USER DELETE

//BEGIN PASSWORD UPDATE
exports.update_password = function(req, res){
    var user = req.cookies.user;
    var old_pass = req.body.old_password;
    var new_pass = req.body.new_password;

    return function(err, result){
        if (err) return res.render('account', { msg: err });

        var true_pass = result[0].password;
        if (old_pass != true_pass) return res.render('account', { msg: "Bad password" });

        model.change_password(user, new_pass, update_password_helper(req, res));
    }
}

function update_password_helper(req, res){
    var user = req.cookies.user;
    return function(err, result){
        if (err) res.render('account', { msg:err });
        else res.render('logged', { user:user, search:{}, msg:"Password updated" });
    }
}
//END PASSWORD UPDATE
