<!-- ix-docs-ignore -->
![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

`imgix.js` is a dependency-free JavaScript library for the browser that allows for easy integration of [imgix](https://www.imgix.com) into websites.

[![NPM Version](https://img.shields.io/npm/v/imgix.js.svg)](https://www.npmjs.com/package/imgix.js)
[![Build Status](https://travis-ci.com/imgix/imgix.js.svg?branch=main)](https://travis-ci.com/imgix/imgix.js)
[![Monthly Downloads](https://img.shields.io/npm/dm/imgix.js.svg)](https://www.npmjs.com/package/imgix.js)
[![Minified Size](https://img.shields.io/bundlephobia/min/imgix.js)](https://bundlephobia.com/result?p=imgix.js)
[![License](https://img.shields.io/github/license/imgix/imgix.js)](https://github.com/imgix/imgix.js/blob/main/LICENSE.md)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fimgix.js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fimgix.js?ref=badge_shield)

---
<!-- /ix-docs-ignore -->

- [Overview / Resources](#overview--resources)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
    * [`ix-src`](#ix-src)
    * [`ix-path` and `ix-params`](#ix-path-and-ix-params)
    * [`ix-sizes` attribute](#ix-sizes-attribute)
    * [`picture` tags](#picture-tags)
- [Advanced Usage](#advanced-usage)
    * [Overriding `ix-host`](#overriding-ix-host)
    * [Disabling auto-initialization](#disabling-auto-initialization)
    * [Manually initializing imgix.js](#manually-initializing-imgixjs)
    * [`imgix.init()` idempotency](#imgixinit-idempotency)
    * [Lazy Loading With lazysizes](#https://github.com/imgix/imgix.js#lazy-loading-with-lazysizes)
    * [Custom Input Attributes](#custom-input-attributes)
    * [Null Output Attributes](#null-output-attributes)
    * [Base-64 encoded parameters](#base-64-encoded-parameters)
    * [Default parameters](#default-parameters)
    * [What is the `ixlib` param?](#what-is-the-ixlib-param)
- [Browser Support](#browser-support)
- [Meta](#meta)
- [License](#license)

## Overview / Resources

`imgix.js` allows developers to easily generate responsive images using the `srcset` and `sizes` attributes, or the `picture` element. This lets you write a single image URL that is parsed and used to make images look great at any screen size, by using [imgix](https://imgix.com) to process and resize your images on the fly.

**Note:** imgix.js is designed to run in the browser, manipulating existing `<img>` elements on an HTML page. If you're looking for a JavaScript library that can programmatically generate imgix URLs, consider using [imgix-core-js](https://github.com/imgix/imgix-core-js) instead.

**Before getting started with imgix.js**, it is _highly recommended_ that you read Eric Portis' [seminal article on `srcset` and `sizes`](https://ericportis.com/posts/2014/srcset-sizes/). This article explains the history of responsive images in responsive design, why they're necessary, and how all these technologies work together to save bandwidth and provide a better experience for users. The primary goal of `imgix.js` is to make these tools easier for developers to implement, so having an understanding of how they work will significantly improve your `imgix.js` experience.

Below are some other articles that help explain responsive imagery, and how it can work alongside imgix:

- [Using imgix with `<picture>`](https://docs.imgix.com/tutorials/using-imgix-picture-element). Discusses the differences between art direction and resolution switching, and provides examples of how to accomplish art direction with imgix.
- [Responsive Images with `srcset` and imgix](https://docs.imgix.com/tutorials/responsive-images-srcset-imgix). A look into how imgix can work with `srcset` and `sizes` to serve the right image.

## Installation

There are several ways to install `imgix.js`. The appropriate method depends on your project.

1. **npm**: `npm install --save imgix.js`
2. **Bower**: `bower install --save imgix.js`
3. **Manual**: [Download the latest release of imgix.js](https://github.com/imgix/imgix.js/releases/latest), and use `dist/imgix.js` or `dist/imgix.min.js`.

If your build process will re-run `dist/imgix.js` or `dist/imgix.min.js` through Browserify, you'll need to add `noParse: [require.resolve('imgix.js')]` to your Browserify config. If you skip this, Browserify will attempt to re-require imgix.js' dependencies, which have already been inlined.

Once `imgix.js` has been included on the page, it will automatically run once, after the `DOMContentLoaded` event fires. This will detect and process all `img`, `picture`, and `source` tags on the page that are set up to use `imgix.js` as described in the [Usage](#usage) section of this README.

## Configuration

`imgix.js` has two important global options:

- `host`: A string corresponding to the desired imgix hostname (defaults to `null`). This enables the use of `ix-path` and `ix-params` to define images, instead of having to manually provide URLs out in `ix-src`. See the [`ix-path` and `ix-params`](#ix-path-and-ix-params) section below for details.
- `useHttps`: A boolean (defaults to `true`), specifying whether to generate `http` or `https`-prefixed URLs.

These configuration options (as well as other options described in the ["Advanced Usage" section](#advanced-usage)) can be defined in two ways. The easiest way is to specify them with `meta` tags in your document's `<head>`:

``` html
<head>
  <meta property="ix:host" content="assets.imgix.net">
  <meta property="ix:useHttps" content="true">
</head>
```

The other way is to manually set these options on the `imgix.config` object. Note that these options should be set *after* loading `imgix.js`, but *before* the `DOMContentLoaded` event is fired on the page:

``` html
<script src="imgix.js"></script>
<script>
  imgix.config.host = 'assets.imgix.net';
  imgix.config.useHttps = false;
</script>
```

## Usage

After installation and set up are complete, one can begin adding responsive images to the page through one of few ways:

### `ix-src`

Creates an `img` tag with the `ix-src` attribute:

``` html
<img
  ix-src="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=300&amp;h=500&amp;fit=crop&amp;crop=right"
  alt="A hot air balloon on a sunny day"
  sizes="100vw"
>
```

**Please note:** `100vw` is an appropriate `sizes` value for a full-bleed image. If your image is not full-bleed, you should use a different value for `sizes`. [Eric Portis' "Srcset and sizes"](https://ericportis.com/posts/2014/srcset-sizes/) article goes into depth on how to use the `sizes` attribute.

This will generate HTML something like the following:

``` html
<img
  ix-src="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=300&amp;h=500&amp;fit=crop&amp;crop=right"
  alt="A hot air balloon on a sunny day"
  sizes="100vw"
  srcset="
    https://assets.imgix.net/unsplash/hotairballoon.jpg?w=100&amp;h=167&amp;fit=crop&amp;crop=right 100w,
    https://assets.imgix.net/unsplash/hotairballoon.jpg?w=200&amp;h=333&amp;fit=crop&amp;crop=right 200w,
    …
    https://assets.imgix.net/unsplash/hotairballoon.jpg?w=2560&amp;h=4267&amp;fit=crop&amp;crop=right 2560w
  "
  src="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=300&amp;h=500&amp;fit=crop&amp;crop=right"
  ix-initialized="ix-initialized"
>
```

Since imgix can generate as many derivative resolutions as needed, `imgix.js` calculates them programmatically, using the dimensions you specify (note that the `w` and `h` params scale appropriately to maintain the correct aspect ratio). All of this information has been placed into the `srcset` and `sizes` attributes. Because of this, imgix.js no longer needs to watch or change the `img` tag, as all responsiveness will be handled automatically by the browser as the page is resized.

### `ix-path` and `ix-params`

If [configured](#configuration) with a global `host` option, `imgix.js` can use the `ix-path` and `ix-params` attributes instead of `ix-src`. The `ix-path` attribute is used to specify the path to an image, and the `ix-params` attribute is used to define the [imgix URL API parameters](https://docs.imgix.com/apis/url) to be applied to the image. Using these two attributes instead of `ix-src` has several advantages:

  1. `ix-params` automatically URL/Base64-encodes specified parameters, [as appropriate](#base-64-encoded-parameters).
  2. `ix-params` is a JSON string, which is easier to read than a URL and can be generated by other tools if necessary.
  3. Not having to re-type `https://my-source.imgix.net` helps keep code DRY.

Here's how the previous example would be written out using `ix-path` and `ix-params` instead of `ix-src`. Regardless of the method chosen, the end result in-browser will be the same.

``` html
<img
  ix-path="unsplash/hotairballoon.jpg"
  ix-params='{
    "w": 300,
    "h": 500,
    "fit": "crop",
    "crop": "right"
  }'
  alt="A hot air balloon on a sunny day"
>
```

**Please note**: `ix-params` must be a valid JSON string. This means that keys and string values must be surrounded by double quotes, e.g., `"fit": "crop"`.

### `ix-sizes` attribute

When set to `auto`, automatically updates an `img` tag's `sizes` attribute to match the image's display size.

``` html
<img
  ix-src="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=300&amp;h=500&amp;fit=crop&amp;crop=right"
  alt="A hot air balloon on a sunny day"
  ix-sizes="auto"
>
```

> **Please note**: the image width has to be calculable before the image has loaded, otherwise `sizes` will not match the width of the displayed image. In most cases, using the CSS rule `img[ix-sizes="auto"] { display: block; width: 100%; }` will ensure the image's `width` is calculable before it has loaded.

Generates HTML similar to the following

``` html
<img
  ix-src="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=300&amp;h=500&amp;fit=crop&amp;crop=right"
  alt="A hot air balloon on a sunny day"
  ix-sizes="auto"
  sizes="200px"
  srcset="
    https://assets.imgix.net/unsplash/hotairballoon.jpg?w=100&amp;h=167&amp;fit=crop&amp;crop=right 100w,
    https://assets.imgix.net/unsplash/hotairballoon.jpg?w=200&amp;h=333&amp;fit=crop&amp;crop=right 200w,
    …
    https://assets.imgix.net/unsplash/hotairballoon.jpg?w=2560&amp;h=4267&amp;fit=crop&amp;crop=right 2560w
  "
  src="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=300&amp;h=500&amp;fit=crop&amp;crop=right"
  ix-initialized="ix-initialized"
>
```

When using `ix-sizes="auto"`, the browser will not have the `sizes` attribute to reference on first render but only after `imgix.js` has loaded. This is why it's recommended to manually set `sizes` whenever possible.

### `picture` tags

If an art-directed image is desired, `imgix.js` plays nicely with the `picture` tag. This allows for specifying more advanced responsive images, by changing properties such as the crop and aspect ratio for different screens. To get started, construct a `picture` tag with a `source` attribute for each art-directed image, and a fallback `img` tag. If new to using the `picture` tag, consider reading our [tutorial](https://docs.imgix.com/tutorials/using-imgix-picture-element) to learn more about how it works.

The `source` tags can be used with `ix-src` or `ix-path` and `ix-params`, just like `img` tags. The following example will generate HTML that displays Bert _and_ Ernie on small screens, just Bert on medium-sized screens, and just Ernie on large screens.

``` html
<picture>
  <source
    media="(min-width: 880px)"
    sizes="430px"
    ix-path="imgixjs-demo-page/bertandernie.jpg"
    ix-params='{
      "w": 300,
      "h": 300,
      "fit": "crop",
      "crop": "left"
    }'
  >
  <source
    media="(min-width: 640px)"
    sizes="calc(100vw - 20px - 50%)"
    ix-path="imgixjs-demo-page/bertandernie.jpg"
    ix-params='{
      "w": 300,
      "h": 300,
      "fit": "crop",
      "crop": "right"
    }'
  >
  <source
    sizes="calc(100vw - 20px)"
    ix-path="imgixjs-demo-page/bertandernie.jpg"
    ix-params='{
      "w": 300,
      "h": 100,
      "fit": "crop"
    }'
  >
  <img ix-path="imgixjs-demo-page/bertandernie.jpg">
</picture>
```

## Advanced Usage

### Overriding `ix-host`

When displaying images between multiple imgix Sources, the `host` option can be overridden on any `img` or `source` tag by specifying an `ix-host` attribute in the tag:

``` html
<img
  ix-host="a-different-source.imgix.net"
  ix-path="unsplash/hotairballoon.jpg"
  ix-params='{
    "w": 300,
    "h": 500,
    "fit": "crop",
    "crop": "right"
  }'
  alt="A hot air balloon on a sunny day"
>
```

### Disabling auto-initialization

By default, `imgix.js` will automatically run as soon as the `DOMContentLoaded` event fires, immediately processing all `img` and `source` tags on the page that are set up to use `imgix.js`. This auto-initialization behavior can be disabled by including the following `meta` tag in the document's `head`:

``` html
<head>
  <meta property="ix:autoInit" content="false">
</head>
```

### Manually initializing imgix.js

If auto-initialization is disabled as [described above](#disabling-auto-initialization), `imgix.js` will need to be run manually in order to process the `img` and `source` tags on the page. This can be done by invoking `imgix.init()`.

When calling `imgix.init()`, a map of options can be passed in to override the global configuration settings. For example:

``` js
imgix.init({
  useHttps: false,
  host: 'a-different-source.imgix.net'
});
```

### `imgix.init()` idempotency

Whether `imgix.init()` is run automatically when the `DOMContentLoaded` event fires or [manually initialized](#manually-initializing-imgix-js), it will always be **idempotent**. This means that `img` and `source` tags that have already been processed by imgix.js will not be re-processed by subsequent calls.

However, if you would like to re-process _all_ imgix.js-ready `img` and `source` tags, you can override the function's idempotency by calling `imgix.init()` again and passing in the `force: true` option:

``` js
imgix.init({
  force: true
})
```

### Lazy Loading With [lazysizes](https://github.com/aFarkas/lazysizes)

If lazy loading images is desired, we recommend using [lazysizes](https://github.com/aFarkas/lazysizes). In order to use `imgix.js` with lazysizes, generate images using lazysizes-compatible attributes instead of the standard `src`, `srcset`, and `sizes` by changing some configuration settings:

Using `<meta>` tags:

``` html
<head>
  <meta property="ix:srcAttribute" content="data-src">
  <meta property="ix:srcsetAttribute" content="data-srcset">
  <meta property="ix:sizesAttribute" content="data-sizes">
</head>
```

Using JavaScript:

``` javascript
imgix.config.srcAttribute = 'data-src';
imgix.config.srcsetAttribute = 'data-srcset';
imgix.config.sizesAttribute = 'data-sizes';
```

### Custom Input Attributes

`imgix.js` defaults to pulling its data from the `ix-src`, `ix-path`, `ix-params`, and `ix-host` attributes. If custom input attributes are desired, they can be specified by changing some configuration settings. This can be useful if, say, there is a concern about W3C compliance.

Using `<meta>` tags:

``` html
<head>
  <meta property="ix:srcInputAttribute" content="data-ix-src">
  <meta property="ix:pathInputAttribute" content="data-ix-path">
  <meta property="ix:paramsInputAttribute" content="data-ix-params">
  <meta property="ix:hostInputAttribute" content="data-ix-host">
</head>
```

Using JavaScript:

``` javascript
imgix.config.srcInputAttribute = 'data-ix-src';
imgix.config.pathInputAttribute = 'data-ix-path';
imgix.config.paramsInputAttribute = 'data-ix-params';
imgix.config.hostInputAttribute = 'data-ix-host';
```

### Null Output Attributes

In rare cases, it may be undesirable to have `imgix.js` modify the `src`, `srcset`, or `sizes` attributes of the `<img>` elements it's targeting. In such cases, the default behavior can be overridden by setting some configuration values to `null`:

Using `<meta>` tags:

``` html
<head>
  <meta property="ix:srcAttribute" content="">
  <meta property="ix:srcsetAttribute" content="">
  <meta property="ix:sizesAttribute" content="">
</head>
```

Using JavaScript:

``` javascript
imgix.config.srcAttribute = null;
imgix.config.srcsetAttribute = null;
imgix.config.sizesAttribute = null;
```

### Base-64 encoded parameters

All of imgix's API parameters can be provided as [Base64 variants](https://docs.imgix.com/apis/url#base64-variants). This is especially useful when providing text for the `txt` parameter, or URLs for parameters such as `mark` or `blend`.

When providing parameters via the `ix-params` attribute, note that the values for any Base64 variant parameters will be automatically base64-encoded by `imgix.js`, and can therefore be provided *unencoded*.

``` html
<img
  ix-path="unsplash/hotairballoon.jpg"
  ix-params='{
    "txt64": "Hello, World!"
  }'
  alt="A hot air balloon on a sunny day"
>
```

When providing a URL with parameters via the `ix-src` attribute, note that the values for any Base64 variant parameters will *not* be automatically base64-encoded by `imgix.js`.

``` html
<img
  ix-src="https://assets.imgix.net/unsplash/hotairballoon.jpg?txt64=SGVsbG8sIFdvcmxkIQ"
  alt="A hot air balloon on a sunny day"
  sizes="100vw"
>
```

### Default parameters

If a default set of parameters are desired, they can be extracted out into a global config using `imgix.defaultParameters`. These settings will become the default paramters for each imgix tag globally, before any specific parameters are loaded from `ix-params` or `ix-src`

```js
// setup
imgix.config.defaultParams = {
	auto: 'format,compress',
	fit: 'crop'
}

// later
<img
  ix-path="hero.png"
  ix-params='{"fit":"clip"}'
>

// becomes
<img src=".../hero.png?auto=format,compress&fit=clip">

```

### What is the `ixlib` param?

For security and diagnostic purposes, we default to signing all requests with the language and version of library used to generate the URL. This can be disabled by setting the `includeLibraryParam` configuration option to `false`.

Using a `<meta>` tag:

``` html
<head>
  <meta property="ix:includeLibraryParam" content="false">
</head>
```

Using JavaScript:

``` javascript
imgix.config.includeLibraryParam = false;
```

## Browser Support

- By default, browsers that don't support [`srcset`](http://caniuse.com/#feat=srcset), [`sizes`](http://caniuse.com/#feat=srcset), or [`picture`](http://caniuse.com/#feat=picture) will gracefully fall back to the default `img` `src` when appropriate. If you want to provide a fully-responsive experience for these browsers, `imgix.js` works great alongside [Picturefill](https://github.com/scottjehl/picturefill)!
- If using [Base64 variant params](https://docs.imgix.com/apis/url#base64-variants) and require IE <= 9 support, we recommend using a polyfill for `atob`/`btoa`, such as [Base64.js](https://github.com/davidchambers/Base64.js).

## Meta

`imgix.js` was made by [imgix](http://imgix.com). It's licensed under the BSD 2-Clause license (see the [license file](https://github.com/imgix/imgix.js/blob/main/LICENSE.md) for more info). Any contribution is absolutely welcome, but please review the [contribution guidelines](https://github.com/imgix/imgix.js/blob/main/CONTRIBUTING.md) before getting started.

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fimgix.js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fimgix.js?ref=badge_large)
