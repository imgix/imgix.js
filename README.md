# imgix.js



### Compatibility Notes

* If you are using [Base64 variant params](https://docs.imgix.com/apis/url#base64-variants) and need IE <= 9 support, you should use a polyfill for `atob`/`btoa` support, such as [Base64.js](https://github.com/davidchambers/Base64.js).
* By default, browsers that don't support [`srcset`](http://caniuse.com/#feat=srcset), [`sizes`](http://caniuse.com/#feat=srcset), or [`picture`](http://caniuse.com/#feat=picture) will gracefully fall back to the default `img` `src` when appropriate. If you want these browsers to display responsive images in these cases instead, we recommend using [Picturefill](https://github.com/scottjehl/picturefill).
