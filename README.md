# imgix.js

## Development

`npm run build && npm test`


### Resources

* [Srcset and sizes by Eric Portis](https://ericportis.com/posts/2014/srcset-sizes/). A seminal article on `srcset`, `sizes`, and `picture`. Explains why they're necessary, and how they work together.
* [Using imgix with `<picture>`](https://docs.imgix.com/tutorials/using-imgix-picture-element). Discusses the differences between art direction and resolution switching, and provides examples of how to accomplish art direction with imgix.
* [Responsive Images with `srcset` and imgix](https://docs.imgix.com/tutorials/responsive-images-srcset-imgix). A look into how imgix can work with `srcset` and `sizes` to serve the right image.


### Compatibility Notes

* If you are using [Base64 variant params](https://docs.imgix.com/apis/url#base64-variants) and need IE <= 9 support, we recommend using a polyfill for `atob`/`btoa`, such as [Base64.js](https://github.com/davidchambers/Base64.js).
* By default, browsers that don't support [`srcset`](http://caniuse.com/#feat=srcset), [`sizes`](http://caniuse.com/#feat=srcset), or [`picture`](http://caniuse.com/#feat=picture) will gracefully fall back to the default `img` `src` when appropriate. If you want these browsers to display responsive images in these cases instead, we recommend using [Picturefill](https://github.com/scottjehl/picturefill).
