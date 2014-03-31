'use strict'

angular.module('mean').factory('Auth'
	[
		'$http'
		'Session'
		($http, Session) ->
			login: (credentials) ->
				$http.post('/users/session', credentials)
					.then (profile)->
						Session.create(profile)

			isAuthenticated: ()->
				Session.profile isnt null


			isAuthorized: (authorizedRoles) ->
				isAuthorized = false

				authorizedRoles = switch
					when angular.isString authorizedRoles then [authorizedRoles]
					when angular.isArray authorizedRoles then authorizedRoles
					else []

				if Session.profile? and Session.profile.roles?
					isAuthorized = switch
						when authorizedRoles.indexOf('?') isnt -1 then true
						when angular.isString(Session.profile.roles) then authorizedRoles.indexOf(Session.profile.roles) isnt -1
						when angular.isArray Session.profile.roles then _.intersection(authorizedRoles, Session.profile.roles).length isnt 0
						else false
				else
					isAuthorized = authorizedRoles.indexOf('*') isnt -1
					
				isAuthorized
	]
)