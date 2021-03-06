'use strict';

/**
 * @name productsService
 * @description
 *
 * Serves as interface for fetching data and data-model for products. Two functionalities that should probably
 * be split up.
 *
 */

(function (angular, _) {

    var app = angular.module('app');

    app.service('productsService', function ($http, $q, $rootScope) {

        var products = {};          // cache products by id
        var maxID = 0;              // running ID to assign to newly created products (should happen on the server really)


        // fetches products from the "backend" and caches them. Internal use only.
        var productsPromise = null;
        function fetchProducts()
        {

            if (!productsPromise)
            {

                productsPromise = $http.get($rootScope.dataUrl).then(function (response) {

                    try
                    {

                        products = _.reduce(response.data, function (result, datum) {

                            var id = parseInt(datum.id, 10);
                            if (!id)
                            {
                                throw new Error('invalid ID "' + datum.id + '"! Product IDs must be positive integers');
                            }
                            else if (result[id])
                            {
                                throw new Error('duplicate ID "' + datum.id + '" in data');
                            }
                            else
                            {
                                result[id] = {
                                    id: id,
                                    name: datum.name || '',
                                    description: datum.description || '',
                                    img: datum.img || null,
                                    dateAdded: datum.dateAdded
                                };
                                maxID = Math.max(maxID, id);
                                return result;
                            }

                        }, {});

                        return products;

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

        // pushes products to the back-end. Didn't get round to implement this, so products will reset on each page-reload
        function pushProducts()
        {
            // stub
        }


        /**
         * @name saveProduct
         * @description
         *
         * Saves a product into the products-object under a new id. If the product already has an id, it will overwrite
         * any existing entry.
         *
         */
        this.saveProduct = function (product) {

            var that = this;
            return $q(function(resolve, reject) {

                if (!that.validateProduct(product).ok)
                {
                    reject('Product invalid');
                }
                else if (!product.id)
                {
                    var id = ++maxID;

                    product.id = id;
                    product.dateAdded = +(Date.now());
                    product.isDummy = false;

                    products[id] = product;

                    pushProducts();
                    resolve('product, ' + product.name + 'added. id: ' + id);
                }
                else
                {
                    pushProducts();
                    resolve('product, ' + product.name + 'updated.');
                }

            });

        };


        /**
         * @name getAllProducts
         * @description
         *
         * Get a dictionary {id: product} of all the products available.
         *
         */
        this.getAllProducts = function () {

            return fetchProducts().then(function (products) {

                return _.values(products);

            });

        };


        /**
         * @name getProduct
         * @description
         *
         * Get a product by its id.
         *
         */
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


        /**
         * @name updateProduct
         * @description
         *
         * Updates pertinent fields (name, description, img) in oldProduct with corresponding values from newProduct.
         *
         */
        this.updateProduct = function (oldProduct, newProduct) {

            oldProduct.name = newProduct.name;
            oldProduct.description = newProduct.description;
            oldProduct.img = newProduct.img;

        };


        /**
         * @name deleteProduct
         * @description
         *
         * Deletes product.
         *
         */
        this.deleteProduct = function (product) {

            return $q(function(resolve, reject) {

                if (!products[product.id])
                {
                    reject('Error 404: Product not found');
                }
                else
                {
                    delete products[product.id];
                    pushProducts();
                    resolve();
                }

            });

        };


        /**
         * @name getDummy
         * @description
         *
         * Returns a new product, optionally initialised with values from the passed product.
         *
         */
        this.getDummy = function (product) {

            if (!!product)
            {
                return {
                    name: product.name,
                    description: product.description,
                    img: product.img,
                    isDummy: true
                };
            }
            else
            {
                return {
                    name: '',
                    description: '',
                    img: null,
                    isDummy: true
                };
            }

        };


        this.productsEqual = function (productA, productB) {

            return productA.name        === productB.name &&
                   productA.description === productB.description &&
                   productA.img         === productB.img;

        };


        this.validateProduct = function (product) {

            var errors = {};
            var name = product.name;
            var description = product.description;
            if (!name)
            {
                errors.name = 'Product name can\'t be empty';
            }
            else if (name.length < 3)
            {
                errors.name = 'Product name is too short (minimum 3 characters)';
            }
            else if (name.length > 25)
            {
                errors.name = 'Product name is too long (maximum 25 characters)';
            }

            if (!description)
            {
                errors.description = 'Product description can\'t be empty';
            }
            else if (description.length < 10)
            {
                errors.description = 'Product description is too short (minimum 10 characters)';
            }
            else if (description.length > 100)
            {
                errors.description = 'Product description is too long (maximum 100 characters)';
            }

            return {
                errors: errors,
                ok: !errors.name && !errors.description
            };

        };

    });


})(window.angular, window._);

