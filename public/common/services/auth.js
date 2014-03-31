'use strict';
angular.module('mean').factory('Auth', [
  '$http', 'Session', function($http, Session) {
    return {
      login: function(credentials) {
        return $http.post('/users/session', credentials).then(function(profile) {
          return Session.create(profile);
        });
      },
      isAuthenticated: function() {
        return Session.profile !== null;
      },
      isAuthorized: function(authorizedRoles) {
        var isAuthorized;
        isAuthorized = false;
        authorizedRoles = (function() {
          switch (false) {
            case !angular.isString(authorizedRoles):
              return [authorizedRoles];
            case !angular.isArray(authorizedRoles):
              return authorizedRoles;
            default:
              return [];
          }
        })();
        if ((Session.profile != null) && (Session.profile.roles != null)) {
          isAuthorized = (function() {
            switch (false) {
              case authorizedRoles.indexOf('?') === -1:
                return true;
              case !angular.isString(Session.profile.roles):
                return authorizedRoles.indexOf(Session.profile.roles) !== -1;
              case !angular.isArray(Session.profile.roles):
                return _.intersection(authorizedRoles, Session.profile.roles).length !== 0;
              default:
                return false;
            }
          })();
        } else {
          isAuthorized = authorizedRoles.indexOf('*') !== -1;
        }
        return isAuthorized;
      }
    };
  }
]);
