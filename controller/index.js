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
                res.cookie('user', user);
                res.render('logged', { user: user, search: {}, msg: "" });
            }
            else res.render('home', { msg: "Bad password" });
        }
    );
}

exports.logout = function(req, res){
    res.clearCookie('user');
    res.redirect('/');
}

exports.manage_account = function(req, res){
    if (req.cookies.user == undefined) res.render('error');
    else res.render('account', { msg: "" });
}

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
                res.render('account', { msg: err });
                return;
            }

            var true_pass = result[0].password;

            if (pass != true_pass){
                res.render('account', { msg: "Bad password" });
                return;
            }

            model.search_user_images(user,
                function(err, result){
                    if (err){
                        res.render('account', { msg: "error 1" });
                        return;
                    }

                    for (var i=0;i<result.length;i++){
                        image = result[i].name;

                        if (result[i].owner == "true"){
                            model.delete_all_image_associations(image,
                                function(err, result){
                                    if (err){
                                        res.render('account', { msg: "error 2" });
                                        return;
                                    }

                                    model.delete_image(image,
                                        function(err, result){
                                            if (err){
                                                res.render('account', { msg: "error 3" });
                                                return;
                                            }
                                        }
                                    );
                                }
                            );
                        }
                        else{
                            model.delete_image_association(user, image,
                                function(err, result){
                                    if (err){
                                        res.render('account', { msg: "error 4" });
                                        return;
                                    }
                                }
                            );
                        }
                    }

                    model.delete_user(user,
                        function(err, result){
                            if (err) res.render('account', { msg: "error 5" });
                            else{
                                res.clearCookie('user');
                                res.redirect('/');
                            }
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

    if ((new_pass != new_pass2) || (new_pass == "")){
        res.render('account', { msg: "Bad passwords" });
        return;
    }

    model.consult_password(user,
        function(err, result){
            if (err){
                res.render('account', { msg: err });
                return;
            }

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

exports.share_image = function(req, res){
    var user = req.cookies.user;
    var user_share = req.body.img_user_share;
    var image = req.body.img_name_share;

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

            model.search_user(user_share,
                function(err, result){
                    if (err){
                        res.render('logged', { user: user, search: {}, msg: err });
                        return;
                    }

                    if (result.length == 0){
                        res.render('logged', { user: user, search: {}, msg: "Bad user" });
                        return;
                    }

                    if (req.body.share != undefined){
                        model.share_image(user_share, image,
                            function(err, result){
                                if (err) res.render('logged', { user: user, search: {}, msg: err });
                                else res.render('logged', { user: user, search: {}, msg: "image shared" });
                            }
                        );
                    }else{
                        model.delete_image_association(user_share, image,
                            function(err, result){
                                if (err) res.render('logged', { user: user, search: {}, msg: err });
                                else res.render('logged', { user: user, search: {}, msg: "image unshared" });
                            }
                        );
                    }
                }
            );
        }
    );
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

exports.create_image = function(req, res){
    var user = req.cookies.user;

    if (req.body.img_private == "on") var img_scope = "true";
    else var img_scope = "false";

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

            model.create_image(img_info,
                function(err, result){
                    if (err){
                        res.render('logged', { user: user, search: {}, msg: err });
                        return;
                    }

                    model.add_private_association(user, img_info.name,
                        function(err, result){
                            if (err) res.render('logged', { user: user, search: {}, msg: err });
                            else res.render('logged', { user: user, search: {}, msg: "image created" });
                        }
                    );
                }
            );
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

            if (result[0].owner == "true"){
                model.delete_all_image_associations(image,
                    function(err, result){
                        if (err){
                            res.render('logged', { user: user, search: {}, msg: err });
                            return;
                        }

                        model.delete_image(image,
                            function(err, result){
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
