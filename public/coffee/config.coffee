'use strict'

#Setting HTML5 Location Mode
angular.module('mean').config ['$locationProvider',

    ($locationProvider) ->

        $locationProvider.hashPrefix('!').html5Mode true

]

angular.module('mean').run [
    '$rootScope'
    '$window'
    '$state'
    '$location'
    'Auth'
    ($rootScope, $window, $state, $location, Auth) ->
        
        $rootScope.$on '$stateChangeStart',
            (event, toState, toParams, fromState) ->
                
                if not Auth.authorize toState.data.accessLevel
                    console.log 'unauthorized access'
                    event.preventDefault()

                    if fromState.url is '^'
                        if Auth.isLoggedIn()
                            $state.go 'home'
                        else
                            $state.go 'auth.signin'

                if ['auth.signin', 'auth.signup'].indexOf(toState.name) isnt -1 and fromState.url is '^' and Auth.isLoggedIn()
                    event.preventDefault()
                    $state.go 'home'

        $rootScope.currentUser = Auth.currentUser
]
