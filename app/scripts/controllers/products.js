'use strict';

/**
 * @ngdoc function
 * @name app.controller:productFullCtrl
 * @description
 * # productFullCtrl
 * controller for the full product view. Turns the modal on and off and manages updating products
 */
(function (angular, _, $) {

    var app = angular.module('app');


    app.directive('productPreview', function () {

        return {
            replace: true,
            templateUrl: 'views/product-preview.html'
        };

    });


    app.directive('productFull', function () {

        return {
            replace: true,
            templateUrl: 'views/product-view.html',
            controller: 'productFullCtrl'
        };

    });

    app.controller('productFullCtrl', function ($scope, $element, $state, productsService) {

        var $el = $($element);

        //
        $el.on('hidden.bs.modal', function () {
            $state.go('main');
        });


        $scope.editProduct = function () {

        };


        $scope.saveProduct = function () {

        };


        $scope.$watch('productID', function (productID) {

            if (productID)
            {
                $scope.loading = true;
                $el.modal({
                    show: true
                });

                productsService.getProduct(productID).then(function (product) {

                    $scope.loading = false;
                    $scope.product = product;

                });
            }
            else
            {
                $el.modal({
                    show: false
                });
            }

        });

    });


})(window.angular, window._, window.$);

