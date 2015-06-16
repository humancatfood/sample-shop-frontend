'use strict';

/**
 * @ngdoc overview
 * @name sampleShopFrontendApp
 * @description
 * # sampleShopFrontendApp
 *
 * Main module of the application.
 */

(function () {

    var app = angular.module('app', [ 'ngAnimate',
                                      'ngCookies',
                                      'ngRoute',
                                      'ngSanitize',
                                      'ngTouch' ]);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        });

        $routeProvider.when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

    }]);

}(window.angular));
