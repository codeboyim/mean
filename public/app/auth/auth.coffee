'use strict'

angular.module('mean').controller('AuthController', [
	'$scope'
	'$http'
	'$rootScope'
	'$location'
	'Auth'
	($scope, $http, $rootScope, $location, Auth)->
		$scope.login = (user) ->
			Auth.login(user
				()->
					$location.path '/'
				()->
					$scope.error = 'Failed to login'
			)
		
		null
])