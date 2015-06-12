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
