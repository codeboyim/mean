'use strict';
angular.module('mean').factory('Session', function() {
  var session;
  session = {
    profile: {}
  };
  session.create = function(profile) {
    this.profile = profile;
    return profile;
  };
  session.destroy = function() {
    this.profile = null;
    return null;
  };
  return session;
});
