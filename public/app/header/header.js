'use strict';
angular.module('mean').controller('HeaderController', [
  '$scope', '$state', 'Auth', function($scope, $state, Auth) {
    $scope.user = Auth.currentUser;
    $scope.authenticated = Auth.isLoggedIn;
    $scope.signout = function() {
      return Auth.signout(function() {
        return $state.go('home');
      }, function() {
        return console.log('error');
      });
    };
    return null;
  }
]);
