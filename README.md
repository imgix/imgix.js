imgix-javascript
================

The Javascript client library for imgix.

* [imgix.js home page](http://www.imgix.com/imgix-js) (overview and examples)
* [imgix.js API Documentation](docs.md)
* [imgix API Documentation](http://www.imgix.com/docs)

Getting Started
---------------

If you don't already have an imgix account then signup at [imgix.com](http://www.imgix.com). Once your imgix source is created then simply add `imgix.min.js` (and if you're using jquery you can optionally add `imgix.jquery.js`) from the `dist` directory.


Dependencies
------------

The library itself has no dependencies. If you want to build from source, run tests, or contribute then you'll need `node` / `npm`.

Browser Support
---------------
`imgix.js` should support all browsers back to and including Internet Explorer 8. This requires a number of polyfills to be included in its source. If you're using `imgix.js` as part of a larger webapp that already supports IE8 (or you do not care about supporting it) then you can build `imgix.js` without these polyfills.

    $ cd imgix-javascript
    $ npm install # if you haven't already
    $ grunt build --no-polyfills

Now you'll have a much smaller version of `imgix.js` and `imgix.min.js` in the `dist/` directory.

