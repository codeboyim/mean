'use strict';
angular.module('mean').config([
  '$locationProvider', function($locationProvider) {
    return $locationProvider.hashPrefix('!').html5Mode(true);
  }
]);

angular.module('mean').run([
  '$rootScope', '$window', '$state', '$location', 'Auth', function($rootScope, $window, $state, $location, Auth) {
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
      if (['auth.signin', 'auth.signup'].indexOf(toState.name) !== -1 && fromState.url === '^' && Auth.isLoggedIn()) {
        event.preventDefault();
        return $state.go('home');
      }
    });
    return $rootScope.currentUser = Auth.currentUser;
  }
]);
