# sample-shop-frontend

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

It requires NodeJS v.0.10.0 or higher

## Features

This is a mock application for showcasing CRUD functionality. On running and opening the app in the browser, a number of "products" is previewed to the user, each displaying a name, image and the date it was added. Clicking on a product preview opens a modal with the full product with description and functionality for editing/deleting. New products can be added by clicking the "Add Product" button.


## Setup

To set up the project, clone and enter the repository, then run

`npm install`

and

`bower install`

## Run

To run the development version, enter

`grunt serve`  (serves the project on localhost:9000)

or

`grunt serve:dist`


To build and serve the dist-version (on localhost:9001)


## Test

Running `grunt test` will run js-hint and the unit tests with karma.


## CRUD

<dl>

    <dt>Create a product</dt>
    <dd>
        <p>by clicking on <em>Add Product</em>. A modal will open with empty fields for the new product's name, image url and description.</p>
        <p>Name and description are compulsory fields. Once the product is valid (name between 3 and 25 letters, description between 10 and 100 letters) the <em>Save</em> button becomes clickable and the product can be saved.</p>
    </dd>
  
    <dt>Read a product</dt>
    <dd>
        <p>by clicking on it in the preview list. A modal will open, showing the full product with its description.</p>
    </dd>
  
    <dt>Update a product<dt>
    <dd>
        <p>by clicking on it in the preview list and clicking <em>Edit</em> in the resulting modal to toggle input fields for the product's name, image url and description.</p>
        <p>Name and description are compulsory fields. Once the product is valid (name between 3 and 25 letters, description between 10 and 100 letters) the <em>Save</em> button becomes clickable and the product can be saved.</p>
    </dd>
  
    <dt>Delete a product<dt>
    <dd>
        <p>by clicking on it in the preview list and clicking <em>Edit</em> and then <em>Delete</em> in the resulting modal.</p>
    </dd>
</dl>
 

## Naming conventions

The code deals with

<dl>

    <dt>Products</dt>
    <dd>
        <p><em>Products</em> represent, well products. The have a <em>name</em>, <em>image</em> and <em>description</em>. "Saved" products additionally get an <em>id</em> to track them by and a <em>date added</em> field.</p>
        <p><em>Products</em> can be loaded in bulk with <b>productsService.getAllProducts()</b> or (individually by their id with <b>productsService.getProduct(productID)</b>), updated with <b>productsService.updateProduct(oldProduct, newProduct)</b> (replaces oldProduct's name, description and image-url with newProduct's), and deleted with <b>productsService.deleteProduct(product)</b></p>
    </dd>

    <dt>Dummies</dt>
    <dd>
        <p>A <em>dummy</em> is a product before it is added to the product list. It has the <em>name</em>, <em>image</em> and <em>description</em> fields so it can be displayed in the poduct-modal. </p>
        <p><em>Dummies</em> are used to 
            <ul>
                <li>create a product: an empty dummy is created with <b>productsService.getDummy()</b> and displayed in edit mode to be later stored into the products-list with an automatically created id and date-added field</li>
                <li>update a product: a copy of the product is created with <b>productsService.getDummy(product)</b>. On saving, that copies fields are copied back onto the product with <b>productsService.updateProduct(product, dummy)</b></li>
            </ul>
        </p>
    </dd>
</dl>
 

## Limitations

- The products list is pure front-end mock data and can't be stored permanently. On each page-reload the products are reset to the data in `data/products.json` (possible improvements: store changed & added products in local-storage, implements a mock back-end that stores and reads data).


