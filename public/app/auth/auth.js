'use strict';
angular.module('mean').controller('AuthController', [
  '$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth, $interval) {
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
      }, function(data) {
        var _ref;
        $scope.error = (_ref = data != null ? data.error : void 0) != null ? _ref : 'login failed';
        return null;
      });
    };
    $scope.signup = function(user) {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        return Auth.register(user, function() {
          return $location.path('/');
        }, function(data) {
          var _ref;
          $scope.error = (_ref = data != null ? data.error : void 0) != null ? _ref : 'signup failed';
          return null;
        });
      }
    };
    return null;
  }
]);
