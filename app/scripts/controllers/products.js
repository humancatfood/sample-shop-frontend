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
            templateUrl: 'views/product-full.html',
            controller: 'productFullCtrl'
        };

    });


    app.controller('productFullCtrl', function ($scope, $element, $state, productsService) {

        var $el = $($element);

        function showModal()
        {
            $el.modal('show');
        }

        function hideModal()
        {
            $el.modal('hide');
        }

        $el.on('hidden.bs.modal', function () {
            $scope.editMode = false;
            $scope.product = null;
            $scope.productID = null;
            $scope.dummy = null;
            $state.go('main');
        });


        $scope.edit = function () {

            $scope.dummy = productsService.getDummy($scope.product);
            $scope.editMode = true;

        };


        $scope.save = function () {

            productsService.updateProduct($scope.product, $scope.dummy);
            productsService.saveProduct($scope.product);
            $scope.editMode = false;
            $scope.dummy = null;
            $scope.updateProducts();

        };


        $scope.delete = function () {

            productsService.deleteProduct($scope.product);
            hideModal();
            $scope.updateProducts();

        };


        $scope.cancel = function () {

            $scope.dummy = null;
            $scope.editMode = false;

            if (!$scope.editMode)
            {
                $scope.product = null;
                $scope.productID = null;
                hideModal();
            }

        };


        $scope.$watch('productID', function (productID) {

            if (productID)
            {
                $scope.loading = true;

                showModal();

                productsService.getProduct(productID).then(function (product) {

                    $scope.loading = false;
                    $scope.product = product;

                });
            }

        });


        $scope.$watch('product', function (product) {

            if (product)
            {
                showModal();

                if (product.isDummy)
                {
                    $scope.edit();
                }
            }

        });


        $scope.$watch('dummy', function (dummy) {

            if (dummy)
            {
                $scope.dummyHasChanged = !productsService.productsEqual(dummy, $scope.product);
                $scope.dummyIsValid = !!productsService.validateProduct(dummy).ok;
            }

        }, true);

    });


})(window.angular, window._, window.$);

