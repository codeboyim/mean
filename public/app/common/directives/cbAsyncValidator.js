'use strict';
angular.module('mean').directive('cbAsyncValidator', [
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        cbAsyncValidator: "="
      },
      link: function(scope, elm, attrs, ctrl) {
        return ctrl.$parsers.unshift(function(newVal) {
          scope.cbAsyncValidator(newVal).success(function(data) {
            return ctrl.$setValidity('cbAsyncValid', data.result);
          });
          return newVal;
        });
      }
    };
  }
]);
