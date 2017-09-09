var file_system = require('fs');
var model = require('../model/model');
var writter = require('./nfs_checker');

//BEGIN GENERIC FUNCTIONS
function err_fun(req, res){
    var user = req.cookies.user;
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

    return function(err, result){
        if (err) return res.render('account', { msg: err });

        for (var i=0;i<result.length;i++){

            var img_info = { user: user,
                             img:  result[i].id,
                             path: result[i].path,
                             file: result[i].file };

            if (result[i].owner == "true") model.delete_all_image_associations(img_info.img, delete_image_association_helper(req, res, img_info));
            else model.delete_image_association(img_info, err_fun(req, res));
        }

        model.delete_user(user, delete_user_finalization(req, res));
    }
}

function delete_image_association_helper(req, res, info){
    return function(err, result){
        if (err) return res.render('account', { msg: err });

        model.delete_image(info.img, err_fun(req, res));
        callback = { good: err_fun(req, res),
                     bad: err_fun(req, res) };
        writter.remove(info.path, info.file, callback);
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
