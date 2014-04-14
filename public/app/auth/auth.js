'use strict';
angular.module('mean').controller('AuthController', [
  '$scope', '$http', '$rootScope', '$location', 'Auth', function($scope, $http, $rootScope, $location, Auth) {
    $scope.isEmailUnique = function(email) {
      return Auth.checkIfAvailable({
        email: email
      });
    };
    $scope.login = function(user) {
      return Auth.login(user, function() {
        return $location.path('/');
      }, function() {
        $scope.error = 'Failed to login';
        return null;
      });
    };
    $scope.signup = function(user) {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        return Auth.register(user, function() {
          return $location.path('/');
        }, function(err) {
          $scope.error = err;
          return null;
        });
      }
    };
    return null;
  }
]);
