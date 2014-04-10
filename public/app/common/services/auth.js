'use strict';
angular.module('mean').factory('Auth', [
  '$http', '$window', function($http, $window) {
    var accessLevels, currentUser, isdirty, isemail, isrequired, isvalid, listener, scope, userRoles, validation;
    accessLevels = routingConfig.accessLevels;
    userRoles = routingConfig.userRoles;
    currentUser = $window.user || {
      username: '',
      role: userRoles["public"]
    };
    validation = {};
    scope = {};
    isdirty = function(name) {
      return (scope.form != null) && (scope.form[name].$dirty || !!scope.submitted);
    };
    isvalid = function(name) {
      return isdirty(name) && scope.form[name].$valid;
    };
    isrequired = function(name) {
      return isdirty(name) && scope.form[name].$error.$required;
    };
    isemail = function(name) {
      return isdirty(name) && scope.form[name].$error.$email;
    };
    listener = function() {
      var form, name, submitted, _i, _len, _ref;
      form = scope.form;
      submitted = !!scope.submitted;
      if (form === null || typeof form === 'undefined') {
        return null;
      }
      _ref = ['name', 'email', 'username', 'password'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        validation[name] = {
          dirty: isdirty(name),
          valid: isvalid(name),
          invalid: isdirty(name) && !isvalid(name),
          required: isrequired(name)
        };
      }
      validation['email'].email = isemail('email');
      return null;
    };
    return {
      login: function(user, success, error) {
        return $http.post('/users/session', user).success(function(res) {
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
      userRoles: userRoles,
      validate: function(_scope_) {
        scope = _scope_;
        scope.$watch('user', listener, true);
        scope.$watch('submitted', listener, true);
        return validation;
      }
    };
  }
]);
