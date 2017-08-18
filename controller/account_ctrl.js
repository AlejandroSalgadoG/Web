var file_system = require('fs');
var model = require('../model/model');

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
            image = result[i].name;
            type = result[i].type;

            if (result[i].owner == "true") model.delete_all_image_associations(image, delete_image_association_helper(req, res, image, type));
            else model.delete_image_association(user, image, err_fun(req, res));
        }

        model.delete_user(user, delete_user_finalization(req, res));
    }
}

function delete_image_association_helper(req, res, image, type){
    return function(err, result){
        if (err) return res.render('account', { msg: err });
        model.delete_image(image, err_fun(req, res));
        var img = 'share/'+image+'.'+type;
        file_system.unlink(img, err_fun(req, res));
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

        model.change_password({ user:user, password:new_pass }, update_password_helper(req, res));
    }
}

function update_password_helper(req, res){
    var user = req.cookies.user;
    return function(err, result){
        if (err) res.render('account', { msg:err });
        else res.render('logged', { user:user, search:{}, msg:"User updated" });
    }
}
//END PASSWORD UPDATE
