'use strict'
window.routingConfig={}
((exports)->

	exports.userRoles = ['public', 'user','admin']

	exports.accessLevels = {
		'public': '*'
		'anon': ['public']
		'user': ['user', 'admin']
		'admin': ['admin']
	}

	exports

)(exports ? window.routingConfig)
