'use strict';
(function(exports) {
  var userRoles;
  userRoles = {
    'public': 0,
    'user': 1,
    'admin': 2
  };
  exports.userRoles = userRoles;
  exports.accessLevels = {
    'public': '*',
    'anon': [userRoles["public"]],
    'user': [userRoles.user, userRoles.admin],
    'admin': [userRoles.admin]
  };
  return exports;
})(typeof exports !== "undefined" && exports !== null ? exports : (window.routingConfig = {}));
