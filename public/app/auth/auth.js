'use strict';
angular.module('mean').controller('AuthController', [
  '$scope', '$http', '$rootScope', '$location', 'Auth', function($scope, $http, $rootScope, $location, Auth) {
    $scope.login = function(user) {
      return Auth.login(user, function() {
        return $location.path('/');
      }, function() {
        return $scope.error = 'Failed to login';
      });
    };
    return null;
  }
]);
