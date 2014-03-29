'use strict'

#Setting up route
angular.module('mean').config [
        '$stateProvider'
        ($stateProvider) ->
            # For unmatched routes:
            #$urlRouterProvider.otherwise '/'

            # states for my app
            $stateProvider
                # states for articles
                .state('all articles'
                    url: '/articles',templateUrl: 'app/articles/views/list.html',anonymous: true
                )
                .state('create article'
                    url: '/articles/create', templateUrl: 'app/articles/views/create.html'
                )
                .state('edit article'
                    url: '/articles/:articleId/edit', templateUrl: 'app/articles/views/edit.html'
                )
                .state('article by id'
                    url: '/articles/:articleId', templateUrl: 'app/articles/views/view.html'
                )
                #states for admin
                .state('admin'
                    url: '/admin', templateUrl: 'app/admin/views/default.html'
                )
                .state('home'
                    url: '/', templateUrl: 'app/home/views/index.html', anonymous: true
                )
    
]

#Setting HTML5 Location Mode
angular.module('mean').config ['$locationProvider',

    ($locationProvider) ->

        $locationProvider.hashPrefix('!').html5Mode true

]

angular.module('mean').run ['Global', '$rootScope','$window',
    
    (Global, $rootScope, $window) ->
        
        $rootScope.$on '$stateChangeStart',

            (event, toState) ->

                if !Global.authenticated and !toState.anonymous
                    event.preventDefault()
                    $window.location.href = '/signin'
                    null
]
