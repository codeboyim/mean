'use strict'

angular.module('mean').controller('HeaderController',
	[
		'$scope'
		'Auth'
		($scope, Auth)->
			$scope.user = Auth.currentUser
			$scope.authenticated = Auth.isLoggedIn

			null
	]
)