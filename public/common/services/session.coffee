'use strict'

angular.module('mean').factory(
	'Session'
	()->
		session = {profile: {}}
		session.create = (profile)->
			this.profile = profile
			profile
		session.destroy = () ->
			this.profile = null
			null
		session
)