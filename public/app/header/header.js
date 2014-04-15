'use strict';
angular.module('mean').controller('HeaderController', [
  '$scope', 'Auth', function($scope, Auth) {
    $scope.user = Auth.currentUser;
    $scope.authenticated = Auth.isLoggedIn;
    $scope.menu = [
      {
        'title': 'Articles',
        'link': 'articles'
      }, {
        'title': 'Create New Article',
        'link': 'articles/create'
      }, {
        'title': 'Admin',
        'link': 'admin'
      }
    ];
    return null;
  }
]);
