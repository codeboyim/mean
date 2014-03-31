'use strict';
angular.module('mean').constant('ACCESS_LEVELS', {
  "public": '*',
  user: '?',
  admin: ['admin']
});
