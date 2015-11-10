<!--- THIS IS AUTO GENERATED FROM JSDOCS. DO NOT EDIT DIRECTLY. ---> 

![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)


## imgix : <code>object</code>
`imgix` is the root namespace for all imgix client code.

**Kind**: global namespace  

* [imgix](#imgix.js Documentation) : <code>object</code>
  * [.URL](#imgix.URL)
    * [.attachGradientTo(elemOrSel, baseColor)](#imgix.URL+attachGradientTo)
    * [.attachImageTo(elemOrSel, callback)](#imgix.URL+attachImageTo)
    * [.autoUpdateImg(sel, callback)](#imgix.URL+autoUpdateImg)
    * [.clearParams(runUpdate)](#imgix.URL+clearParams)
    * [.clearThenSetParams(params)](#imgix.URL+clearThenSetParams)
    * [.getBaseUrl()](#imgix.URL+getBaseUrl) ⇒ <code>string</code>
    * [.getColors(num, callback)](#imgix.URL+getColors)
    * [.getParam(param)](#imgix.URL+getParam) ⇒ <code>string</code>
    * [.getParams()](#imgix.URL+getParams) ⇒ <code>object</code>
    * [.getQueryString()](#imgix.URL+getQueryString) ⇒ <code>string</code>
    * [.getUrl()](#imgix.URL+getUrl) ⇒ <code>string</code>
    * [new imgix.URL(url, imgParams)](#new_imgix.URL_new)
    * [.removeParam(param)](#imgix.URL+removeParam)
    * [.setParam(param, value, doOverride, noUpdate)](#imgix.URL+setParam)
    * [.setParams(dict, doOverride)](#imgix.URL+setParams)
  * [.applyAlphaToRGB(color, alpha)](#imgix.applyAlphaToRGB) ⇒ <code>string</code>
  * [.fluid([rootNode], config)](#imgix.fluid)
  * [.getBackgroundImage(el)](#imgix.getBackgroundImage) ⇒ <code>string</code>
  * [.getColorBrightness(color)](#imgix.getColorBrightness) ⇒ <code>Number</code>
  * [.getElementImage(el)](#imgix.getElementImage) ⇒ <code>string</code>
  * [.getElementsWithImages()](#imgix.getElementsWithImages) ⇒ <code>NodeList</code>
  * [.getEmptyImage()](#imgix.getEmptyImage) ⇒ <code>string</code>
  * [.hasClass(elem, name)](#imgix.hasClass) ⇒ <code>boolean</code>
  * [.hasImage(el)](#imgix.hasImage) ⇒ <code>boolean</code>
  * [.helpers](#imgix.helpers) : <code>object</code>
  * [.hexToRGB(color)](#imgix.hexToRGB) ⇒ <code>string</code>
  * [.isImageElement(el)](#imgix.isImageElement) ⇒ <code>boolean</code>
  * [.onready](#imgix.onready)
  * [.rgbToHex(color)](#imgix.rgbToHex) ⇒ <code>string</code>
  * [.setElementImage(el, url)](#imgix.setElementImage) ⇒ <code>boolean</code>
  * [.setElementImageAfterLoad(el, url, callback)](#imgix.setElementImageAfterLoad)

<a name="imgix.URL"></a>
### imgix.URL
**Kind**: static class of <code>[imgix](#imgix)</code>  

* [.URL](#imgix.URL)
  * [.attachGradientTo(elemOrSel, baseColor)](#imgix.URL+attachGradientTo)
  * [.attachImageTo(elemOrSel, callback)](#imgix.URL+attachImageTo)
  * [.autoUpdateImg(sel, callback)](#imgix.URL+autoUpdateImg)
  * [.clearParams(runUpdate)](#imgix.URL+clearParams)
  * [.clearThenSetParams(params)](#imgix.URL+clearThenSetParams)
  * [.getBaseUrl()](#imgix.URL+getBaseUrl) ⇒ <code>string</code>
  * [.getColors(num, callback)](#imgix.URL+getColors)
  * [.getParam(param)](#imgix.URL+getParam) ⇒ <code>string</code>
  * [.getParams()](#imgix.URL+getParams) ⇒ <code>object</code>
  * [.getQueryString()](#imgix.URL+getQueryString) ⇒ <code>string</code>
  * [.getUrl()](#imgix.URL+getUrl) ⇒ <code>string</code>
  * [new imgix.URL(url, imgParams)](#new_imgix.URL_new)
  * [.removeParam(param)](#imgix.URL+removeParam)
  * [.setParam(param, value, doOverride, noUpdate)](#imgix.URL+setParam)
  * [.setParams(dict, doOverride)](#imgix.URL+setParams)

<a name="imgix.URL+attachGradientTo"></a>
#### URL.attachGradientTo(elemOrSel, baseColor)
Attach a gradient of colors from the imgix image URL to the passed html element (or selector for that element)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| elemOrSel | <code>string</code> | html elment or css selector for the element |
| baseColor | <code>string</code> | color in rgb or hex |

<a name="imgix.URL+attachImageTo"></a>
#### URL.attachImageTo(elemOrSel, callback)
Attach the image url (.getUrl() value) to the passed html element (or selector for that element)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| elemOrSel | <code>string</code> | html elment or css selector for the element |
| callback | <code>function</code> | optional callback to be called when image is set on the element |

<a name="imgix.URL+autoUpdateImg"></a>
#### URL.autoUpdateImg(sel, callback)
When/if the url changes it will auto re-set the image on the element of the css selector passed

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| sel | <code>string</code> | css selector for an <img> element on the page |
| callback | <code>[autoUpdateElementCallback](#autoUpdateElementCallback)</code> | fires whenever the img element is updated |

<a name="imgix.URL+clearParams"></a>
#### URL.clearParams(runUpdate)
Clear all imgix params attached to the image

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| runUpdate | <code>boolean</code> | (optional) iff using autoUpdateImg should callback be called (defaults to true) |

<a name="imgix.URL+clearThenSetParams"></a>
#### URL.clearThenSetParams(params)
Remove an imgix param then immediately set new params. This only triggers one update if used with autoUpdateImg.

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | object of params to set |

<a name="imgix.URL+getBaseUrl"></a>
#### URL.getBaseUrl() ⇒ <code>string</code>
Get the base url. This is getUrl() without the query string

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>string</code> - the base url  
<a name="imgix.URL+getColors"></a>
#### URL.getColors(num, callback)
Get an array of the colors in the image

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | Desired number of colors |
| callback | <code>[colorsCallback](#colorsCallback)</code> | handles the response of colors |

<a name="imgix.URL+getParam"></a>
#### URL.getParam(param) ⇒ <code>string</code>
Get the value of an imgix param in the query string

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>string</code> - the value of the param in the current url  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> | the imgix param that you want the value of (e.g. txtclr) |

<a name="imgix.URL+getParams"></a>
#### URL.getParams() ⇒ <code>object</code>
Get an object of all the params and their values on the current image

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>object</code> - an object of params and their values (e.g. {txt: 'hello', txtclr: 'f00'})  
<a name="imgix.URL+getQueryString"></a>
#### URL.getQueryString() ⇒ <code>string</code>
Get the query string only. This is getUrl() with ONLY the query string (e.g. ?txt=hello&txtclr=f00)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>string</code> - the query string for the url  
<a name="imgix.URL+getUrl"></a>
#### URL.getUrl() ⇒ <code>string</code>
The generated imgix image url

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>string</code> - the generated url  
<a name="new_imgix.URL_new"></a>
#### new imgix.URL(url, imgParams)
Represents an imgix url


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | An imgix url to start with (optional) |
| imgParams | <code>object</code> | imgix query string params (optional) |

<a name="imgix.URL+removeParam"></a>
#### URL.removeParam(param)
Remove an imgix param

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> | the imgix param to remove (e.g. txtfont) |

<a name="imgix.URL+setParam"></a>
#### URL.setParam(param, value, doOverride, noUpdate)
Set a single imgix param value

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> | the imgix param to set (e.g. txtclr) |
| value | <code>string</code> | the value to set for the param |
| doOverride | <code>boolean</code> | (optional) should the value(s) be overridden if they already exist (defaults to true) |
| noUpdate | <code>boolean</code> | (optional) iff using autoUpdateImg should callback be called (defaults to false) |

<a name="imgix.URL+setParams"></a>
#### URL.setParams(dict, doOverride)
Set multiple params using using an object (e.g. {txt: 'hello', txtclr: 'f00'})

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| dict | <code>object</code> | an object of imgix params and their values |
| doOverride | <code>boolean</code> | should the value(s) be overridden if they already exist (defaults to true) |

<a name="imgix.applyAlphaToRGB"></a>
### imgix.applyAlphaToRGB(color, alpha) ⇒ <code>string</code>
Apply alpha to a RGB color string

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - color in rgba format rgb(255, 0, 255, 0.5)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | a color in rgb(r, g, b) format |
| alpha | <code>number</code> | aplpha amount 1=opaque 0=transparent |

<a name="imgix.fluid"></a>
### imgix.fluid([rootNode], config)
Enables fluid (responsive) images for any element(s) with the 'imgix-fluid' class.
To scope to images within a specific DOM node, pass the enclosing HTML element as the first argument.


#####Option Descriptions

`fluidClass` __string__ all elements with this class will have responsive images<br>

`updateOnResize` __boolean__ should it request a new bigger image when container grows<br>

`updateOnResizeDown` __boolean__ should it request a new smaller image when container shrinks<br>

`updateOnPinchZoom` __boolean__ should it request a new image when pinching on a mobile
 device<br>

`highDPRAutoScaleQuality` __boolean__ should it automatically use a lower quality image on high DPR devices. This is usually nearly undetectable by a human, but offers a significant decrease in file size.<br>

`onChangeParamOverride` __function__ if defined the following are passed (__number__ h, __number__ w, __object__ params, __HTMLElement__ element). When an object of params is returned they are applied to the image<br>

`autoInsertCSSBestPractices` __boolean__ should it automatically add `backgroundRepeat = 'no-repeat`; `elem.style.backgroundSize = 'cover'` `elem.style.backgroundPosition = '50% 50%'` to elements with a background image<br>

`fitImgTagToContainerWidth` __boolean__ should it fit img tag elements to their container's width. Does not apply to background images.<br>

`fitImgTagToContainerHeight` __boolean__ should it fit img tag elements to their container's height. Does not apply to background images.<br>

`pixelStep` __number__ image dimensions are rounded to this (e.g. for 10 the value 333 would be rounded to 340)<br>

`ignoreDPR` __boolean__ when true the `dpr` param is not set on the image.<br>

`debounce` __number__ postpones resize execution until after this many milliseconds have elapsed since the last time it was invoked.<br>

`lazyLoad` __boolean__ when true the image is not actually loaded until it is viewable (or within the offset)<br>

`lazyLoadOffsetVertical` __number__ when `lazyLoad` is true this allows you to set how far above and below the viewport (in pixels) you want before imgix.js starts to load the images.<br>

`lazyLoadOffsetHorizontal` __number__ when `lazyLoad` is true this allows you to set how far to the left and right of the viewport (in pixels) you want before imgix.js starts to load the images.<br>

`lazyLoadColor` __boolean__ or __number__ or __function__ When defined the image container's background is set to a color in the image. When value is `true` use first color in the color array, when value is a `number` use that index from the color array, when value is a `function` it uses whatever color is returned by the function (`HTMLElement' el, `Array` colors)

`throttle` __number__ ensures scroll events fire only once every n milliseconds, throttling lazyLoad activity.<br>

`maxWidth` __number__ Never set the width parameter higher than this value.<br>

`maxHeight` __number__ Never set the height parameter higher than this value.<br>

`onLoad` __function__ Called when an image is loaded. It's passed the `HTMLElement` that contains the image that was just loaded and the URL of that image (`HTMLElement' el, `String` imageURL)<br>

 <b>Default values</b> (passed config will extend these values)

  {
    fluidClass: 'imgix-fluid',
    updateOnResize: true,
    updateOnResizeDown: false,
    updateOnPinchZoom: false,
    highDPRAutoScaleQuality: true,
    onChangeParamOverride: null,
    autoInsertCSSBestPractices: false,
    fitImgTagToContainerWidth: true,
    fitImgTagToContainerHeight: false,
    pixelStep: 10,
    debounce: 200,
    ignoreDPR: false,
    lazyLoad: false,
    lazyLoadOffsetVertical: 20,
    lazyLoadOffsetHorizontal: 20,
    throttle: 200,
    maxWidth: 5000,
    maxHeight: 5000,
    onLoad: null
  }

**Kind**: static method of <code>[imgix](#imgix)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [rootNode] |  | <code>document</code> | optional HTML element to scope operations on |
| config | <code>object</code> |  | options for fluid (this extends the defaults) |

<a name="imgix.getBackgroundImage"></a>
### imgix.getBackgroundImage(el) ⇒ <code>string</code>
Returns the background image for an element

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - url of the image on the element  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to check |

<a name="imgix.getColorBrightness"></a>
### imgix.getColorBrightness(color) ⇒ <code>Number</code>
Gives a brightness score for a given color (higher is brighter)

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>Number</code> - brightness score for the passed color  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | a color in rgb(r, g, b) format |

<a name="imgix.getElementImage"></a>
### imgix.getElementImage(el) ⇒ <code>string</code>
Intelligently returns the image on the element

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - url of the image on the element  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to check |

<a name="imgix.getElementsWithImages"></a>
### imgix.getElementsWithImages() ⇒ <code>NodeList</code>
Gives all elements on the page that have images (or could img). Does NOT support IE8

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>NodeList</code> - html elements with images  
<a name="imgix.getEmptyImage"></a>
### imgix.getEmptyImage() ⇒ <code>string</code>
An empty 1x1 transparent image

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - url of an empty image  
<a name="imgix.hasClass"></a>
### imgix.hasClass(elem, name) ⇒ <code>boolean</code>
Checks if an element has a class applied (via jquery)

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true if element has the class  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Element</code> | element to check for class |
| name | <code>string</code> | class name to look for |

<a name="imgix.hasImage"></a>
### imgix.hasImage(el) ⇒ <code>boolean</code>
Does an element have an image attached

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true if passed element has an image  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | element to check for images |

<a name="imgix.helpers"></a>
### imgix.helpers : <code>object</code>
The helper namespace for lower-level functions

**Kind**: static namespace of <code>[imgix](#imgix)</code>  
<a name="imgix.hexToRGB"></a>
### imgix.hexToRGB(color) ⇒ <code>string</code>
Converts a hex color to rgb (#ff00ff -> rgb(255, 0, 255)

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - color in rgb format rgb(255, 0, 255)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | a color in hex format (#ff00ff) |

<a name="imgix.isImageElement"></a>
### imgix.isImageElement(el) ⇒ <code>boolean</code>
Reports if an element is an image tag

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true if the element is an img tag  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to check |

<a name="imgix.onready"></a>
### imgix.onready
Runs a function when the DOM is ready (similar to jQuery.ready)

**Kind**: static property of <code>[imgix](#imgix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ready | <code>function</code> | the function to run when the DOM is ready. |

<a name="imgix.rgbToHex"></a>
### imgix.rgbToHex(color) ⇒ <code>string</code>
Helper method to turn rgb(255, 255, 255) style colors to hex (ffffff)

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - passed color converted to hex  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | in rgb(255, 255, 255) format |

<a name="imgix.setElementImage"></a>
### imgix.setElementImage(el, url) ⇒ <code>boolean</code>
Intelligently sets an image on an element.

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true on success  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to check |
| url | <code>string</code> | the url of the image to set |

<a name="imgix.setElementImageAfterLoad"></a>
### imgix.setElementImageAfterLoad(el, url, callback)
Intelligently sets an image on an element after the image has been cached.

**Kind**: static method of <code>[imgix](#imgix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to place the image on |
| url | <code>string</code> | the url of the image to set |
| callback | <code>function</code> | called once image has been preloaded and set |

