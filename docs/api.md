<!--- THIS IS AUTO GENERATED FROM JSDOCS. DO NOT EDIT DIRECTLY. ---> 

![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)


#imgix.js Documentation
The root namespace for all imgix client code.

**Members**

* [imgix](#imgix)
  * [imgix.onready](#imgix.onready)
  * [imgix.isImageElement(el)](#imgix.isImageElement)
  * [imgix.setElementImageAfterLoad(el, url, callback)](#imgix.setElementImageAfterLoad)
  * [imgix.setElementImage(el, url)](#imgix.setElementImage)
  * [imgix.getEmptyImage()](#imgix.getEmptyImage)
  * [imgix.getElementImage(el)](#imgix.getElementImage)
  * [imgix.getRawBackgroundImage(el)](#imgix.getRawBackgroundImage)
  * [imgix.getBackgroundImage(el)](#imgix.getBackgroundImage)
  * [imgix.getColorBrightness(color)](#imgix.getColorBrightness)
  * [imgix.hexToRGB(color)](#imgix.hexToRGB)
  * [imgix.getElementsWithImages()](#imgix.getElementsWithImages)
  * [imgix.hasImage(el)](#imgix.hasImage)
  * [imgix.markElementsWithImages()](#imgix.markElementsWithImages)
  * [imgix.hasClass(elem, name)](#imgix.hasClass)
  * [imgix.setImgixClass(el)](#imgix.setImgixClass)
  * [imgix.getImgixClass(el)](#imgix.getImgixClass)
  * [imgix.rgbToHex(color)](#imgix.rgbToHex)
  * [imgix.getFontLookup()](#imgix.getFontLookup)
  * [imgix.getFonts()](#imgix.getFonts)
  * [imgix.fluid(config)](#imgix.fluid)
  * [imgix.helpers](#imgix.helpers)
  * [class: imgix.URL](#imgix.URL)
    * [new imgix.URL(url, imgParams, token)](#new_imgix.URL)
    * [URL.attachImageTo(elemOrSel, callback)](#imgix.URL#attachImageTo)
    * [URL.setToken(token)](#imgix.URL#setToken)
    * [URL.getColors(num, callback)](#imgix.URL#getColors)
    * [URL.autoUpdateImg(sel, callback)](#imgix.URL#autoUpdateImg)
    * [URL.getUrl()](#imgix.URL#getUrl)
    * [URL.removeParam(param)](#imgix.URL#removeParam)
    * [URL.clearThenSetParams(params)](#imgix.URL#clearThenSetParams)
    * [URL.clearParams(runUpdate)](#imgix.URL#clearParams)
    * [URL.setParams(dict, doOverride)](#imgix.URL#setParams)
    * [URL.setParam(param, value, doOverride, noUpdate)](#imgix.URL#setParam)
    * [URL.getParam(param)](#imgix.URL#getParam)
    * [URL.getParams()](#imgix.URL#getParams)
    * [URL.getBaseUrl()](#imgix.URL#getBaseUrl)
    * [URL.getQueryString()](#imgix.URL#getQueryString)

<a name="imgix.onready"></a>
##imgix.onready
Runs a function when the DOM is ready (similar to jQuery.ready)

**Params**

- config `object` - options for fluid  

<a name="imgix.isImageElement"></a>
##imgix.isImageElement(el)
Reports if an element is an image tag

**Params**

- el `Element` - the element to check  

**Returns**: `boolean` - true if the element is an img tag  
<a name="imgix.setElementImageAfterLoad"></a>
##imgix.setElementImageAfterLoad(el, url, callback)
Intelligently sets an image on an element after the image has been cached.

**Params**

- el `Element` - the element to place the image on  
- url `string` - the url of the image to set  
- callback `function` - called once image has been preloaded and set  

<a name="imgix.setElementImage"></a>
##imgix.setElementImage(el, url)
Intelligently sets an image on an element.

**Params**

- el `Element` - the element to check  
- url `string` - the url of the image to set  

**Returns**: `boolean` - true on success  
<a name="imgix.getEmptyImage"></a>
##imgix.getEmptyImage()
An empty 1x1 transparent image

**Returns**: `string` - url of an empty image  
<a name="imgix.getElementImage"></a>
##imgix.getElementImage(el)
Intelligently returns the image on the element

**Params**

- el `Element` - the element to check  

**Returns**: `string` - url of the image on the element  
<a name="imgix.getRawBackgroundImage"></a>
##imgix.getRawBackgroundImage(el)
Returns the matches for the url on the element's cssText

**Params**

- el `Element` - the element to check  

**Returns**: `string` - url of the image on the element  
<a name="imgix.getBackgroundImage"></a>
##imgix.getBackgroundImage(el)
Returns the background image for an element

**Params**

- el `Element` - the element to check  

**Returns**: `string` - url of the image on the element  
<a name="imgix.getColorBrightness"></a>
##imgix.getColorBrightness(color)
Gives a brightness score for a given color (higher is brighter)

**Params**

- color `string` - a color in rgb(r, g, b) format  

**Returns**: `Number` - brightness score for the passed color  
<a name="imgix.hexToRGB"></a>
##imgix.hexToRGB(color)
Converts a hex color to rgb (#ff00ff -> rgb(255, 0, 255)

**Params**

- color `string` - a color in hex format (#ff00ff)  

**Returns**: `string` - color in rgb format rgb(255, 0, 255)  
<a name="imgix.getElementsWithImages"></a>
##imgix.getElementsWithImages()
Gives all elements on the page that have images (or could img). Does NOT support IE8

**Returns**: `NodeList` - html elements with images  
<a name="imgix.hasImage"></a>
##imgix.hasImage(el)
Does an element have an image attached

**Params**

- el `Element` - element to check for images  

**Returns**: `boolean` - true if passed element has an image  
<a name="imgix.markElementsWithImages"></a>
##imgix.markElementsWithImages()
Helper method that attaches IMGIX_CLASS to all elements with images on a page

<a name="imgix.hasClass"></a>
##imgix.hasClass(elem, name)
Checks if an element has a class applied (via jquery)

**Params**

- elem `Element` - element to check for class  
- name `string` - class name to look for  

**Returns**: `boolean` - true if element has the class  
<a name="imgix.setImgixClass"></a>
##imgix.setImgixClass(el)
Helper method that "marks" an element as "imgix usable" by adding special classes

**Params**

- el `Element` - the element to place the class on  

**Returns**: `string` - auto-generated class name (via xpath)  
<a name="imgix.getImgixClass"></a>
##imgix.getImgixClass(el)
Helper method that returns generated (via xpath) class name for "marked" image elements

**Params**

- el `Element` - the element to get the class for  

**Returns**: `string` - class name  
<a name="imgix.rgbToHex"></a>
##imgix.rgbToHex(color)
Helper method to turn rgb(255, 255, 255) style colors to hex (ffffff)

**Params**

- color `string` - in rgb(255, 255, 255) format  

**Returns**: `string` - passed color converted to hex  
<a name="imgix.getFontLookup"></a>
##imgix.getFontLookup()
Returns a font lookup. Pretty Name => name to use with imgix
Example: "American Typewriter Bold" => "American Typewriter,bold",

**Returns**: `objct` - passed color converted to hex  
<a name="imgix.getFonts"></a>
##imgix.getFonts()
Get a list of all the fonts supported by imgix

**Returns**: `array` - An array of strings of the supported font names  
<a name="imgix.fluid"></a>
##imgix.fluid(config)
Enables fluid (responsive) images for any element(s) with the "imgix-fluid" class


#####Option Descriptions

`fluidClass` __string__ all elements with this class will have responsive images<br>

`updateOnResize` __boolean__ should it request a new bigger image when container grows<br>

`updateOnResizeDown` __boolean__ should it request a new smaller image when container shrinks<br>

`updateOnPinchZoom` __boolean__ should it request a new image when pinching on a mobile
 device<br>

`highDPRAutoScaleQuality` __boolean__ should it automatically use a lower quality image on high DPR devices. This is usually nearly undetectable by a human, but offers a significant decrease in file size.<br>

`onChangeParamOverride` __function__ if defined the follwing are passed (__number__ h, __number__ w, __object__ params). When an object of params is returned they are applied to the image<br>

`autoInsertCSSBestPractices` __boolean__ should it automatically add `backgroundRepeat = 'no-repeat`; `elem.style.backgroundSize = 'cover'` `elem.style.backgroundPosition = '50% 50%'` to elements with a background image<br>

`fitImgTagToContainerWidth` __boolean__ should it fit img tag elements to their container's width. Does not apply to background images.<br>

`fitImgTagToContainerHeight` __boolean__ should it fit img tag elements to their container's height. Does not apply to background images.<br>

`pixelStep` __number__ image dimensions are rounded to this (e.g. for 10 the value 333 would be rounded to 340)<br>

 <b>Default values</b> (passed config will extend these values)

	{
		fluidClass: "imgix-fluid",
		updateOnResize: true,
		updateOnResizeDown : false,
		updateOnPinchZoom: false,
		highDPRAutoScaleQuality: true,
		onChangeParamOverride: null,
		autoInsertCSSBestPractices: false,
		fitImgTagToContainerWidth: true,
		fitImgTagToContainerHeight: false,
		pixelStep: 10
	}

**Params**

- config `object` - options for fluid (this extends the defaults)  

<a name="imgix.helpers"></a>
##imgix.helpers
The helper namespace for lower-level functions

**Members**

* [imgix.helpers](#imgix.helpers)

<a name="imgix.URL"></a>
##class: imgix.URL
**Members**

* [class: imgix.URL](#imgix.URL)
  * [new imgix.URL(url, imgParams, token)](#new_imgix.URL)
  * [URL.attachImageTo(elemOrSel, callback)](#imgix.URL#attachImageTo)
  * [URL.setToken(token)](#imgix.URL#setToken)
  * [URL.getColors(num, callback)](#imgix.URL#getColors)
  * [URL.autoUpdateImg(sel, callback)](#imgix.URL#autoUpdateImg)
  * [URL.getUrl()](#imgix.URL#getUrl)
  * [URL.removeParam(param)](#imgix.URL#removeParam)
  * [URL.clearThenSetParams(params)](#imgix.URL#clearThenSetParams)
  * [URL.clearParams(runUpdate)](#imgix.URL#clearParams)
  * [URL.setParams(dict, doOverride)](#imgix.URL#setParams)
  * [URL.setParam(param, value, doOverride, noUpdate)](#imgix.URL#setParam)
  * [URL.getParam(param)](#imgix.URL#getParam)
  * [URL.getParams()](#imgix.URL#getParams)
  * [URL.getBaseUrl()](#imgix.URL#getBaseUrl)
  * [URL.getQueryString()](#imgix.URL#getQueryString)

<a name="new_imgix.URL"></a>
###new imgix.URL(url, imgParams, token)
Represents an imgix url

**Params**

- url `string` - An imgix url to start with (optional)  
- imgParams `object` - imgix query string params (optional)  
- token `object` - secure url token for signing images (optional)  

<a name="imgix.URL#attachImageTo"></a>
###URL.attachImageTo(elemOrSel, callback)
Attach the image url (.getUrl() value) to the passed html element (or selector for that element)

**Params**

- elemOrSel `string` - html elment or css selector for the element  
- callback `function` - optional callback to be called when image is set on the element  

<a name="imgix.URL#setToken"></a>
###URL.setToken(token)
Set the token for signing images. If a token is set it will always sign the generated urls

**Params**

- token `string` - secure url token from your imgix source  

<a name="imgix.URL#getColors"></a>
###URL.getColors(num, callback)
Get an array of the colors in the image

**Params**

- num `number` - Desired number of colors  
- callback <code>[colorsCallback](#colorsCallback)</code> - handles the response of colors  

<a name="imgix.URL#autoUpdateImg"></a>
###URL.autoUpdateImg(sel, callback)
When/if the url changes it will auto re-set the image on the element of the css selector passed

**Params**

- sel `string` - css selector for an <img> element on the page  
- callback <code>[autoUpdateElementCallback](#autoUpdateElementCallback)</code> - fires whenever the img element is updated  

<a name="imgix.URL#getUrl"></a>
###URL.getUrl()
The generated imgix image url

**Returns**: `string` - the generated url  
<a name="imgix.URL#removeParam"></a>
###URL.removeParam(param)
Remove an imgix param

**Params**

- param `string` - the imgix param to remove (e.g. txtfont)  

<a name="imgix.URL#clearThenSetParams"></a>
###URL.clearThenSetParams(params)
Remove an imgix param then immediately set new params. This only triggers one update if used with autoUpdateImg.

**Params**

- params `object` - object of params to set  

<a name="imgix.URL#clearParams"></a>
###URL.clearParams(runUpdate)
Clear all imgix params attached to the image

**Params**

- runUpdate `boolean` - (optional) iff using autoUpdateImg should callback be called (defaults to true)  

<a name="imgix.URL#setParams"></a>
###URL.setParams(dict, doOverride)
Set multiple params using using an object (e.g. {txt: "hello", txtclr: "f00"})

**Params**

- dict `object` - an object of imgix params and their values  
- doOverride `boolean` - should the value(s) be overridden if they already exist (defaults to true)  

<a name="imgix.URL#setParam"></a>
###URL.setParam(param, value, doOverride, noUpdate)
Set a single imgix param value

**Params**

- param `string` - the imgix param to set (e.g. txtclr)  
- value `string` - the value to set for the param  
- doOverride `boolean` - (optional) should the value(s) be overridden if they already exist (defaults to true)  
- noUpdate `boolean` - (optional) iff using autoUpdateImg should callback be called (defaults to false)  

<a name="imgix.URL#getParam"></a>
###URL.getParam(param)
Get the value of an imgix param in the query string

**Params**

- param `string` - the imgix param that you want the value of (e.g. txtclr)  

**Returns**: `string` - the value of the param in the current url  
<a name="imgix.URL#getParams"></a>
###URL.getParams()
Get an object of all the params and their values on the current image

**Returns**: `object` - an object of params and their values (e.g. {txt: "hello", txtclr: "f00"})  
<a name="imgix.URL#getBaseUrl"></a>
###URL.getBaseUrl()
Get the base url. This is getUrl() without the query string

**Returns**: `string` - the base url  
<a name="imgix.URL#getQueryString"></a>
###URL.getQueryString()
Get the query string only. This is getUrl() with ONLY the query string (e.g. ?txt=hello&txtclr=f00)

**Returns**: `string` - the query string for the url  
<a name="colorsCallback"></a>
#callback: colorsCallback
This callback has the colors...

**Params**

- colors `array` - an array of colors  

**Type**: `function`  
<a name="autoUpdateElementCallback"></a>
#callback: autoUpdateElementCallback
**Params**

- obj `object` - information about element and image  

**Type**: `function`  
