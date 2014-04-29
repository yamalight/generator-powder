// includes
// async-await fetures
var async = require('asyncawait/async');
var await = require('asyncawait/await');
// config
var config = require('../../config');
// db
var User = require('../../models').User;
// passport
var passport = require('passport');
var passportLocal = require('passport-local');
// crypto
var crypto = require('crypto');

// make passport policy
var LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(
    async(function (username, password, done) {
        var user = await(User.findOne({username: username}).exec());
        if (!user) {
            return done(null, false);
        }

        // encode password
        var md5sum = crypto.createHash('md5');
        md5sum.update(password + config.passwordSalt);
        var passHex = md5sum.digest('hex');

        // check
        if (passHex !== user.password) {
            return done(null, false);
        }
        // if all is OK, return user
        return done(null, user);
    })
));

// export
module.exports = function(app) {
    // registration
    app.post('/auth/register', async(function(req, res, next){
        // check password for match
        if(req.body.passwordNew !== req.body.passwordRepeat) {
            req.flash('error', 'Passwords do not match!');
            req.flash('oldData', req.body);
            return res.redirect('/register');
        }

        // hash password
        var md5sum = crypto.createHash('md5');
        md5sum.update(req.body.passwordNew + config.passwordSalt);
        var passHex = md5sum.digest('hex');

        // make new user data
        var newUser = {
            username: req.body.username,
            password: passHex,
        };

        // check if user exists
        var user = await(User.findOne({username: newUser.username}).exec());
        if(user){
            req.flash('error', 'User already exists!');
            req.flash('oldData', req.body);
            return res.redirect('/register');
        } else {
            // create new user
            var userModel = new User(newUser);
            userModel.save(function(err){
                if (err) {
                    return next(err);
                } else {
                    // if all is OK, redirect to root
                    return res.redirect('/');
                }
            });
        }
    }));

    // login
    app.post('/auth/login', function(req, res, next){
        passport.authenticate('local', function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('error', 'Incorrect login or password!');
                req.flash('oldusername', req.body.username);
                return res.redirect('/');
            }
            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }
                // redirect to the user profile on success
                return res.redirect('/');
            });
        })(req, res, next);
    });

    // logout
    app.get('/auth/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};
