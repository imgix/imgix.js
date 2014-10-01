#Index

**Namespaces**

* [imgix](#imgix)
  * [imgix.onready](#imgix.onready)
  * [imgix.getElementByXPathClassName(xpath)](#imgix.getElementByXPathClassName)
  * [imgix.getElementImageByXPathClassName(xpath)](#imgix.getElementImageByXPathClassName)
  * [imgix.isImageElement(el)](#imgix.isImageElement)
  * [imgix.setElementImageAfterLoad(el, url, callback)](#imgix.setElementImageAfterLoad)
  * [imgix.setElementImage(el, url)](#imgix.setElementImage)
  * [imgix.getEmptyImage()](#imgix.getEmptyImage)
  * [imgix.getElementImage(el)](#imgix.getElementImage)
  * [imgix.getRawBackgroundImage(el)](#imgix.getRawBackgroundImage)
  * [imgix.getBackgroundImage(el)](#imgix.getBackgroundImage)
  * [imgix.getColorBrightness(color)](#imgix.getColorBrightness)
  * [imgix.getElementsWithImages(color)](#imgix.getElementsWithImages)
  * [imgix.hasImage(element)](#imgix.hasImage)
  * [imgix.markElementsWithImages()](#imgix.markElementsWithImages)
  * [imgix.hasClass(element, name)](#imgix.hasClass)
  * [imgix.setImgixClass(el)](#imgix.setImgixClass)
  * [imgix.getImgixClass()](#imgix.getImgixClass)
  * [imgix.rgbToHex(color)](#imgix.rgbToHex)
  * [imgix.fluid(config)](#imgix.fluid)
  * [imgix.helpers](#imgix.helpers)
  * [class: imgix.URL](#imgix.URL)
    * [new imgix.URL(url, imgParams, token)](#new_imgix.URL)
    * [uRL.getColors(num, callback)](#imgix.URL#getColors)
    * [uRL.autoUpdateImg(sel, callback)](#imgix.URL#autoUpdateImg)
    * [uRL.getUrl()](#imgix.URL#getUrl)
    * [uRL.removeParam()](#imgix.URL#removeParam)

**Typedefs**

* [callback: colorsCallback](#colorsCallback)
* [callback: autoUpdateElementCallback](#autoUpdateElementCallback)
 
<a name="imgix"></a>
#imgix
The root namespace for all imgix client code.

**Members**

* [imgix](#imgix)
  * [imgix.onready](#imgix.onready)
  * [imgix.getElementByXPathClassName(xpath)](#imgix.getElementByXPathClassName)
  * [imgix.getElementImageByXPathClassName(xpath)](#imgix.getElementImageByXPathClassName)
  * [imgix.isImageElement(el)](#imgix.isImageElement)
  * [imgix.setElementImageAfterLoad(el, url, callback)](#imgix.setElementImageAfterLoad)
  * [imgix.setElementImage(el, url)](#imgix.setElementImage)
  * [imgix.getEmptyImage()](#imgix.getEmptyImage)
  * [imgix.getElementImage(el)](#imgix.getElementImage)
  * [imgix.getRawBackgroundImage(el)](#imgix.getRawBackgroundImage)
  * [imgix.getBackgroundImage(el)](#imgix.getBackgroundImage)
  * [imgix.getColorBrightness(color)](#imgix.getColorBrightness)
  * [imgix.getElementsWithImages(color)](#imgix.getElementsWithImages)
  * [imgix.hasImage(element)](#imgix.hasImage)
  * [imgix.markElementsWithImages()](#imgix.markElementsWithImages)
  * [imgix.hasClass(element, name)](#imgix.hasClass)
  * [imgix.setImgixClass(el)](#imgix.setImgixClass)
  * [imgix.getImgixClass()](#imgix.getImgixClass)
  * [imgix.rgbToHex(color)](#imgix.rgbToHex)
  * [imgix.fluid(config)](#imgix.fluid)
  * [imgix.helpers](#imgix.helpers)
  * [class: imgix.URL](#imgix.URL)
    * [new imgix.URL(url, imgParams, token)](#new_imgix.URL)
    * [uRL.getColors(num, callback)](#imgix.URL#getColors)
    * [uRL.autoUpdateImg(sel, callback)](#imgix.URL#autoUpdateImg)
    * [uRL.getUrl()](#imgix.URL#getUrl)
    * [uRL.removeParam()](#imgix.URL#removeParam)

<a name="imgix.onready"></a>
##imgix.onready
Runs a function when the DOM is ready (similar to jQuery.ready)

**Params**

- config `object` - options for fluid  

<a name="imgix.getElementByXPathClassName"></a>
##imgix.getElementByXPathClassName(xpath)
Get html element by auto-generated (via XPath) class name

**Params**

- xpath `string` - the xpath of the element  

**Returns**: `Element` - element with the xpath  
<a name="imgix.getElementImageByXPathClassName"></a>
##imgix.getElementImageByXPathClassName(xpath)
Get image from an html element by auto-generated (via XPath) class name

**Params**

- xpath `string` - the xpath of the element to get  

**Returns**: `string` - url of image on the element  
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

- color `string` - in rgb(r, g, b) format  

**Returns**: `Number` - brightness score for the passed color  
<a name="imgix.getElementsWithImages"></a>
##imgix.getElementsWithImages(color)
Gives all elements on the page that have images (or could img)

**Params**

- color `string` - in rgb(r, g, b) format  

**Returns**: `NodeList` - html elements with images  
<a name="imgix.hasImage"></a>
##imgix.hasImage(element)
Does an element have an image attached

**Params**

- element `Element` - to check for images  

**Returns**: `boolean` - true if passed element has an image  
<a name="imgix.markElementsWithImages"></a>
##imgix.markElementsWithImages()
Helper method that attaches IMGIX_CLASS to all elements with images on a page

<a name="imgix.hasClass"></a>
##imgix.hasClass(element, name)
Checks if an element has a class applied (via jquery)

**Params**

- element `Element` - to check for class  
- name `string` - of class to look for  

**Returns**: `boolean` - true if element has the class  
<a name="imgix.setImgixClass"></a>
##imgix.setImgixClass(el)
Helper method that "marks" an element as "imgix usable" by adding special classes

**Params**

- el `Element` - the element to place the class on  

**Returns**: `string` - auto-generated class name (via xpath)  
<a name="imgix.getImgixClass"></a>
##imgix.getImgixClass()
Helper method that returns generated (via xpath) class name for "marked" image elements

**Returns**: `string` - class  
<a name="imgix.rgbToHex"></a>
##imgix.rgbToHex(color)
Helper method to turn rgb(255, 255, 255) style colors to hex (ffffff)

**Params**

- color `string` - in rgb(255, 255, 255) format  

**Returns**: `string` - passed color converted to hex  
<a name="imgix.fluid"></a>
##imgix.fluid(config)
Enables fluid images for any element(s) with the "imgix-fluid" class

**Params**

- config `object` - options for fluid  

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
  * [uRL.getColors(num, callback)](#imgix.URL#getColors)
  * [uRL.autoUpdateImg(sel, callback)](#imgix.URL#autoUpdateImg)
  * [uRL.getUrl()](#imgix.URL#getUrl)
  * [uRL.removeParam()](#imgix.URL#removeParam)

<a name="new_imgix.URL"></a>
###new imgix.URL(url, imgParams, token)
Represents an imgix url

**Params**

- url `string` - An imgix url to start with (optional)  
- imgParams `object` - imgix query string params (optional)  
- token `object` - secure url token for signing images (optional)  

<a name="imgix.URL#getColors"></a>
###uRL.getColors(num, callback)
Get an array of the colors in the image

**Params**

- num `number` - Desired number of colors  
- callback <code>[colorsCallback](#colorsCallback)</code> - handles the response of colors  

<a name="imgix.URL#autoUpdateImg"></a>
###uRL.autoUpdateImg(sel, callback)
When/if the url changes it will auto re-set the image on the element of the css selector passed

**Params**

- sel `string` - css selector for an <img> element on the page  
- callback <code>[autoUpdateElementCallback](#autoUpdateElementCallback)</code> - fires whenever the img element is updated  

<a name="imgix.URL#getUrl"></a>
###uRL.getUrl()
The generated imgix image url

**Returns**: `string` - the url  
<a name="imgix.URL#removeParam"></a>
###uRL.removeParam()
Remove an imgix param

**Returns**: `string` - the url  
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
