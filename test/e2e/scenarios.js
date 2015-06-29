'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data = require('../../data/products.json');

describe('app', function() {

    console.info(data);

    it('should display a list of product-previews', function() {

        browser.get('/');
        expect(element.all(by.css('.preview-list li')).count()).toEqual(data.length);

    });

    it('should display an image, a title and a date for each product', function() {

        browser.get('/');
        for (var i = 0; i < data.length; i ++)
        {
            var el = element.all(by.css('.preview-list li')).get(i);

            expect(el(by.css('img').getAttribute('src'))).toEqual(data[i].img);

        }


    });

});
