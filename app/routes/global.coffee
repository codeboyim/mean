'use strict'

authorization = require './middlewares/authorization'

redirectToRoot = (req, res, next) ->
	req.url = '/'
	next()

module.exports = (app)->

	#remove any trailing forward slash
	#app.get /^\/.*\/+$/, (req, res) ->
	#	res.redirect req.url.replace(/^(\/.*)(\/+)$/, '$1')

	#AngularJS html5 routing handlers
	#app.get /^\/articles(\/(create|\w+(\/edit)?))?$/, redirectToRoot
	#app.get /^\/admin(\/(test)?|\/?)$/, authorization.requiresLogin, redirectToRoot
	app.get /^\/.*$/, redirectToRoot
