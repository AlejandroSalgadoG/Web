var model = require('../model/model');

exports.home = function(req, res){
    res.render('home', { msg: "" });
}

exports.login = function(req, res){
    var user = req.body.user;
    var pass = req.body.password;

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('home', { msg: err });
                return;
            }

            if (result.length == 0){
                res.render('home', { msg: "Bad user" });
                return;
            }

            var true_pass = result[0].password;

            if (pass == true_pass){ 
                var age = 10 * 60 * 1000;
                res.cookie('user', user, {maxAge: age});
                res.render('logged', { user: user, msg: "" });
            }
            else res.render('home', { msg: "Bad password" });
        }
    );
};

exports.logout = function(req, res){
    res.clearCookie('user');
    res.redirect('/');
};

exports.registration = function(req, res){
    var user = req.body.ruser;
    var pass = req.body.rpassword;
    var pass2 = req.body.rpassword2;

    if ((pass != pass2) || (pass == "")){
        res.render('home', { msg: "Bad passwords" });
        return;
    }

    model.create_user( { user: user, password: pass },
        function(err, result){
            if (err) res.render('home', { msg: err });
            else res.render('home', { msg: "The user has been created" });
        }
    );
}

exports.read_users = function(req, res){
    model.consult_users(
        function(err, result){
            if (err) res.render('users', { mysql : "", msg: err } );
            else res.render('users', { mysql : result, msg: "" } );
        }
    );
}

exports.delete_user = function(req, res){
    var user = req.cookies.user;
    var pass = req.body.password;

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('logged', { user: user, msg: err });
                return;
            }

            var true_pass = result[0].password;

            if (pass == true_pass){
                model.delete_user(user,
                    function(err, result){
                        if (err) res.render('logged', { user: user, msg: err });
                        else res.redirect('/');
                    }
                );
            }
            else res.render('logged', { user: user, msg: "Bad password" });
        }
    );   
}

exports.update_user = function(req, res){
    var user = req.cookies.user;
    var old_pass = req.body.old_password;
    var new_pass = req.body.new_password;
    var new_pass2 = req.body.new_password2;

    if ((new_pass != new_pass2) || (new_pass == "")){
        res.render('logged', { user: user, msg: "Bad passwords" });
        return;
    }

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('logged', { user: user, msg: "" });
                return;
            }

            var true_pass = result[0].password;

            if (old_pass == true_pass){
                model.change_password( { user: user, password: new_pass },
                    function(err, result){
                        if (err) res.render('logged', { user: user, msg: err });
                        else res.render('logged', { user: user, msg: "User updated" });
                    }
                );
            }
            else res.render('logged', { user: user, msg: "Bad password" });
        }
    );
}

exports.read_public_images = function(req, res){
    model.read_public_images(
        function(err, result){
            if (err) res.render('images', { type: "Public", mysql : "", msg: err } );
            else res.render('images', { type: "Public", mysql : result, msg: "" } );
        }
    );
}

exports.read_private_images = function(req, res){
    model.read_private_images(
        function(err, result){
            if (err) res.render('images', { type: "Private", mysql : "", msg: err } );
            else res.render('images', { type: "Private", mysql : result, msg: "" } );
        }
    );
}

exports.read_shared_images = function(req, res){
    var user = req.cookies.user;

    model.read_shared_images(user,
        function(err, result){
            if (err) res.render('images', { type: "Shared", mysql : "", msg: err } );
            else res.render('images', { type: "Shared", mysql : result, msg: "" } );
        }
    );
}

exports.create_image = function(req, res){
    var user = req.cookies.user;

    if (req.body.img_private == "on") var img_scope = "true";
    else var img_scope = "false";

    var img_info = { name: req.body.img_name,
                 type: req.body.img_type,
                 size: req.body.img_size,
                 dimension: req.body.img_dimension,
                 scope: img_scope }; 

    model.create_image(img_info,
        function(err, result){
            if (err) res.render('logged', { user: user, msg: err });
        }
    );

    model.add_private_association(user, img_info.name,
        function(err, result){
            if (err) res.render('logged', { user: user, msg: err });
            else res.render('logged', { user: user, msg: "image created" });
        }
    );
}

exports.delete_image = function(req, res){
    var user = req.cookies.user;
    var image = req.body.del_img_name;

    model.search_user_image(user, image,
        function(err, result){
            if (err){
                res.render('logged', { user: user, msg: err });
                return;
            }

            if (result.length == 0){
                res.render('logged', { user: user, msg: "Bad image" });
                return;
            }

            model.delete_image_associations(user, image,
                function(err, result){
                    if (err) res.render('logged', { user: user, msg: err });
                }
            ); 

            model.delete_image(image,
                function(err, result){
                    if (err) res.render('logged', { user: user, msg: err });
                    else res.render('logged', { user: user, msg: "Image deleted" });
                }
            ); 
        }
    );
}
