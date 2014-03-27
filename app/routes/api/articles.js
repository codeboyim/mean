'use strict';

// Articles routes use articles controller
var articles = require('../../api/articles');
var authorization = require('../middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get(/^\/articles/, function(req, res, next) {
        req.url = '/';
        next();
    });

    // articles api
    app.get('/api/articles', articles.all);
    app.post('/api/articles', authorization.requiresLogin, articles.create);
    app.get('/api/articles/:articleId', articles.show);
    app.put('/api/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.update);
    app.del('/api/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);

};
