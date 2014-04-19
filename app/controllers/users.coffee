
passport = require 'passport'

exports.authCallback = (req, res) ->
	passport.authenticate(
		'facebook'
		(err, user, info)->
			if user? and typeof user is 'object'
				req.logIn user, (err)->
					if err
						return res.render 500, error: err

					res.render 'authCallback', user: JSON.stringify(user)
			else
				res.render 'authCallback', user: false
			null
	) req, res