'use strict'

angular.module('mean').controller('AuthController', [
	'$scope'
	'$http'
	'$location'
	'Auth'
	($scope, $http, $location, Auth, $interval)->

		$scope.isEmailUnique = (val) ->
			Auth.checkIfAvailable {email:val}

		$scope.isUsernameUnique = (val)->
			Auth.checkIfAvailable {username:val}

		$scope.login = (user) ->
			Auth.login(user
				()->
					$location.path '/'
				(data)->
					$scope.error = data?.error ? 'login failed'
					null
			)


		$scope.signup = (user) ->
			$scope.submitted=true

			if $scope.form.$valid
				Auth.register(user
					()->
						$location.path '/'
					(data)->
						$scope.error = data?.error ? 'signup failed'
						null
				)

		null
])