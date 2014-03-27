'use strict'

authorization = require('./middlewares/authorization')

module.exports = (app, passport) ->

	admin = require('../controllers/admin.coffee')

	app.get /^\/admin(\/.*|$)/, authorization.requiresLogin, admin.render