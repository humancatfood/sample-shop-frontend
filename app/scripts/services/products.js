'use strict';
(function (angular, _) {

    var app = angular.module('app');

    // one service to rule them all ..
    app.service('productsService', function ($http, $q, $rootScope) {

        // Product object
        function Product(id, data) {
            this.id = id;
            this.name = data.name || '';
            this.dateAdded = data.dateAdded;
            this.description = data.description || '';

            this.imgSrc = data.imgSrc || null;
            this.imgAlt = data.imgAlt || this.name;
            this.imgTitle = data.imgTitle || this.name;
        }


        var productsPromise = null;
        function fetchProducts()
        {

            if (!productsPromise)
            {

                productsPromise = $http.get($rootScope.dataUrl).then(function (response) {

                    try
                    {
                        return _.reduce(response.data, function (result, datum, id) {
                            result[id] = new Product(id, datum);
                            return result;
                        }, {});
                    }
                    catch (error)
                    {
                        return $q.reject(error);
                    }

                }, function (response) {

                    return $q.reject('Error ' + response.status + ': ' + response.data);

                });

            }

            return productsPromise;

        }


        this.getAllProducts = function () {

            return fetchProducts().then(function (products) {

                return _.values(products);

            });

        };


        this.getProduct = function (productID) {

            return fetchProducts().then(function (products) {

                if (products[productID])
                {
                    return products[productID];
                }
                else
                {
                    return $q.reject('Error 404: product id ' + productID + ' not found');
                }

            });

        };


        this.addProduct = function (/*newProduct*/) {

        };


        this.updateProduct = function (/*productID, newProduct*/) {

        };

        this.deleteProduct = function (/*productID*/) {

        };


    });


})(window.angular, window._);

