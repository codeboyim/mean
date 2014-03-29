'use strict';
angular.module('mean').config([
  '$stateProvider', function($stateProvider) {
    return $stateProvider.state('all articles', {
      url: '/articles',
      templateUrl: 'app/articles/views/list.html',
      anonymous: true
    }).state('create article', {
      url: '/articles/create',
      templateUrl: 'app/articles/views/create.html'
    }).state('edit article', {
      url: '/articles/:articleId/edit',
      templateUrl: 'app/articles/views/edit.html'
    }).state('article by id', {
      url: '/articles/:articleId',
      templateUrl: 'app/articles/views/view.html'
    }).state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/views/default.html'
    }).state('home', {
      url: '/',
      templateUrl: 'app/home/views/index.html',
      anonymous: true
    });
  }
]);

angular.module('mean').config([
  '$locationProvider', function($locationProvider) {
    return $locationProvider.hashPrefix('!').html5Mode(true);
  }
]);

angular.module('mean').run([
  'Global', '$rootScope', '$window', function(Global, $rootScope, $window) {
    return $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!Global.authenticated && !toState.anonymous) {
        event.preventDefault();
        $window.location.href = '/signin';
        return null;
      }
    });
  }
]);
