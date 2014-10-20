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
