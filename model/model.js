var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var Query = require('./queries');
var mysql = require('mysql');

var info = {
    host: '127.0.0.1',
    user: 'alejandro',
    password: 'jaja19',
    database: 'image_manager',
}

var connection = mysql.createPool(info);

// Passport functions

module.exports = function(passport) {
    
        passport.serializeUser(function(user, done) {
            done(null, user.user);
        });
    
        passport.deserializeUser(function(user, done) {
            connection.query("SELECT * FROM users WHERE user = ? ",[user], function(err, rows){
                done(err, rows[0].user);
            });
        });
    
        passport.use('local-signup', new LocalStrategy({
                usernameField : 'ruser',
                passwordField : 'rpassword',
                passReqToCallback : true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM users WHERE user = '"+username+"'",function(err,rows){
                    if (err)
                        return done(err);
                     if (rows.length) {
                        return done(null, false);
                    } else {
                        var newUserMysql = new Object();
                        
                        newUserMysql.user = username;
                        newUserMysql.password = password;
                    
                        var insertQuery = "INSERT INTO users ( user, password ) values ('" + username +"','"+ password +"')";
                        connection.query(insertQuery,function(err,rows){                        
                            return done(null, newUserMysql);
                        })
                    }
            })
        }));
    
        passport.use('local-login', new LocalStrategy({
                usernameField : 'user',
                passwordField : 'password',
                passReqToCallback : true
            },
            function(req, username, password, done) {
                connection.query("SELECT * FROM users WHERE user = ?",[username], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false); 
                    }
    
                    if (password !== rows[0].password){
                        return done(null, false);
                    }
                        
                    return done(null, rows[0]);
                });
            })
        );

    };