var file_system = require('fs');

var home_ctrl = require('./home_ctrl');
var logged_ctrl = require('./logged_ctrl');
var model = require('../model/model');

//ROOT FUNCTION
exports.home = function(req, res){
    res.render('home', { msg:"" });
}

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



exports.delete_image = function(req, res){
    var user = req.cookies.user;
    var image = req.body.del_img_name;

    model.search_user_image(user, image,
        function(err, result){
            if (err){
                res.render('logged', { user: user, search: {}, msg: err });
                return;
            }

            if (result.length == 0){
                res.render('logged', { user: user, search: {}, msg: "Bad image" });
                return;
            }

            var type = result[0].type;

            if (result[0].owner == "true"){
                model.delete_all_image_associations(image,
                    function(err, result){
                        if (err){
                            res.render('logged', { user: user, search: {}, msg: err });
                            return;
                        }

                        model.delete_image(image,
                            function(err, result){
                                if (err){
                                    res.render('logged', { user: user, search: {}, msg: err });
                                    return;
                                }
                            }
                        );

                        file_system.unlink('share/'+image+'.'+type,
                            function(err){
                                if (err) res.render('logged', { user: user, search: {}, msg: err });
                                else res.render('logged', { user: user, search: {}, msg: "Image deleted" });
                            }
                        );
                    }
                );
            }
            else{
                model.delete_image_association(user, image,
                    function(err, result){
                        if (err) res.render('logged', { user: user, search: {}, msg: err });
                        else res.render('logged', { user: user, search: {}, msg: "Image deleted" });
                    }
                );
            }
        }
    );
}

exports.update_image = function(req, res){
    var user = req.cookies.user;

    var img_scope;
    if (req.body.img_private2 == "on") var img_scope = "true";
    else if (req.body.img_public2 == "on") var img_scope = "false";

    var img_info = { name: req.body.img_name,
                     type: req.body.img_type,
                     size: req.body.img_size,
                     dimension: req.body.img_dimension,
                     scope: img_scope };

    model.search_user_image(user, img_info.name,
        function(err, result){
            if (err){
                res.render('logged', { user: user, search: {}, msg: err });
                return;
            }

            if (result.length == 0){
                res.render('logged', { user: user, search: {}, msg: "Bad image" });
                return;
            }

            model.update_image(img_info,
                function(err, result){
                    if (err) res.render('logged', { user: user, search: {}, msg: err });
                    else res.render('logged', { user: user, search: {}, msg: "Image updated" });
                }
            );
        }
    );
}

exports.delete_user = function(req, res){
    var user = req.cookies.user;
    var pass = req.body.password;

    model.consult_password(user,
        function(err, result){
            if (err) return res.render('account', { msg: err });

            var true_pass = result[0].password;

            if (pass != true_pass)
                return res.render('account', { msg: "Bad password" });

            model.search_user_images(user,
                function(err, result){
                    if (err) return res.render('account', { msg: err });

                    for (var i=0;i<result.length;i++){
                        image = result[i].name;
                        type = result[i].type;

                        if (result[i].owner == "true"){
                            model.delete_all_image_associations(image,
                                function(err, result){
                                    if (err) return res.render('account', { msg: err });

                                    model.delete_image(image, 
                                        function(err, result){
                                            if (err) return res.render('account', { msg:err });
                                        }
                                    );

                                    var img = 'share/'+image+'.'+type;

                                    file_system.unlink(img, 
                                        function(err, result){
                                            if (err) return res.render('logged', { user:user, search:{}, msg:err });
                                        }        
                                    );
                                }
                            );
                        }
                        else
                            model.delete_image_association(user, image, 
                                function(err, result){
                                    if (err) return res.render('account', { msg:err });
                                }
                            );
                    }

                    model.delete_user(user,
                        function(err, result){
                            if (err) return res.render('account', { msg: err });
                            res.clearCookie('user');
                            res.redirect('/');
                        }
                    );
                }
            );
        }
    );
}

exports.update_user = function(req, res){
    var user = req.cookies.user;
    var old_pass = req.body.old_password;
    var new_pass = req.body.new_password;
    var new_pass2 = req.body.new_password2;

    if ((new_pass != new_pass2) || (new_pass == ""))
        return res.render('account', { msg: "Bad passwords" });

    model.consult_password(user,
        function(err, result){
            if (err) return res.render('account', { msg: err });

            var true_pass = result[0].password;

            if (old_pass == true_pass){
                model.change_password( { user: user, password: new_pass },
                    function(err, result){
                        if (err) res.render('account', { msg: err });
                        else res.render('logged', { user: user, search: {}, msg: "User updated" });
                    }
                );
            }
            else res.render('account', { msg: "Bad password" });
        }
    );
}
