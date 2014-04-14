'use strict';
angular.module('mean').config([
  '$locationProvider', function($locationProvider) {
    return $locationProvider.hashPrefix('!').html5Mode(true);
  }
]);

angular.module('mean').run([
  '$rootScope', '$window', '$state', 'Auth', function($rootScope, $window, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      if (!Auth.authorize(toState.data.accessLevel)) {
        console.log('unauthorized access');
        event.preventDefault();
        if (fromState.url === '^') {
          if (Auth.isLoggedIn()) {
            $state.go('home');
          } else {
            $state.go('auth.signin');
          }
        }
      }
      if (toState.name === 'signout') {
        return Auth.signout(function() {
          return $state.go('home');
        }, function() {
          return console.log('error');
        });
      }
    });
    return $rootScope.currentUser = Auth.currentUser;
  }
]);
