'use strict';
angular.module('mean').config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var access;
    $urlRouterProvider.otherwise('/404');
    access = routingConfig.accessLevels;
    return $stateProvider.state('all articles', {
      url: '/articles',
      templateUrl: 'app/articles/views/list.html',
      data: {
        accessLevel: access["public"]
      }
    }).state('create article', {
      url: '/articles/create',
      templateUrl: 'app/articles/views/create.html',
      data: {
        accessLevel: access.user
      }
    }).state('edit article', {
      url: '/articles/:articleId/edit',
      templateUrl: 'app/articles/views/edit.html',
      data: {
        accessLevel: access.user
      }
    }).state('article by id', {
      url: '/articles/:articleId',
      templateUrl: 'app/articles/views/view.html',
      data: {
        accessLevel: access.user
      }
    }).state('auth', {
      abstract: true,
      templateUrl: 'app/auth/views/auth.html',
      controller: 'AuthController',
      data: {
        accessLevel: access["public"]
      }
    }).state('auth.signin', {
      url: '/signin',
      templateUrl: 'app/auth/views/signin.html',
      controller: 'AuthController',
      data: {
        accessLevel: access["public"]
      }
    }).state('auth.signup', {
      url: '/signup',
      templateUrl: 'app/auth/views/signup.html',
      controller: 'AuthController',
      data: {
        accessLevel: access["public"]
      }
    }).state('signout', {
      url: '/signout',
      data: {
        accessLevel: access["public"]
      }
    }).state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/views/default.html',
      data: {
        accessLevel: access.admin
      }
    }).state('settings', {
      url: '/settings',
      templateUrl: 'app/settings/views/settings.html',
      data: {
        accessLevel: access.user
      }
    }).state('home', {
      url: '/',
      templateUrl: 'app/home/views/index.html',
      data: {
        accessLevel: access["public"]
      }
    }).state('404', {
      url: '/404',
      templateUrl: 'app/404.html',
      data: {
        accessLevel: access["public"]
      }
    });
  }
]);
