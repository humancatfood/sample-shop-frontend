'use strict';

/**
 * @ngdoc function
 * @name sampleShopFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sampleShopFrontendApp
 */

(function (angular) {

    var app = angular.module('app');

    app.controller('AboutCtrl', ['$scope', function ($scope) {

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

    }]);

}(window.angular));
