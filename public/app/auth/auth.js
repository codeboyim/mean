'use strict';
angular.module('mean').controller('AuthController', [
  '$scope', '$http', '$rootScope', 'Auth', 'AUTH_EVENTS', function($scope, $http, $rootScope, Auth, AUTH_EVENTS) {
    $scope.login = function(credentials) {
      return Auth.login(credentials).then(function() {
        return $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function() {
        $scope.error = 'wrong username or password';
        return $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
    return null;
  }
]);
