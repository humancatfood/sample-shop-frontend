'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleShopFrontendApp
 */
(function (angular) {

    var app = angular.module('app');

    app.controller('MainCtrl', ['$scope', '$state', 'productsService', '$stateParams', function ($scope, $state, productsService, $stateParams) {

        productsService.getAllProducts().then(function (products) {

            $scope.products = products;

        }, function (error) {

            $scope.error = error;

        });


        $scope.showProduct = function (productID) {
            $state.go('product-full', {productID: productID});
        };


        $scope.productID = $stateParams.productID;

    }]);

}(window.angular));
