'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {

        if (req.is('application/*')) {
            return res.send(401, 'User is not authorized');
        } else {
            res.redirect('/signin');
        }

    }
    next();
};
