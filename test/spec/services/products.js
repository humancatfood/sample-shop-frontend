'use strict';

/*global it: true*/
/*global beforeEach: true*/
/*global afterEach: true*/
/*global describe: true*/
/*global module: true*/
/*global inject: true*/
/*global expect: true*/
/*global spyOn: true*/


var validDummyData = [
    {
        "name": "Name - 1",
        "id": 1,
        "dateAdded": 1434573538291,
        "img": "oiggojbgejbrerfeb",
        "description": "lorem ipsum dolor sit amet something something"
    }, {
        "name": "Name - 2",
        "id": 2,
        "dateAdded": 1434573538292,
        "img": "abcdknfdgfljbdf",
        "description": "lorem ipsum dolor sit amet something something"
    }, {
        "name": "Name - 3",
        "id": 3,
        "dateAdded": 1434573538293,
        "img": "ojbvfdopbvfdovbfv",
        "description": "lorem ipsum dolor sit amet something something"
    }
];

var invalidDummyData = [
    {
        "name": "X",            // too short
        "id": 1,
        "dateAdded": 1434573538291,
        "img": "oiggojbgejbrerfeb",
        "description": "lorem ipsum dolor sit amet something something"
    }, {
        "name": "Name Name Name Name Name Name Name Name Name Name Name Name Name Name Name Name Name Name Name ", // too long
        "id": 2,
        "dateAdded": 1434573538292,
        "img": "abcdknfdgfljbdf",
        "description": "lorem"
    }, {
        "name": "Name - 3",
        "id": 3,
        "dateAdded": 1434573538293,
        "img": "ojbvfdopbvfdovbfv",
        "description": "lorem ipsum dolor sit amet something something"
    }
];



describe('Services: productsService synchronous', function () {

    var productsService;

    beforeEach(function (){

        // load the module.
        module('app');


        inject(function(_productsService_) {
            productsService = _productsService_;
        });
    });


    it('should validate valid products.', function (){

        var validation = productsService.validateProduct(validDummyData[0]);

        expect(typeof validation).toBe('object');
        expect(validation.ok).toBe(true);

    });


    it('should validate invalid products.', function (){

        var validation = productsService.validateProduct(invalidDummyData[0]);

        expect(typeof validation).toBe('object');
        expect(validation.ok).toBe(false);

        expect(typeof validation.errors).toBe('object');
        expect(validation.errors.name).toContain('too short');

        validation = productsService.validateProduct(invalidDummyData[1]);

        expect(typeof validation).toBe('object');
        expect(validation.ok).toBe(false);

        expect(typeof validation.errors).toBe('object');
        expect(validation.errors.name).toContain('too long');

        // TODO: test more outcomes

    });


    it('should compare products.', function (){

        expect(productsService.productsEqual(validDummyData[0], validDummyData[0])).toBe(true);
        expect(productsService.productsEqual(validDummyData[0], validDummyData[1])).toBe(false);

        // TODO: more

    });

});


describe('Services: productsService asynchronous', function () {

    var dataUrl = '/data/products.json';
    var productsService, httpBackend;

    var spy = {
        dummyCB: function (){}
    };

    beforeEach(function () {

        // load the module.
        module('app');

        inject(function($httpBackend, _productsService_) {
            productsService = _productsService_;
            httpBackend = $httpBackend;
            httpBackend.expectGET(dataUrl).respond(validDummyData);
        });

        spyOn(spy, 'dummyCB');
    });

    afterEach(function() {
        httpBackend.flush();
        expect(spy.dummyCB).not.toHaveBeenCalled();
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('should read product-data and return products.', function () {

        productsService.getAllProducts().then(function (products) {

            expect(typeof products).toBe('object');
            expect(typeof products.length).toBe('number');
            expect(products.length).toBe(validDummyData.length);

        }, spy.dummyCB);

    });


    it('should return a single product.', function () {

        function test (datum) {
            productsService.getProduct(datum.id).then(function (product) {

                expect(typeof product).toBe('object');
                expect(typeof product.length).toBe('undefined');

                expect(product.name).toBe(datum.name);
                expect(product.description).toBe(datum.description);
                expect(product.dateAdded).toBe(datum.dateAdded);
                expect(product.dateAdded).toBe(datum.dateAdded);
                expect(product.img).toBe(datum.img);

            }, spy.dummyCB);
        }

        for (var i=0; i<validDummyData.length; i++)
        {
            test(validDummyData[i]);
        }

    });


    it('should fail for non-existent products.', function () {

        productsService.getProduct(404).then(spy.dummyCB, function (error) {

            expect(error).toContain('404');

        });

    });


    it('should delete products.', function () {

        productsService.getAllProducts().then(function (products) {

            expect(products).toContain(validDummyData[0]);
            expect(products).toContain(validDummyData[1]);
            expect(products).toContain(validDummyData[2]);

            productsService.deleteProduct(validDummyData[1]).then(function () {

                productsService.getAllProducts().then(function (products) {

                    expect(products).toContain(validDummyData[0]);
                    expect(products).not.toContain(validDummyData[1]);
                    expect(products).toContain(validDummyData[2]);

                });


            }, spy.dummyCB);

        });

    });


    it('should fail to delete unknown products.', function () {

        productsService.getAllProducts().then(function (products) {

            expect(products).toContain(validDummyData[0]);
            expect(products).toContain(validDummyData[1]);
            expect(products).toContain(validDummyData[2]);

            productsService.deleteProduct(invalidDummyData[0]).then(function () {

                productsService.deleteProduct(invalidDummyData[0]).then(spy.dummyCB, function (error) {

                    expect(error).toContain('404');

                });

            }, spy.dummyCB);

        }, spy.dummyCB);


    });


    it('should save new products.', function (){

        var dummy = productsService.getDummy(validDummyData[0]);

        productsService.saveProduct(dummy).then(function () {

            productsService.getAllProducts().then(function (products) {

                expect(products).toContain(validDummyData[0]);
                expect(products).toContain(validDummyData[1]);
                expect(products).toContain(validDummyData[2]);

            });

        }, spy.dummyCB);

    });

});
