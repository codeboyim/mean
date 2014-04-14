'use strict';
angular.module('mean').controller('AuthController', [
  '$scope', '$http', '$rootScope', '$location', 'Auth', function($scope, $http, $rootScope, $location, Auth) {
    $scope.isEmailUnique = function(val) {
      return Auth.checkIfAvailable({
        email: val
      });
    };
    $scope.isUsernameUnique = function(val) {
      return Auth.checkIfAvailable({
        username: val
      });
    };
    $scope.login = function(user) {
      return Auth.login(user, function() {
        return $location.path('/');
      }, function() {
        $scope.error = 'login failed';
        return null;
      });
    };
    $scope.signup = function(user) {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        return Auth.register(user, function() {
          return $location.path('/');
        }, function(err) {
          $scope.error = err || 'request failed';
          return null;
        });
      }
    };
    return null;
  }
]);
