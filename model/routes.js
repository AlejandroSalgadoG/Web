var routes = require('../controller');

module.exports = function(app, passport){

    app.get('/', routes.home);
    app.get('/logout', isLoggedIn, routes.logout);
    app.get('/read_users', routes.read_users);
    app.get('/manage_account', isLoggedIn, routes.manage_account);
    app.get('/search_images_by_name', isLoggedIn, routes.search_images_by_name);
    app.get('/search_images_by_type', isLoggedIn, routes.search_images_by_type);

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect : '/',
    }), function(req, res) {
        var user = req.body.user;
        res.cookie('user', user);
        res.render('logged', { user:user, search:{}, msg:"" });
    });

    app.post('/register', passport.authenticate('local-signup', {
		failureRedirect : '/',
    }), function(req, res){
        res.render('home', { msg:"The user has been created" })
    });

    app.get('/register', isLoggedIn, function(req, res){
        res.render('logged.ejs')
    })

    app.post('/delete_user', isLoggedIn, routes.delete_user);
    app.post('/update_password', isLoggedIn, routes.update_password);
    app.post('/create_image', isLoggedIn, routes.create_image);
    app.post('/update_image', isLoggedIn, routes.update_image);
    app.post('/share_image', isLoggedIn, routes.share_image);
    app.post('/delete_image', isLoggedIn, routes.delete_image);  
};


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}