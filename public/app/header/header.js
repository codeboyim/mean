'use strict';
angular.module('mean').controller('HeaderController', [
  '$scope', 'Auth', function($scope, Auth) {
    $scope.user = Auth.currentUser;
    $scope.authenticated = Auth.isLoggedIn;
    return null;
  }
]);
