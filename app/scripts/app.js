'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 *
 * Main module of the application.
 */

(function (angular) {

    var app = angular.module('app', [ 'ngAnimate',
                                      'ngCookies',
                                      'ngSanitize',
                                      'ngTouch',
                                      'ui.router' ]);

    // main entry point
    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        // Uncomment this to do away with the ugly hash symbol in the url. That would need a better back-end first though,
        // that properly redirects urls like http://localhost:9000/product/product001 to index.html
        // $locationProvider.html5Mode(true);

        // default state for listing product-previews
        $stateProvider.state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        });

        // state for showing/editing a specific product
        $stateProvider.state('product-full', {
            url: '/product/:productID',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        });

        $stateProvider.state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        });

        $urlRouterProvider.otherwise('/');

    }]);


    // putting the data-url on the rootScope enables us to inject different urls for unit-testing
    app.run(['$rootScope', function ($rootScope) {
        $rootScope.dataUrl = '/data/products.json';
    }]);

}(window.angular));
