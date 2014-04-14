'use strict';
angular.module('mean').factory('Auth', [
  '$http', '$window', function($http, $window) {
    var accessLevels, currentUser, userRoles;
    accessLevels = routingConfig.accessLevels;
    userRoles = routingConfig.userRoles;
    currentUser = $window.user || {
      username: '',
      role: userRoles["public"]
    };
    return {
      login: function(user, success, error) {
        return $http.post('/api/users/session', user).success(function(res) {
          angular.extend(currentUser, res);
          return success();
        }).error(error);
      },
      register: function(user, success, error) {
        return $http.post('/users', user).success(function(res) {
          angular.extend(currentUser, res);
          return success();
        }).error(error);
      },
      checkIfAvailable: function(user) {
        return $http.post('/api/users/check', user);
      },
      isLoggedIn: function(user) {
        if (user === null) {
          user = currentUser;
        }
        return user.role !== routingConfig.userRoles["public"];
      },
      authorize: function(accessLevel, role) {
        if (role === null) {
          role = currentUser.role;
        }
        return accessLevel === '*' || accessLevel.indexOf(role) !== -1;
      },
      accessLevels: accessLevels,
      userRoles: userRoles
    };
  }
]);
