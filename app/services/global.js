'use strict';

/**
 * Generic require login routing middleware
 */
module.exports = function(app) {

    app.locals.menu = [{
        'title': 'Articles',
        'link': 'articles',
        'route': 'all articles'
    }, {
        'title': 'Create New Article',
        'link': 'articles/create',
        'route': 'create article'
    }];

};
