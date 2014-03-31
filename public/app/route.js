'use strict';
angular.module('mean').config([
  '$stateProvider', 'ACCESS_LEVELS', function($stateProvider, ACCESS_LEVELS) {
    return $stateProvider.state('all articles', {
      url: '/articles',
      templateUrl: 'app/articles/views/list.html',
      data: {
        accessLevel: ACCESS_LEVELS["public"]
      }
    }).state('create article', {
      url: '/articles/create',
      templateUrl: 'app/articles/views/create.html',
      data: {
        accessLevel: ACCESS_LEVELS.user
      }
    }).state('edit article', {
      url: '/articles/:articleId/edit',
      templateUrl: 'app/articles/views/edit.html',
      data: {
        accessLevel: ACCESS_LEVELS.user
      }
    }).state('article by id', {
      url: '/articles/:articleId',
      templateUrl: 'app/articles/views/view.html',
      data: {
        accessLevel: ACCESS_LEVELS.user
      }
    }).state('auth', {
      abstract: true,
      templateUrl: 'app/auth/views/auth.html',
      data: {
        accessLevel: ACCESS_LEVELS["public"]
      }
    }).state('auth.signin', {
      url: '/signin',
      templateUrl: 'app/auth/views/signin.html',
      controller: 'AuthController',
      data: {
        accessLevel: ACCESS_LEVELS["public"]
      }
    }).state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/views/default.html',
      data: {
        accessLevel: ACCESS_LEVELS.admin
      }
    }).state('home', {
      url: '/',
      templateUrl: 'app/home/views/index.html',
      data: {
        accessLevel: ACCESS_LEVELS["public"]
      }
    });
  }
]);
