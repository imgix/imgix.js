![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)

imgix.js [![Build Status](https://travis-ci.org/imgix/imgix.js.svg?branch=master)](https://travis-ci.org/imgix/imgix.js)
===========

The Javascript client library for [imgix](http://www.imgix.com).

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Examples](#examples)
* [Documentation](#docs)
* [jQuery Plugin](#jquery)
* [Browser Support](#browser-support)
* [Polyfills](#polyfills)
* [Dependencies](#dependencies)

<a name="installation"></a>
Installation
---------------

+ **npm**: `npm install imgix.js`
+ **bower**: `bower install imgix.js`
+ **Manual**: [Download](https://github.com/imgix/imgix.js/archive/master.zip) and use `dist/imgix.js`


<a name="getting-started"></a>
Getting Started
---------------

If you don't already have an imgix account then sign up at [imgix.com](http://www.imgix.com).

Once your imgix source is created then simply add `imgix.min.js` to your page:

```html
<script src="http://www.imgix.com/libraries/imgix.js" type="text/javascript"></script>
```


`imgix.js` is dependency-free so it includes its own DOM `onready` method. Although if you're using additional libraries that include similar functionality then you can continue to use those.

```html
<script type="text/javascript">
  imgix.onready(function() {
    // ready to go
  });
</script>
```

Please read the [examples](#examples) section below.

<a name="examples"></a>
Examples
--------

Check out the [imgix.js home page](http://www.imgix.com/imgix-js) for a big picture overview of everything you can do. Additionally there are __full__ examples in the [examples/](examples/) directory.


####Single fluid image (full)

This is the smallest full example of using imgix to provide a fluid image.


```html
<html>
<head>
  <style>
    .imgix-fluid-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: block;
    }
  </style>

  <!-- include imgix.js -->
  <script src="https://www.imgix.com/libraries/imgix.js" type="text/javascript"></script>
  <script>
    imgix.onready(function() {
      imgix.fluid({
        updateOnResizeDown: true,
        pixelStep: 5,
        autoInsertCSSBestPractices: true
      });
    });
  </script>
</head>
<body>
  <div data-src="https://assets.imgix.net/coffee.jpg?fit=crop&crop=faces" class="imgix-fluid imgix-fluid-bg"></div>
</body>
</html>
```

####Build URLs

A simple example of creating an imgix URL with param setters.

```javascript
var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
ix.setParam('sepia', 50);
ix.setParam('rot', 20);
ix.getURL(); // equals http://assets.imgix.net/examples/butterfly.jpg?sepia=50&rot=20
```

####Build URLs and Attach to an Element

An example of creating an imgix URL with an object of imgix params/values via `setParams` then setting that image on an element.

```javascript
var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
ix.setParams({w: 500, px: 20});
ix.attachImageTo('.butterfly-target');
```


####Color Palette Extraction

An example of extracting the colors from an image and then setting the darkest image as the background color of the page.

```javascript
var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
ix.getColors(function(colors) {
  document.body.style.backgroundColor = colors[0];
});
```

####Auto Update Element on imgix.URL change

An example of auto re-setting an element's image whenever the `imgix.URL` instance changes. Here we're rotating an image by 15 degrees every 2 seconds.

```javascript
var ix = new imgix.URL('http://assets.imgix.net/examples/butterfly.jpg');
ix.autoUpdateImg('.butterfly-target');
var rotation = 0;
window.setInterval(function() {
  rotation += 15;
  ix.setRotate(rotation);
}, 2000);
```

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

If you're already using jQuery then you can _also_ include `imgix.jquery.js` to easily make changes to existing images.

```html
<script src="https://www.imgix.com/static/js/imgix.jquery.js" type="text/javascript"></script>
```

For example, if you wanted to add a text watermark to all your gallery images:

```javascript
$('.gallery').imgix().setParams({txt: 'Copyright Chester 2015', txtclr: 'f00', txtsize:20});
```

<a name="browser-support"></a>
Legacy Browser Support
----------------------

`imgix.js` should support all browsers back to and including Internet Explorer 8. This requires a number of polyfills to be included in its source. If you're already providing IE8 polyfills see the [section below](#polyfills) about building `imgix.js` without them.

####IE8 Tips

Ensure you set a doctype so you do not invoke "quirks" mode.

```html
<!DOCTYPE html>
```

Ensure you add an `IE=edge` `meta` tag in your `<head>`

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

<a name="polyfills"></a>
Polyfills
---------

If you're using `imgix.js` as part of a larger webapp that already supports IE8 (or you do not care about supporting it) then you can build `imgix.js` without these polyfills.

```bash
$ cd imgix.js/
$ npm install # if you haven't already
$ grunt build --no-polyfills
```

Now you'll have a much smaller version of `imgix.js` and `imgix.min.js` in the `dist/` directory.

<a name="dependencies"></a>
Dependencies
------------

The library itself has no dependencies. Although if you want to build from source, run tests, or contribute then you'll need `node` / `npm` and `grunt`.

####Installing Build Dependencies:

```bash
$ npm install
```

####Running Tests:

```bash
$ grunt test
```

####Building docs (auto generated from jsdocs in the source):

```bash
$ grunt builddocs
```

This writes the docs to `docs/api.md` for easy viewing on GitHub.
