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
            return $state.go('home');
          } else {
            return $state.go('auth.signin');
          }
        }
      }
    });
    return $rootScope.currentUser = Auth.currentUser;
  }
]);
