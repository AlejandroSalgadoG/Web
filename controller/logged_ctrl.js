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
