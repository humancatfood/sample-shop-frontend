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

    app.controller('MainCtrl', function ($scope, productsService) {

        productsService.getAllProducts().then(function (products) {

            $scope.products = products;

        }, function (error) {

            $scope.error = error;

        });

    });

}(window.angular));
