'use strict';
angular.module('mean').config([
  '$locationProvider', function($locationProvider) {
    return $locationProvider.hashPrefix('!').html5Mode(true);
  }
]);

angular.module('mean').run([
  'Global', '$rootScope', '$window', 'Session', 'Auth', 'AUTH_EVENTS', function(Global, $rootScope, $window, Session, Auth, AUTH_EVENTS) {
    return $rootScope.$on('$stateChangeStart', function(event, next) {
      var authorizedRoles;
      authorizedRoles = next.data.accessLevel;
      if (!Auth.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (Auth.isAuthenticated()) {
          return $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          return $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });
  }
]);
