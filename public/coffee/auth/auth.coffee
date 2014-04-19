'use strict'

angular.module('mean').controller('AuthController', [
	'$http'
	'$location'
	'$rootScope'
	'$scope'
	'$state'
	'$window'
	'Auth'
	($http, $location, $rootScope, $scope, $state, $window, Auth)->
		screen = $window.screen;

		$window.fbCallback = (user)->
			if user
				angular.extend Auth.currentUser, user
				$state.go 'home'

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

		$scope.fb_login = ()->
			left=screen.width/2-250
			top=screen.height/2-150
			winfb=$window.open '/auth/facebook', 'FB_Dialog', "left=#{ left }, top=#{ top }, width=500,height=300,chrome=yes,centerscreen=yes,location=no"
			null
		null
])