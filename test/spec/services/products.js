'use strict';

/*global it: true*/
/*global beforeEach: true*/
/*global describe: true*/
/*global module: true*/
/*global inject: true*/
/*global expect: true*/

describe('Service: productsService', function () {

    // load the controller's module
    beforeEach(module('app'));


    var dataUrl = '/data/test-products.json';
    var productsService, scope, productsPromise;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_productsService_, $rootScope, $http) {
        scope = $rootScope.$new();

        $rootScope.dataUrl = dataUrl;
        productsPromise = $http.get(dataUrl).then(function (response) { return response.data; });
        productsService = _productsService_;
    }));


    it('should fetch a list products', function () {

        productsPromise.then(function (testProducts) {

            productsService.getProducts().then(function (products) {

                // should be an array
                expect(typeof products).toBe('object');
                expect(products.length).toBe(Object.keys(testProducts).length);

            });

        });

    });


    it('should fetch single products', function () {


        productsPromise.then(function (products) {

            var testId = 'product001';
            var testProduct = products[testId];
            productsService.getProduct(testId).then(function (product) {

                // should be an array
                expect(typeof product).toBe('object');

                expect(product.name).toBe(testProduct.name);
                expect(product.dateAdded).toBe(testProduct.dateAdded);
                expect(product.imgSrc).toBe(testProduct.imgSrc);
                expect(product.description).toBe(testProduct.description);

            });

        });

    });

});
