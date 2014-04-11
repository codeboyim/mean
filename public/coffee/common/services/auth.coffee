'use strict'

angular.module('mean').factory('Auth'
	[
		'$http'
		'$window'
		($http, $window) ->
			accessLevels = routingConfig.accessLevels
			userRoles = routingConfig.userRoles
			currentUser = $window.user || { username: '', role: userRoles.public }
			validation = {}
			scope = {}

			isdirty = (name)->
				scope.form? && (scope.form[name].$dirty || !!scope.submitted)

			isvalid = (name)->
				isdirty(name) && scope.form[name].$valid

			isrequired = (name)->
				isdirty(name) && scope.form[name].$error.required

			isemail = (name)->
				isdirty(name) && scope.form[name].$error.email

			listener = ()->
				form = scope.form
				submitted = !!scope.submitted

				if form is null or typeof form is 'undefined'
					return null

				for name in ['name', 'email', 'username', 'password']
					validation[name] =
						dirty: isdirty name
						valid: isvalid name
						invalid: isdirty(name) and not isvalid name
						required: isrequired name
				
				validation['email'].email = isemail 'email'
				null


			login: (user, success, error) ->
				$http
					.post('/users/session', user)
					.success(
						(res)->
							angular.extend(currentUser, res)
							success()
					)
					.error(error)

			register: (user, success, error) ->
				$http
					.post('/users', user)
					.success(
						(res)->
							angular.extend(currentUser, res)
							success()
					)
					.error(error)

			checkIfAvailable: (user) ->
				$http
					.post '/users/check', user

			isLoggedIn: (user)->
				
				if user == null
					user = currentUser

				user.role isnt routingConfig.userRoles.public
					
						
			authorize: (accessLevel, role)->
				
				if role == null
					role = currentUser.role

				accessLevel is '*' or accessLevel.indexOf(role) isnt -1

			accessLevels: accessLevels
			userRoles:userRoles
			validate: (_scope_) ->
				scope = _scope_
				scope.$watch 'user', listener, true
				scope.$watch 'submitted', listener, true
				validation


	]
)