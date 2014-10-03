![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)

imgix.js
========

The Javascript client library for [imgix](http://www.imgix.com).

* [Getting Started](#getting-started)
* [Examples](#examples)
* [Documentation](#docs)
* [jQuery Plugin](#jquery)
* [Browser Support](#browser-support)
* [Polyfills](#polyfills)
* [Dependencies](#dependencies)

<a name="getting-started"></a>
Getting Started
---------------

If you don't already have an imgix account then signup at [imgix.com](http://www.imgix.com).

Once your imgix source is created then simply add `imgix.min.js` (and if you're using jquery you can optionally add `imgix.jquery.js`) from the `dist` directory.


<a name="examples"></a>
Examples
--------

Check out the [imgix.js home page](http://www.imgix.com/imgix-js) for a big picture overview of everything you can do. Below are some simple examples.

####Build URLs

A simple example of creating an imgix URL with param setters.

    var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
    ix.setSepia(50);
    ix.setRotate(20);
    ix.getURL(); // equals http://assets.imgix.net/examples/butterfly.jpg?sepia=50&rot=20

####Build URLs and Attach to an Element

An example of creating an imgix URL with an object of imgix params/values via `setParams` then setting that image on an element.

    var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
    ix.setParams({w: 500, px: 20});
    ix.attachTo('.butterfly-target');


####Color Palette Extraction

An example of extracting the colors from an image and then setting the darkest image as the background color of the page.

    var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
    ix.getColors(function(colors) {
        document.body.style.backgroundColor = colors[0];
    })

####Auto Update Element on imgix.URL change

An example of auto re-setting an element's image whenever the `imgix.URL` instance changes. Here we're rotating an image by 5 degrees every 5 seconds.

    var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
    ix.autoUpdateImg('.butterfly-target');
	var rotation = 0;
    window.setInterval(function() {
        rotatation += 5;
        ix.setRotate(rotation);
    }, 5000);

<a name="docs"></a>
Documentation
-------------

The [imgix.js API Documentation](docs/api.md) outlines all public `imgix.js` code.


Most usage will be centered around:

* [imgix.URL](docs/api.md#imgix.URL) - for imgix image URL creation and manipulation.
* [imgix.fluid](docs/api.md#imgix.fluid) - fast and easy responsive images.


<a name="jquery"></a>
jQuery Plugin
-------------

If you're already using jQuery then you can also include `imgix.jquery.js` to easily make changes to existing images. For instance, if you wanted to add a text watermark to all your gallery images:

    $('.gallery').imgix().setParams({txt: 'Copyright Chester 2014', txtclr: 'f00', txtsize:20});

<a name="browser-support"></a>
Legacy Browser Support
----------------------

`imgix.js` should support all browsers back to and including Internet Explorer 8. This requires a number of polyfills to be included in its source. If you're already providing IE8 polyfills see the section below about building `imgix.js` without them. 

####IE8 Tips

Ensure you set a doctype so you do not invoke "quirks" mode.

    <!DOCTYPE html>

Ensure you add an `IE=edge` `meta` tag in your `<head>`

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

<a name="polyfills"></a>
Polyfills
---------

If you're using `imgix.js` as part of a larger webapp that already supports IE8 (or you do not care about supporting it) then you can build `imgix.js` without these polyfills.


    $ cd imgix.js/
    $ npm install # if you haven't already
    $ grunt build --no-polyfills

Now you'll have a much smaller version of `imgix.js` and `imgix.min.js` in the `dist/` directory.

<a name="dependencies"></a>
Dependencies
------------

The library itself has no dependencies. Although if you want to build from source, run tests, or contribute then you'll need `node` / `npm` and `grunt`.

Installing Build Dependencies:

    $ npm install

Running Tests:

    $ grunt test
