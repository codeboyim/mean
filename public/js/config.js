'use strict';
angular.module('mean').config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider.state('all articles', {
      url: '/articles',
      templateUrl: 'views/articles/list.html',
      anonymous: true
    }).state('create article', {
      url: '/articles/create',
      templateUrl: 'views/articles/create.html'
    }).state('edit article', {
      url: '/articles/:articleId/edit',
      templateUrl: 'views/articles/edit.html'
    }).state('article by id', {
      url: '/articles/:articleId',
      templateUrl: 'views/articles/view.html'
    }).state('home', {
      url: '/',
      templateUrl: 'views/index.html',
      anonymous: true
    });
  }
]);

angular.module('mean').config([
  '$locationProvider', function($locationProvider) {
    return $locationProvider.hashPrefix('!');
  }
]);

angular.module('mean').run([
  'Global', '$rootScope', '$state', function(Global, $rootScope, $state) {
    return $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!Global.authenticated && !toState.anonymous) {
        event.preventDefault();
        return $state.transitionTo('home');
      }
    });
  }
]);
