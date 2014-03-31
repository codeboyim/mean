'use strict'

#Setting HTML5 Location Mode
angular.module('mean').config ['$locationProvider',

    ($locationProvider) ->

        $locationProvider.hashPrefix('!').html5Mode true

]

angular.module('mean').run [
    'Global'
    '$rootScope'
    '$window'
    'Session'
    'Auth'
    'AUTH_EVENTS'
    (Global, $rootScope, $window, Session, Auth, AUTH_EVENTS) ->
        
        $rootScope.$on '$stateChangeStart',
            (event, next) ->
                authorizedRoles = next.data.accessLevel
                
                if not Auth.isAuthorized authorizedRoles
                    event.preventDefault()

                    if Auth.isAuthenticated()
                        $rootScope.$broadcast AUTH_EVENTS.notAuthorized
                    else
                        $rootScope.$broadcast AUTH_EVENTS.notAuthenticated
                
                
]
