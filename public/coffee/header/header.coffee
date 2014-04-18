'use strict'

angular.module('mean').controller('HeaderController',
	[
		'$scope'
		'$state'
		'Auth'
		($scope, $state, Auth)->
			$scope.user = Auth.currentUser
			$scope.authenticated = Auth.isLoggedIn

			$scope.signout = ()->
                Auth.signout(
                    ()->
                        $state.go 'home'
                    ()->
                        console.log 'error'
                )
			null
	]
)