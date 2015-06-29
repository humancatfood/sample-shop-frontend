'use strict';

/*global it: true*/
/*global beforeEach: true*/
/*global afterEach: true*/
/*global describe: true*/
/*global expect: true*/
/*global browser: true*/
/*global element: true*/
/*global by: true*/
/*global require: true*/


var data = require('../../data/products.json');

describe('app', function() {


    it('should display a list of product-previews', function() {

        browser.get('/');

        expect(element(by.css('.preview-list')).isPresent()).toBeTruthy();

        expect(element.all(by.css('.preview-list .preview-item')).count()).toEqual(data.length);

    });


    it('should not display the product-modal yet', function() {

        browser.get('/');

        expect(element(by.css('.product-modal')).isDisplayed()).toBeFalsy();

    });


    it('should display an image and a title for each product', function() {

        browser.get('/');

        for (var i = 0; i < data.length; i ++)
        {

            var previewItem = element.all(by.css('.preview-list .preview-item')).get(i);

            expect(previewItem.element(by.css('.preview-title')).isPresent()).toBeTruthy();
            expect(previewItem.element(by.css('.preview-title')).getText()).toEqual(data[i].name);

            expect(previewItem.element(by.css('.preview-image')).isPresent()).toBeTruthy();
            expect(previewItem.element(by.css('.preview-image')).getAttribute('src')).toEqual(data[i].img);

        }

    });


    it('should display a product modal when clicking on a product', function() {

        browser.get('/');

        for (var i = 0; i < data.length; i ++)
        {

            element.all(by.css('.preview-list .preview-item')).get(i).click();

            var modal = element(by.css('.product-modal'));
            var backdrop = element(by.css('.modal'));

            expect(modal.isDisplayed()).toBeTruthy();
            expect(backdrop.isDisplayed()).toBeTruthy();

            element(backdrop).click();

            expect(modal.isDisplayed()).toBeFalsy();
            expect(backdrop.isDisplayed()).toBeFalsy();

        }

    });


});
