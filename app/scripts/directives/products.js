'use strict';
(function (angular, _) {

    var app = angular.module('app');


    app.controller('productPreviewCtrl', ['$scope', function ($scope) {

        console.log("productPreviewCtrl:", $scope);

    }]);

    // one service to rule them all ..
    app.directive('productPreview', function () {

        return {
            replace: true,
            scope: {
                product: '=productPreview'
            },
            templateUrl: 'views/product-preview.html',
            controller: 'productPreviewCtrl'
        };

    });


})(window.angular, window._);

