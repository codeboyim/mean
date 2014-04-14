'use strict'

angular.module('mean').controller('AuthController', [
	'$scope'
	'$http'
	'$rootScope'
	'$location'
	'Auth'
	($scope, $http, $rootScope, $location, Auth)->

		$scope.isEmailUnique = (email) ->
			Auth.checkIfAvailable {email:email}

		$scope.login = (user) ->
			Auth.login(user
				()->
					$location.path '/'
				()->
					$scope.error = 'Failed to login'
					null
			)

		$scope.signup = (user) ->
			$scope.submitted=true

			if $scope.form.$valid
				Auth.register(user
					()->
						$location.path '/'
					(err)->
						$scope.error = err
						null
				)

		null
])