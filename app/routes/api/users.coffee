
users = require '../../api/users'

module.exports = (app, passport)->

	app.post '/api/users', users.create
	app.post '/api/users/check', users.checkIfAvailable
	app.post '/api/users/session', users.session
	app.get '/api/users/signout', users.signout
