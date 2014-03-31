'use strict'

angular.module('mean').controller('AuthController', [
	'$scope'
	'$http'
	'$rootScope'
	'Auth'
	'AUTH_EVENTS'
	($scope, $http, $rootScope, Auth, AUTH_EVENTS)->
		$scope.login = (credentials) ->
			Auth.login(credentials).then(
				()->
					$rootScope.$broadcast AUTH_EVENTS.loginSuccess
				()->
					$scope.error = 'wrong username or password'
					$rootScope.$broadcast AUTH_EVENTS.loginFailed
			)

		null
])