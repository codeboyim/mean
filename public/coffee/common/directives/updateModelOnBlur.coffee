'use strict'
# ngModelOptions available for better functionality since 1.3.0-beta
# credit to http://stackoverflow.com/questions/14340555/angularjs-updating-an-input-with-a-dynamic-ng-model-blurs-on-each-key-press
angular.module('mean').directive(
	'updateModelOnBlur'
	()->
		restrict: 'A'
		require: 'ngModel'
		priority: 100 #make unbind work
		link: (scope, elm, attr, ngModelCtrl) ->

			if attr.type is 'radio' or attr.type is 'checkbox'
				return

			elm.unbind('input').unbind('keydown').unbind('change')

			updateModel = ()->
				scope.$apply ()->
					ngModelCtrl.$setViewValue elm.val()

			elm.bind 'blur', updateModel

			if elm[0].nodeName.toLowerCase() isnt 'textarea'
				elm.bind 'keydown', (e)->
					e.which is 13 && updateModel()
)