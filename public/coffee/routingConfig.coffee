'use strict'

((exports)->

	userRoles = 'public':0, 'user':1,'admin':2
	exports.userRoles = userRoles

	exports.accessLevels = {
		'public': '*'
		'anon': [userRoles.public]
		'user': [userRoles.user, userRoles.admin]
		'admin': [userRoles.admin]
	}

	exports

)(exports ? (window.routingConfig={}))
