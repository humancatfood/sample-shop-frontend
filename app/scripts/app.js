'use strict';

/**
 * @ngdoc overview
 * @name sampleShopFrontendApp
 * @description
 * # sampleShopFrontendApp
 *
 * Main module of the application.
 */

(function (angular) {

    var app = angular.module('app', [ 'ngAnimate',
                                      'ngCookies',
                                      'ngSanitize',
                                      'ngTouch',
                                      'ui.router' ]);

    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

         $stateProvider.state('main', {
            url: '/',
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

}(window.angular));
