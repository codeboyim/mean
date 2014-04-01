'use strict';
window.routingConfig = {};

(function(exports) {
  exports.userRoles = ['public', 'user', 'admin'];
  exports.accessLevels = {
    'public': '*',
    'anon': ['public'],
    'user': ['user', 'admin'],
    'admin': ['admin']
  };
  return exports;
})(typeof exports !== "undefined" && exports !== null ? exports : window.routingConfig);
