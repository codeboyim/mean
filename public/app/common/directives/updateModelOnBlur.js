'use strict';
angular.module('mean').directive('updateModelOnBlur', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    priority: 100,
    link: function(scope, elm, attr, ngModelCtrl) {
      var updateModel;
      if (attr.type === 'radio' || attr.type === 'checkbox') {
        return;
      }
      elm.unbind('input').unbind('keydown').unbind('change');
      updateModel = function() {
        return scope.$apply(function() {
          return ngModelCtrl.$setViewValue(elm.val());
        });
      };
      elm.bind('blur', updateModel);
      if (elm[0].nodeName.toLowerCase() !== 'textarea') {
        return elm.bind('keydown', function(e) {
          return e.which === 13 && updateModel();
        });
      }
    }
  };
});
