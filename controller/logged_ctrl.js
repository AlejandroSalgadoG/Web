var model = require('../model/model');

//BEGIN GENERIC FUNCTIONS
function get_json(user, msg){
    return { user:user, search:{}, msg:msg };
}

function err_fun(req, res){
    var user = req.cookies.user;
    return function(err, result){
        if (err) res.render('logged', get_json(user, err));
    }
}

function msg_fun(req, res, msg){
    var user = req.cookies.user;
    return function(err, result){
        if (err) res.render('logged', get_json(user, err));
        else res.render('logged', get_json(user, msg));
    }
}
//END GENERIC FUNCTIONS

//BEGIN IMAGE CREATION
exports.create_image = function(req, res){
    var user = req.cookies.user;
    var file = req.files.img_file;

    var img_scope = "true";
    if (req.body.img_private != "on") img_scope = "false";

    var img_info = { name: req.body.img_name,
                     type: req.body.img_type,
                     size: req.body.img_size,
                     dimension: req.body.img_dimension,
                     scope: img_scope };

    var img_path = 'share/'+img_info.name+'.'+img_info.type;

    return function(err, result){
        if (err) return res.render('logged', get_json(user, err));
        model.create_image(img_info, create_image_helper(req, res));
        file.mv(img_path, msg_fun(req, res, "Image created"));
    }
}

function create_image_helper(req, res){
    var user = req.cookies.user;
    var img_name = req.body.img_name;

    return function(err, result){
        if (err) res.render('logged', get_json(user, err));
        else model.add_private_association(user, img_name, err_fun(req, res));
    }
}
//END IMAGE CREATION

//BEGIN IMAGE SHARING
exports.share_image = function(req, res){
    var user = req.cookies.user;
    var user_share = req.body.img_user_share;

    return function(err, result){
        if (err) return res.render('logged', get_json(user, err));
        if (result.length == 0) return res.render('logged', get_json(user, "Bad image"));

        model.search_user(user_share, share_image_helper(req, res));
    }
}

function share_image_helper(req, res){
    var user = req.cookies.user;
    var user_share = req.body.img_user_share;
    var image = req.body.img_name_share;

    return function(err, result){
        if (err) return res.render('logged', get_json(user, err));
        if (result.length == 0) return res.render('logged', get_json(user, "Bad user"));

        if (req.body.share != undefined) model.share_image(user_share, image, msg_fun(req, res, "Image shared"));
        else model.delete_image_association(user_share, image, msg_fun(req, res, "Image unshared"));
    }
}
//END IMAGE SHARING

//BEGIN IMAGE UPDATE
exports.update_image = function(req, res){
    var user = req.cookies.user;

    var img_scope;
    if (req.body.img_private2 == "on") img_scope = "true";
    else if (req.body.img_public2 == "on") img_scope = "false";

    var img_info = { name: req.body.img_name,
                     type: req.body.img_type,
                     size: req.body.img_size,
                     dimension: req.body.img_dimension,
                     scope: img_scope };

    return function(err, result){
        if (err) return res.render('logged', get_json(user, err));
        if (result.length == 0) return res.render('logged', get_json(user, "Bad image"));
        model.update_image(img_info, msg_fun(req, res, "Image updated"));
    }
}
//END IMAGE UPDATE
