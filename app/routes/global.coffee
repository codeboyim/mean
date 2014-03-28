'use strict'

authorization = require './middlewares/authorization'

redirectToRoot = (req, res, next) ->
	req.url = '/'
	next()

module.exports = (app)->

	app.get /^\/articles/, redirectToRoot
	
	app.get /^\/admin(\/.*|$)/, authorization.requiresLogin, redirectToRoot
