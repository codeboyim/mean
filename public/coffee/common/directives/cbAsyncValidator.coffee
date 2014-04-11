'use strict'

angular.module('mean').directive('cbAsyncValidator'
	[
		()->
			restrict: 'A'
			require: 'ngModel'
			scope: {
				cbAsyncValidator:"="
			}
			link:(scope, elm, attrs, ctrl)->
				ctrl.$parsers.unshift (newVal)->
					scope.cbAsyncValidator(newVal)
						.success(
							(data)->								
								ctrl.$setValidity 'cbAsyncValid', data.result
						)						

					newVal

	]
)