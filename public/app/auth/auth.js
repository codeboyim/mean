'use strict';
angular.module('mean').controller('AuthController', [
  '$http', '$location', '$rootScope', '$scope', '$state', '$window', 'Auth', function($http, $location, $rootScope, $scope, $state, $window, Auth) {
    var screen;
    screen = $window.screen;
    $window.fbCallback = function(user) {
      if (user) {
        angular.extend(Auth.currentUser, user);
        return $state.go('home');
      }
    };
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
    $scope.fb_login = function() {
      var left, top, winfb;
      left = screen.width / 2 - 250;
      top = screen.height / 2 - 150;
      winfb = $window.open('/auth/facebook', 'FB_Dialog', "left=" + left + ", top=" + top + ", width=500,height=300,chrome=yes,centerscreen=yes,location=no");
      return null;
    };
    return null;
  }
]);
