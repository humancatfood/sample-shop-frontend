'use strict';
(function (angular, _) {

    var app = angular.module('app');


    app.directive('productPreview', function () {

        return {
            replace: true,
            templateUrl: 'views/product-preview.html'
        };

    });



})(window.angular, window._);

