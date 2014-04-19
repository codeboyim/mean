
users = require '../../api/users'
passport = require('passport')

module.exports = (app, passport)->

	app.post '/api/users', users.create
	app.post '/api/users/check', users.checkIfAvailable
	app.post '/api/users/session', users.session
	app.post '/api/users/signout', users.signout