'use strict';

/**
 * @ngdoc function
 * @name sampleShopFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleShopFrontendApp
 */

(function (angular) {

    var app = angular.module('app');

    app.controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });

}(window.angular));
