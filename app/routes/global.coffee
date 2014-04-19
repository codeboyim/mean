'use strict'

authorization = require './middlewares/authorization'
passport = require 'passport'
users = require '../controllers/users'

redirectToRoot = (req, res, next) ->
	req.url = '/'
	next()

module.exports = (app)->

	#remove any trailing forward slash
	#app.get /^\/.*\/+$/, (req, res) ->
	#	res.redirect req.url.replace(/^(\/.*)(\/+)$/, '$1')
	app.get(
		'/auth/facebook'
		passport.authenticate 'facebook', {scope:['email', 'user_about_me'], display:'popup'}
	)
	app.get(
    	'/auth/facebook/callback'
    	users.authCallback
    )
	#AngularJS html5 routing handlers
	#app.get /^\/articles(\/(create|\w+(\/edit)?))?$/, redirectToRoot
	#app.get /^\/admin(\/(test)?|\/?)$/, authorization.requiresLogin, redirectToRoot
	app.get /^\/.*$/, redirectToRoot
