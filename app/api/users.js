'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    userRoles = require('../../public/app/routingConfig').userRoles,
    passport = require('passport');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.send(200);
};

/**
 * Session
 */
exports.session = function(req, res) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.jsonp(500, {
                error: err
            });
        }
        if (!user) {
            return res.jsonp(401, {
                error: info ? (info.message || '') : 'Unknown email or wrong password'
            });
        }

        req.logIn(user, function(err) {
            if (err) {
                return res.jsonp(500, {
                    error: err
                });
            }
            delete user.salt;
            delete user.hashed_password;
            return res.jsonp(user);
        });

    })(req, res);
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);
    var message = null;

    user.role = userRoles.user;
    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.send(400, message);
        }
        req.logIn(user, function(err) {
            if (err) res.send(400, err);
            return res.jsonp(user);
        });
    });
};

exports.checkIfAvailable = function(req, res) {
    User
        .findOne(req.body)
        .exec(function(err, user) {
            if (err) res.send(500, err);
            res.jsonp({
                result: !user
            });
        });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
