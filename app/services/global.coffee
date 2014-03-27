'use strict'

#global service. create globally used middlewares or helpers

initGlobalVariables = (req, res, next) ->

	res.locals.globals = {
		menu:[
			{'title': 'Articles','link': 'articles'}
			{'title': 'Create New Article','link': 'articles/create'}
			{'title': 'Admin','link': 'admin'}
		]
	}

	next()

exports = (app) ->

	app.use initGlobalVariables

module.exports = exports