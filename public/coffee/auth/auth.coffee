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
				()->
					$scope.error = 'login failed'
					null
			)


		$scope.signup = (user) ->
			$scope.submitted=true

			if $scope.form.$valid
				Auth.register(user
					()->
						$location.path '/'
					(err)->
						$scope.error = err || 'request failed'
						null
				)

		null
])