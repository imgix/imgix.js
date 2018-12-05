# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.4.0"></a>
# 3.4.0 (2018-12-05)


### Bug Fixes

* remove support for value-less search parameters ([#135](https://github.com/imgix/imgix.js/issues/135)) ([8216df4](https://github.com/imgix/imgix.js/commit/8216df4))


### Features

* global default parameters ([#134](https://github.com/imgix/imgix.js/issues/134)) ([ab42f74](https://github.com/imgix/imgix.js/commit/ab42f74)), closes [#129](https://github.com/imgix/imgix.js/issues/129)
* use exponential increase for srcset widths ([#130](https://github.com/imgix/imgix.js/issues/130)) ([d18a85f](https://github.com/imgix/imgix.js/commit/d18a85f))



<a name="3.3.2"></a>
## 3.3.2 (2017-11-09)



<a name="3.3.1"></a>
## 3.3.1 (2017-10-26)



<a name="3.3.0"></a>
# 3.3.0 (2017-06-19)



<a name="3.2.0"></a>
# 3.2.0 (2017-06-15)



<a name="3.1.0"></a>
# 3.1.0 (2017-02-21)



<a name="3.0.4"></a>
## 3.0.4 (2016-10-17)



<a name="3.0.3"></a>
## 3.0.3 (2016-09-12)



<a name="3.0.2"></a>
## 3.0.2 (2016-07-21)



<a name="3.0.1"></a>
## 3.0.1 (2016-06-30)



<a name="3.0.0"></a>
# 3.0.0 (2016-06-22)



<a name="2.2.3"></a>
## 2.2.3 (2016-05-02)



<a name="2.2.2"></a>
## 2.2.2 (2016-04-26)



<a name="2.2.1"></a>
## 2.2.1 (2016-04-03)



<a name="2.2.0"></a>
# 2.2.0 (2016-03-29)



<a name="2.1.0"></a>
# 2.1.0 (2015-11-30)



<a name="2.0.0"></a>
# 2.0.0 (2015-11-10)



<a name="1.2.0"></a>
# 1.2.0 (2015-10-07)



<a name="1.1.4"></a>
## 1.1.4 (2015-10-02)



<a name="1.1.2"></a>
## 1.1.2 (2015-06-12)



<a name="1.1.1"></a>
## 1.1.1 (2015-06-09)



<a name="1.1.0"></a>
# 1.1.0 (2015-05-29)



<a name="1.0.25"></a>
## 1.0.25 (2015-05-20)



<a name="1.0.24"></a>
## 1.0.24 (2015-05-20)



<a name="1.0.23"></a>
## 1.0.23 (2015-05-14)



<a name="1.0.22"></a>
## 1.0.22 (2015-05-08)



<a name="1.0.21"></a>
## 1.0.21 (2015-04-29)



<a name="1.0.20"></a>
## 1.0.20 (2015-04-16)



<a name="0.1.19"></a>
## 0.1.19 (2015-04-14)



<a name="1.0.18"></a>
## 1.0.18 (2015-02-12)



<a name="1.0.16"></a>
## 1.0.16 (2015-02-12)



<a name="1.0.15"></a>
## 1.0.15 (2015-02-12)



<a name="1.0.14"></a>
## 1.0.14 (2015-01-30)



<a name="1.0.13"></a>
## 1.0.13 (2014-11-22)



<a name="1.0.12"></a>
## 1.0.12 (2014-10-20)



<a name="1.0.11"></a>
## 1.0.11 (2014-10-20)



<a name="1.0.10"></a>
## 1.0.10 (2014-10-20)



<a name="1.0.9"></a>
## 1.0.9 (2014-10-10)



<a name="1.0.8"></a>
## 1.0.8 (2014-10-08)



<a name="1.0.7"></a>
## 1.0.7 (2014-10-06)



<a name="1.0.6"></a>
## 1.0.6 (2014-10-06)



<a name="1.0.5"></a>
## 1.0.5 (2014-10-06)



<a name="1.0.4"></a>
## 1.0.4 (2014-10-04)



<a name="1.0.3"></a>
## 1.0.3 (2014-10-04)



<a name="1.0.2"></a>
## 1.0.2 (2014-10-04)



<a name="1.0.1"></a>
## 1.0.1 (2014-10-04)



<a name="1.0.0"></a>
# 1.0.0 (2014-10-03)



# imgix.js 3.3.2

* Fixed a bug that was adding an unintended extra query parameter to URLs generated from an `ix-src` attribute with no base parameters. For full details, see [PR #128](https://github.com/imgix/imgix.js/pull/128).

# imgix.js 3.3.1

* Fixed an issue where some browsers with a fractional window.devicePixelRatio value would chunder errors into the browser console.

# imgix.js 3.3.0

* The following configuration options can now be set to `null`, which will prevent the corresponding output attribute from being set on elements processed by imgix.js:
  - `srcAttribute`
  - `srcsetAttribute`
  - `sizesAttribute`

# imgix.js 3.2.0

* The following configuration options have been made global, and thus can be set using `<meta property="ix:foo"/>` tags or by updating the `imgix.config` object:
  - `srcAttribute`
  - `srcsetAttribute`
  - `sizesAttribute`
  - `srcInputAttribute`
  - `pathInputAttribute`
  - `paramsInputAttribute`
  - `hostInputAttribute`
* Any global configuration options can be overridden by providing an options object when calling `imgix.init()`
* Automatic initialization of `<img>` and `<source>` tags can be disabled by including `<meta property="ix:autoInit" content="false">` in the document's `<head>`.

# imgix.js 3.1.0

* Values for base-64 parameters provided in the `ix-src` attribute will no longer be automatically encoded. For complete notes about this change, see [PR #114](https://github.com/imgix/imgix.js/pull/114).

# imgix.js 3.0.4

* Allow customization of the attributes used to define images. See the readme for details: https://github.com/imgix/imgix.js#custom-input-attributes.


# imgix.js 3.0.3

* Properly encode Base64 variant params from `ix-src`.


# imgix.js 3.0.2

* Fixes an issue in browsers without the `window.devicePixelRatio` property.


# imgix.js 3.0.1

* Adds the `ixlib` diagnostic parameter, and associated `imgix.config.includeLibraryParam` option.
* The current library version number is now accessible under `imgix.VERSION`.


# imgix.js 3.0.0

* This is a full rewrite of imgix.js. It now plays nicely with `srcset`, `sizes`, `picture`, and other modern responsive imagery techniques. You can learn more in [the readme](https://github.com/imgix/imgix.js)!


# imgix.js 2.2.3

## Bug Fixes

* Don't reference `window` for `lazyLoadScrollContainers` default value if not present. (See #96, thanks @psfrankie!)
* Fix Safari double-request issues (See #93, thanks @jordanthomas!)


# imgix.js 2.2.2

## Bug Fixes

* Add a workaround for Prototype.js' `Array.prototype` handling. Thanks to @matiasnombarasco for this PR!


# imgix.js 2.2.1

## Bug Fixes

* Properly increment version number to 2.2.1 in src/core.js


# imgix.js 2.2.0

## Features

* Added `lazyLoadScrollContainers` option. Adds scroll listeners to the specified elements, in order to trigger lazy-loading on images that are scrolled into view as part of an overflowed container. Defaults to `[window]`, but if this option is specified, `window` is *not* automatically included. Thanks to @joshfrench for making this happen!


# new imgix.js 2.1.0

## Features

* Removed unnecessary `imgix.getRawBackgroundImage` method.

## Bug Fixes

* Fixed a bug in `imgix.getBackgroundImage` that was failing to return a proper background-image URL in some corner cases.


## Bug Fixes

* Removing parameter-specific getters and setters removes a load of bugs related to various image API parameters throwing validation warnings when constructing and manipulating imgix URLs.

# new imgix.js 2.0.0

## Features

* Removed all parameter-specific getters and setters from the `imgix.URL` object (i.e. `imgix.URL.getSepia()`, `imgix.URL.setWidth()`, et cetera). Instead, you should use `imgix.URL.getParam()` and `imgix.URL.setParam()`.
* Removed all methods for listing and sorting image parameters, as they were frequently out of date: `imgix.getAllParams()`, `imgix.getParamAliases()`, `imgix.getDefaultParamValues()`, `imgix.getDefaultParamValue()`, `imgix.getDefaultParams()`.
* Also removed all methods related to font lookups, including `imgix.getFontLookup()`, `imgix.getFonts()`, `imgix.searchFonts()`, and `imgix.isFontAvailable()`.
* Removed checks when constructing and manipulating imgix URLs that previously validated parameters names and values.
* Renamed `imgix.helpers.getDPR()` method to `imgix.helpers.getWindowDPR()`

## Bug Fixes

* Removing parameter-specific getters and setters removes a load of bugs related to various image API parameters throwing validation warnings when constructing and manipulating imgix URLs.


# new imgix.js 1.2.0

## Features

* Updated `imgix.URL.getColors()` method to use simple AJAX instead of CSS-injection. As a result of this, colors are being returned from lightest to darkest, rather than from darkest to lightest as they were previously. This change was made to bring the behavior of this method in line with the `palette=json` image API, which it now uses.
* Removed several unnecessary polyfills, shaving 4KB off of the minified file size.

## Bug Fixes

* Continuous integration tests are now being done against the library both with and without polyfills.


# new imgix.js 1.1.4

## Features

* Broke core.js up into separate components
* Broke tests up into different files

## Bug Fixes

* Fixed a bug in `imgix.buildUrl()` that was causing port numbers to be ignored
* Fixed a bug where `imgix.fluid()` would ignore the `crossorigin` attribute on its targets


# new imgix.js 1.1.3

## Features

N/A

## Bug Fixes

* Optimized scroll-handing when using `lazyLoad` property of `imgix.fluid()`.


# new imgix.js 1.1.2

## Features

N/A

## Bug Fixes

* Upgraded `imgix.onready()` internals to fix a bug in IE and increase legibility.


# new imgix.js 1.1.1

## Features

N/A

## Bug Fixes

* Fixed [a bug](https://github.com/imgix/imgix.js/issues/39) introduced in 1.1.0 that was generating obscenely long classnames when requesting color-palette CSS.


# new imgix.js 1.1.0

## Features

* Removed all code pertaining to signing imgix URLs with your API token. We decided that this code isn't well-suited for client-side code like imgix.js. If you need to use signed URLs, we suggest using one of our [client libraries](http://www.imgix.com/docs/libraries/) instead.
* Added a `throttle` parameter to `imgix.fluid`. This parameter determines how often lazy-loaded images poll the viewport to determine whether they should load their source or not. This was previously defined by the `debounce` parameter, which also handles polling for window resize events. The default value for `throttle` is 200ms.

## Bug Fixes

* Fixed [a bug](https://github.com/imgix/imgix.js/commit/2d4825943efaa5cd445bdd8532ed194b08632d88) in our lazyLoad code that was preventing images clipped by the top or left sides of the browser viewport from rendering properly.
* Fixed [a bug](https://github.com/imgix/imgix.js/pull/36) that could sometimes cause `imgix.fluid` to not behave properly if the source image was already in the browser's cache.


# new imgix.js 1.0.25

## Features

* Added a parameter to all image requests reflecting the current version of imgix.js. This will allow us to better track usage and debug problems with the library in the future.

## Bug Fixes

N/A


# new imgix.js 1.0.24

## Features

N/A

## Bug Fixes

* Fixed a bug that could lead to unexpected requests for (sometimes massive) image files, occuring for elements that have been marked as fluid while it or its parents were set to `display:none;`. See [this PR](https://github.com/imgix/imgix.js/pull/28) for more details.


# new imgix.js 1.0.23

## Features

* Updated parameter lists and accompanying getters and setters. These had gotten a little out-of-date with newly released imgix API features, so they needed some love.

## Bug Fixes

* Fixed an issue in Safari where lazy-loaded images would repaint relentlessly while scrolling.


# new imgix.js 1.0.22

## Features

* `fluid` now accepts an element to operate on as an optional first parameter, instead of the entire document ([See docs](https://github.com/imgix/imgix.js/blob/master/docs/api.md#imgix.fluid)).

## Bug Fixes

N/A


# new imgix.js 1.0.21

## Features

N/A

## Bug Fixes

This release fixes a race condition when using the `onLoad` callback with `imgix.fluid()` where if multiple image updates are requested before the first image actually loads then `fluidUpdateCount` could be incorrect.


# new imgix.js 1.0.20

## Features

* `attachGradientTo` no longer requires a base color to be passed. `rgba` colors are now valid as well.  [see docs](https://github.com/imgix/imgix.js/blob/master/docs/api.md#imgix.URL#attachGradientTo)

## Bug Fixes

N/A


# new imgix.js 1.0.19

## Features

* `attachGradientTo` added to `imgix.URL` [see docs](https://github.com/imgix/imgix.js/blob/master/docs/api.md#imgix.URL#attachGradientTo)
* `lazyColorSet` config option added to `imgix.fluid` [see docs](https://github.com/imgix/imgix.js/blob/master/docs/api.md#imgix.fluid)
* `onLoad` config callback added to `imgix.fluid` [see docs](https://github.com/imgix/imgix.js/blob/master/docs/api.md#imgix.fluid)

## Bug Fixes

N/A


# new imgix.js 1.0.18

## Features

AMD Support

## Bug Fixes

N/A


# new imgix.js 1.0.17

## Features

Improved pinch zoom by taking `scale` value directly from gesture event.

## Bug Fixes

Fixed pinch zoom on iOS devices.


# new imgix.js 1.0.16

## Features

N/A

## Bug Fixes

Ensure version was properly reflected in source code for git tag.

# new imgix.js 1.0.15

## Features

`imgix.fluid` now supports `maxHeight` and `maxWidth` options to ensure no requests over this size are requested automatically via imgix.js. This both default to 5000.

## Bug Fixes

N/A


# new imgix.js 1.0.14

## Features

`imgix.fluid` now supports lazy loading of images with when the `lazyLoad` option is set to `true`. This option defaults to `false` for backwards compatibility.

## Bug Fixes

N/A

# new imgix.js 1.0.13

## Features

Add support for the imgix blend API.

## Bug Fixes

N/A


# new imgix.js 1.0.12

## Features

Respect protocol of request.

## Bug Fixes

N/A

# new imgix.js 1.0.11

## Features

`imgix.fluid` now supports an `ignoreDPR` option that when set to `true` __never__ sets the `dpr` imgix param (even on retina screens). This option defaults to `false` for backwards compatibility

## Bug Fixes

N/A

## Breaking Changes

N/A

# new imgix.js 1.0.10

## Features

#### Support for blending params

###### Setters
* [URL.setBlend(val)](docs/api.md#imgix.URL#setBlend)
* [URL.setBlendWidth(val)](docs/api.md#imgix.URL#setBlendWidth)
* [URL.setBlendHeight(val)](docs/api.md#imgix.URL#setBlendHeight)
* [URL.setBlendPadding(val)](docs/api.md#imgix.URL#setBlendPadding)
* [URL.setBlendFit(val)](docs/api.md#imgix.URL#setBlendFit)
* [URL.setBlendAlpha(val)](docs/api.md#imgix.URL#setBlendAlpha)

###### Getters
* [URL.getBlend()](docs/api.md#imgix.URL#getBlend)
* [URL.getBlendWidth()](docs/api.md#imgix.URL#getBlendWidth)
* [URL.getBlendHeight()](docs/api.md#imgix.URL#getBlendHeight)
* [URL.getBlendPadding()](docs/api.md#imgix.URL#getBlendPadding)
* [URL.getBlendFit()](docs/api.md#imgix.URL#getBlendFit)
* [URL.getBlendAlpha()](docs/api.md#imgix.URL#getBlendAlpha)

#### Support chaining setters

For example:

    var i = new imgix.URL('http://static-a.imgix.net/macaw.png');
    i.setSepia(50).setWidth(50).setHeight(100);
    i.attachImageTo('.macaw');

## Bug Fixes

`imgix.fluid` now supports a `token` option for signing images.

    var opts = {
        token: "TOKEN_HERE"
    }

    imgix.onready(function() {
        imgix.fluid(opts);
    });

## Breaking Changes

N/A
