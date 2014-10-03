<!--- THIS IS AUTO GENERATED FROM JSDOCS. DO NOT EDIT DIRECTLY. ---> 

![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)


#imgix.js Documentation
`imgix` is the root namespace for all imgix client code.

**Members**

* [imgix](#imgix)
  * [imgix.onready](#imgix.onready)
  * [imgix.isImageElement(el)](#imgix.isImageElement)
  * [imgix.setElementImageAfterLoad(el, url, callback)](#imgix.setElementImageAfterLoad)
  * [imgix.setElementImage(el, url)](#imgix.setElementImage)
  * [imgix.getEmptyImage()](#imgix.getEmptyImage)
  * [imgix.getElementImage(el)](#imgix.getElementImage)
  * [imgix.getBackgroundImage(el)](#imgix.getBackgroundImage)
  * [imgix.getColorBrightness(color)](#imgix.getColorBrightness)
  * [imgix.hexToRGB(color)](#imgix.hexToRGB)
  * [imgix.getElementsWithImages()](#imgix.getElementsWithImages)
  * [imgix.hasImage(el)](#imgix.hasImage)
  * [imgix.hasClass(elem, name)](#imgix.hasClass)
  * [imgix.rgbToHex(color)](#imgix.rgbToHex)
  * [imgix.getFontLookup()](#imgix.getFontLookup)
  * [imgix.getFonts()](#imgix.getFonts)
  * [imgix.fluid(config)](#imgix.fluid)
  * [imgix.helpers](#imgix.helpers)
  * [class: imgix.URL](#imgix.URL)
    * [new imgix.URL(url, imgParams, token)](#new_imgix.URL)
    * [URL.setSepia(val)](#imgix.URL#setSepia)
    * [URL.setCrop(val)](#imgix.URL#setCrop)
    * [URL.setFit(val)](#imgix.URL#setFit)
    * [URL.setHeight(val)](#imgix.URL#setHeight)
    * [URL.setWidth(val)](#imgix.URL#setWidth)
    * [URL.setRotate(val)](#imgix.URL#setRotate)
    * [URL.setFlip(val)](#imgix.URL#setFlip)
    * [URL.setOrient(val)](#imgix.URL#setOrient)
    * [URL.setDPR(val)](#imgix.URL#setDPR)
    * [URL.setHue(val)](#imgix.URL#setHue)
    * [URL.setSaturation(val)](#imgix.URL#setSaturation)
    * [URL.setBrightness(val)](#imgix.URL#setBrightness)
    * [URL.setContrast(val)](#imgix.URL#setContrast)
    * [URL.setExposure(val)](#imgix.URL#setExposure)
    * [URL.setHighlight(val)](#imgix.URL#setHighlight)
    * [URL.setShadow(val)](#imgix.URL#setShadow)
    * [URL.setGamma(val)](#imgix.URL#setGamma)
    * [URL.setVibrance(val)](#imgix.URL#setVibrance)
    * [URL.setSharpness(val)](#imgix.URL#setSharpness)
    * [URL.setSepia(val)](#imgix.URL#setSepia)
    * [URL.setHalftone(val)](#imgix.URL#setHalftone)
    * [URL.setBlur(val)](#imgix.URL#setBlur)
    * [URL.setMonochrome(val)](#imgix.URL#setMonochrome)
    * [URL.setPixelate(val)](#imgix.URL#setPixelate)
    * [URL.setBlend(val)](#imgix.URL#setBlend)
    * [URL.setText(val)](#imgix.URL#setText)
    * [URL.setTextFont(val)](#imgix.URL#setTextFont)
    * [URL.setTextSize(val)](#imgix.URL#setTextSize)
    * [URL.setTextColor(val)](#imgix.URL#setTextColor)
    * [URL.setTextAlign(val)](#imgix.URL#setTextAlign)
    * [URL.setTextShadow(val)](#imgix.URL#setTextShadow)
    * [URL.setTextPad(val)](#imgix.URL#setTextPad)
    * [URL.setTextLine(val)](#imgix.URL#setTextLine)
    * [URL.setTextLineColor(val)](#imgix.URL#setTextLineColor)
    * [URL.setTextFit(val)](#imgix.URL#setTextFit)
    * [URL.setFormat(val)](#imgix.URL#setFormat)
    * [URL.setQuality(val)](#imgix.URL#setQuality)
    * [URL.setWatermark(val)](#imgix.URL#setWatermark)
    * [URL.setWatermarkWidth(val)](#imgix.URL#setWatermarkWidth)
    * [URL.setWatermarkHeight(val)](#imgix.URL#setWatermarkHeight)
    * [URL.setWatermarkFit(val)](#imgix.URL#setWatermarkFit)
    * [URL.setWatermarkScale(val)](#imgix.URL#setWatermarkScale)
    * [URL.setWatermarkAlign(val)](#imgix.URL#setWatermarkAlign)
    * [URL.setWatermarkAlpha(val)](#imgix.URL#setWatermarkAlpha)
    * [URL.setWatermarkPadding(val)](#imgix.URL#setWatermarkPadding)
    * [URL.setPalette(val)](#imgix.URL#setPalette)
    * [URL.setPaletteClass(val)](#imgix.URL#setPaletteClass)
    * [URL.setPaletteColorNumber(val)](#imgix.URL#setPaletteColorNumber)
    * [URL.setAuto(val)](#imgix.URL#setAuto)
    * [URL.setMask(val)](#imgix.URL#setMask)
    * [URL.getCrop(val)](#imgix.URL#getCrop)
    * [URL.getFit()](#imgix.URL#getFit)
    * [URL.getHeight()](#imgix.URL#getHeight)
    * [URL.getWidth()](#imgix.URL#getWidth)
    * [URL.getRotate()](#imgix.URL#getRotate)
    * [URL.getFlip()](#imgix.URL#getFlip)
    * [URL.getOrient()](#imgix.URL#getOrient)
    * [URL.getDPR()](#imgix.URL#getDPR)
    * [URL.getHue()](#imgix.URL#getHue)
    * [URL.getSaturation()](#imgix.URL#getSaturation)
    * [URL.getBrightness()](#imgix.URL#getBrightness)
    * [URL.getContrast()](#imgix.URL#getContrast)
    * [URL.getExposure()](#imgix.URL#getExposure)
    * [URL.getHighlight()](#imgix.URL#getHighlight)
    * [URL.getShadow()](#imgix.URL#getShadow)
    * [URL.getGamma()](#imgix.URL#getGamma)
    * [URL.getVibrance()](#imgix.URL#getVibrance)
    * [URL.getSharpness()](#imgix.URL#getSharpness)
    * [URL.getSepia()](#imgix.URL#getSepia)
    * [URL.getHalftone()](#imgix.URL#getHalftone)
    * [URL.getBlur()](#imgix.URL#getBlur)
    * [URL.getMonochrome()](#imgix.URL#getMonochrome)
    * [URL.getPixelate()](#imgix.URL#getPixelate)
    * [URL.getBlend()](#imgix.URL#getBlend)
    * [URL.getText()](#imgix.URL#getText)
    * [URL.getTextFont()](#imgix.URL#getTextFont)
    * [URL.getTextSize()](#imgix.URL#getTextSize)
    * [URL.getTextColor()](#imgix.URL#getTextColor)
    * [URL.getTextAlign()](#imgix.URL#getTextAlign)
    * [URL.getTextShadow()](#imgix.URL#getTextShadow)
    * [URL.getTextPad()](#imgix.URL#getTextPad)
    * [URL.getTextLine()](#imgix.URL#getTextLine)
    * [URL.getTextLineColor()](#imgix.URL#getTextLineColor)
    * [URL.getTextFit()](#imgix.URL#getTextFit)
    * [URL.getFormat()](#imgix.URL#getFormat)
    * [URL.getQuality()](#imgix.URL#getQuality)
    * [URL.getWatermark()](#imgix.URL#getWatermark)
    * [URL.getWatermarkWidth()](#imgix.URL#getWatermarkWidth)
    * [URL.getWatermarkHeight()](#imgix.URL#getWatermarkHeight)
    * [URL.getWatermarkFit()](#imgix.URL#getWatermarkFit)
    * [URL.getWatermarkScale()](#imgix.URL#getWatermarkScale)
    * [URL.getWatermarkAlign()](#imgix.URL#getWatermarkAlign)
    * [URL.getWatermarkAlpha()](#imgix.URL#getWatermarkAlpha)
    * [URL.getWatermarkPadding()](#imgix.URL#getWatermarkPadding)
    * [URL.getPalette()](#imgix.URL#getPalette)
    * [URL.getPaletteClass()](#imgix.URL#getPaletteClass)
    * [URL.getPaletteColorNumber()](#imgix.URL#getPaletteColorNumber)
    * [URL.getAuto()](#imgix.URL#getAuto)
    * [URL.getMask()](#imgix.URL#getMask)
    * [URL.getBackground()](#imgix.URL#getBackground)
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

- ready `function` - the function to run when the DOM is ready.  

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
<a name="imgix.hasClass"></a>
##imgix.hasClass(elem, name)
Checks if an element has a class applied (via jquery)

**Params**

- elem `Element` - element to check for class  
- name `string` - class name to look for  

**Returns**: `boolean` - true if element has the class  
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

**Returns**: `object` - passed color converted to hex  
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
  * [URL.setSepia(val)](#imgix.URL#setSepia)
  * [URL.setCrop(val)](#imgix.URL#setCrop)
  * [URL.setFit(val)](#imgix.URL#setFit)
  * [URL.setHeight(val)](#imgix.URL#setHeight)
  * [URL.setWidth(val)](#imgix.URL#setWidth)
  * [URL.setRotate(val)](#imgix.URL#setRotate)
  * [URL.setFlip(val)](#imgix.URL#setFlip)
  * [URL.setOrient(val)](#imgix.URL#setOrient)
  * [URL.setDPR(val)](#imgix.URL#setDPR)
  * [URL.setHue(val)](#imgix.URL#setHue)
  * [URL.setSaturation(val)](#imgix.URL#setSaturation)
  * [URL.setBrightness(val)](#imgix.URL#setBrightness)
  * [URL.setContrast(val)](#imgix.URL#setContrast)
  * [URL.setExposure(val)](#imgix.URL#setExposure)
  * [URL.setHighlight(val)](#imgix.URL#setHighlight)
  * [URL.setShadow(val)](#imgix.URL#setShadow)
  * [URL.setGamma(val)](#imgix.URL#setGamma)
  * [URL.setVibrance(val)](#imgix.URL#setVibrance)
  * [URL.setSharpness(val)](#imgix.URL#setSharpness)
  * [URL.setSepia(val)](#imgix.URL#setSepia)
  * [URL.setHalftone(val)](#imgix.URL#setHalftone)
  * [URL.setBlur(val)](#imgix.URL#setBlur)
  * [URL.setMonochrome(val)](#imgix.URL#setMonochrome)
  * [URL.setPixelate(val)](#imgix.URL#setPixelate)
  * [URL.setBlend(val)](#imgix.URL#setBlend)
  * [URL.setText(val)](#imgix.URL#setText)
  * [URL.setTextFont(val)](#imgix.URL#setTextFont)
  * [URL.setTextSize(val)](#imgix.URL#setTextSize)
  * [URL.setTextColor(val)](#imgix.URL#setTextColor)
  * [URL.setTextAlign(val)](#imgix.URL#setTextAlign)
  * [URL.setTextShadow(val)](#imgix.URL#setTextShadow)
  * [URL.setTextPad(val)](#imgix.URL#setTextPad)
  * [URL.setTextLine(val)](#imgix.URL#setTextLine)
  * [URL.setTextLineColor(val)](#imgix.URL#setTextLineColor)
  * [URL.setTextFit(val)](#imgix.URL#setTextFit)
  * [URL.setFormat(val)](#imgix.URL#setFormat)
  * [URL.setQuality(val)](#imgix.URL#setQuality)
  * [URL.setWatermark(val)](#imgix.URL#setWatermark)
  * [URL.setWatermarkWidth(val)](#imgix.URL#setWatermarkWidth)
  * [URL.setWatermarkHeight(val)](#imgix.URL#setWatermarkHeight)
  * [URL.setWatermarkFit(val)](#imgix.URL#setWatermarkFit)
  * [URL.setWatermarkScale(val)](#imgix.URL#setWatermarkScale)
  * [URL.setWatermarkAlign(val)](#imgix.URL#setWatermarkAlign)
  * [URL.setWatermarkAlpha(val)](#imgix.URL#setWatermarkAlpha)
  * [URL.setWatermarkPadding(val)](#imgix.URL#setWatermarkPadding)
  * [URL.setPalette(val)](#imgix.URL#setPalette)
  * [URL.setPaletteClass(val)](#imgix.URL#setPaletteClass)
  * [URL.setPaletteColorNumber(val)](#imgix.URL#setPaletteColorNumber)
  * [URL.setAuto(val)](#imgix.URL#setAuto)
  * [URL.setMask(val)](#imgix.URL#setMask)
  * [URL.getCrop(val)](#imgix.URL#getCrop)
  * [URL.getFit()](#imgix.URL#getFit)
  * [URL.getHeight()](#imgix.URL#getHeight)
  * [URL.getWidth()](#imgix.URL#getWidth)
  * [URL.getRotate()](#imgix.URL#getRotate)
  * [URL.getFlip()](#imgix.URL#getFlip)
  * [URL.getOrient()](#imgix.URL#getOrient)
  * [URL.getDPR()](#imgix.URL#getDPR)
  * [URL.getHue()](#imgix.URL#getHue)
  * [URL.getSaturation()](#imgix.URL#getSaturation)
  * [URL.getBrightness()](#imgix.URL#getBrightness)
  * [URL.getContrast()](#imgix.URL#getContrast)
  * [URL.getExposure()](#imgix.URL#getExposure)
  * [URL.getHighlight()](#imgix.URL#getHighlight)
  * [URL.getShadow()](#imgix.URL#getShadow)
  * [URL.getGamma()](#imgix.URL#getGamma)
  * [URL.getVibrance()](#imgix.URL#getVibrance)
  * [URL.getSharpness()](#imgix.URL#getSharpness)
  * [URL.getSepia()](#imgix.URL#getSepia)
  * [URL.getHalftone()](#imgix.URL#getHalftone)
  * [URL.getBlur()](#imgix.URL#getBlur)
  * [URL.getMonochrome()](#imgix.URL#getMonochrome)
  * [URL.getPixelate()](#imgix.URL#getPixelate)
  * [URL.getBlend()](#imgix.URL#getBlend)
  * [URL.getText()](#imgix.URL#getText)
  * [URL.getTextFont()](#imgix.URL#getTextFont)
  * [URL.getTextSize()](#imgix.URL#getTextSize)
  * [URL.getTextColor()](#imgix.URL#getTextColor)
  * [URL.getTextAlign()](#imgix.URL#getTextAlign)
  * [URL.getTextShadow()](#imgix.URL#getTextShadow)
  * [URL.getTextPad()](#imgix.URL#getTextPad)
  * [URL.getTextLine()](#imgix.URL#getTextLine)
  * [URL.getTextLineColor()](#imgix.URL#getTextLineColor)
  * [URL.getTextFit()](#imgix.URL#getTextFit)
  * [URL.getFormat()](#imgix.URL#getFormat)
  * [URL.getQuality()](#imgix.URL#getQuality)
  * [URL.getWatermark()](#imgix.URL#getWatermark)
  * [URL.getWatermarkWidth()](#imgix.URL#getWatermarkWidth)
  * [URL.getWatermarkHeight()](#imgix.URL#getWatermarkHeight)
  * [URL.getWatermarkFit()](#imgix.URL#getWatermarkFit)
  * [URL.getWatermarkScale()](#imgix.URL#getWatermarkScale)
  * [URL.getWatermarkAlign()](#imgix.URL#getWatermarkAlign)
  * [URL.getWatermarkAlpha()](#imgix.URL#getWatermarkAlpha)
  * [URL.getWatermarkPadding()](#imgix.URL#getWatermarkPadding)
  * [URL.getPalette()](#imgix.URL#getPalette)
  * [URL.getPaletteClass()](#imgix.URL#getPaletteClass)
  * [URL.getPaletteColorNumber()](#imgix.URL#getPaletteColorNumber)
  * [URL.getAuto()](#imgix.URL#getAuto)
  * [URL.getMask()](#imgix.URL#getMask)
  * [URL.getBackground()](#imgix.URL#getBackground)
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

<a name="imgix.URL#setSepia"></a>
###URL.setSepia(val)
Apply the speia imgix param to the image url. Same as doing .setParam('sepia', val);

**Params**

- val  - the value to set for sepia  

<a name="imgix.URL#setCrop"></a>
###URL.setCrop(val)
Apply the "crop" imgix param to the image url. Same as doing .setParam('crop', val)

**Params**

- val  - the value to set for crop  

<a name="imgix.URL#setFit"></a>
###URL.setFit(val)
Apply the "fit" imgix param to the image url. Same as doing .setParam('fit', val)

**Params**

- val  - the value to set for fit  

<a name="imgix.URL#setHeight"></a>
###URL.setHeight(val)
Apply the "h" imgix param to the image url. Same as doing .setParam('h', val)

**Params**

- val  - the value to set for h  

<a name="imgix.URL#setWidth"></a>
###URL.setWidth(val)
Apply the "w" imgix param to the image url. Same as doing .setParam('w', val)

**Params**

- val  - the value to set for w  

<a name="imgix.URL#setRotate"></a>
###URL.setRotate(val)
Apply the "rot" imgix param to the image url. Same as doing .setParam('rot', val)

**Params**

- val  - the value to set for rot  

<a name="imgix.URL#setFlip"></a>
###URL.setFlip(val)
Apply the "flip" imgix param to the image url. Same as doing .setParam('flip', val)

**Params**

- val  - the value to set for flip  

<a name="imgix.URL#setOrient"></a>
###URL.setOrient(val)
Apply the "or" imgix param to the image url. Same as doing .setParam('or', val)

**Params**

- val  - the value to set for or  

<a name="imgix.URL#setDPR"></a>
###URL.setDPR(val)
Apply the "dpr" imgix param to the image url. Same as doing .setParam('dpr', val)

**Params**

- val  - the value to set for dpr  

<a name="imgix.URL#setHue"></a>
###URL.setHue(val)
Apply the "hue" imgix param to the image url. Same as doing .setParam('hue', val)

**Params**

- val  - the value to set for hue  

<a name="imgix.URL#setSaturation"></a>
###URL.setSaturation(val)
Apply the "sat" imgix param to the image url. Same as doing .setParam('sat', val)

**Params**

- val  - the value to set for sat  

<a name="imgix.URL#setBrightness"></a>
###URL.setBrightness(val)
Apply the "bri" imgix param to the image url. Same as doing .setParam('bri', val)

**Params**

- val  - the value to set for bri  

<a name="imgix.URL#setContrast"></a>
###URL.setContrast(val)
Apply the "con" imgix param to the image url. Same as doing .setParam('con', val)

**Params**

- val  - the value to set for con  

<a name="imgix.URL#setExposure"></a>
###URL.setExposure(val)
Apply the "exp" imgix param to the image url. Same as doing .setParam('exp', val)

**Params**

- val  - the value to set for exp  

<a name="imgix.URL#setHighlight"></a>
###URL.setHighlight(val)
Apply the "high" imgix param to the image url. Same as doing .setParam('high', val)

**Params**

- val  - the value to set for high  

<a name="imgix.URL#setShadow"></a>
###URL.setShadow(val)
Apply the "shad" imgix param to the image url. Same as doing .setParam('shad', val)

**Params**

- val  - the value to set for shad  

<a name="imgix.URL#setGamma"></a>
###URL.setGamma(val)
Apply the "gam" imgix param to the image url. Same as doing .setParam('gam', val)

**Params**

- val  - the value to set for gam  

<a name="imgix.URL#setVibrance"></a>
###URL.setVibrance(val)
Apply the "vib" imgix param to the image url. Same as doing .setParam('vib', val)

**Params**

- val  - the value to set for vib  

<a name="imgix.URL#setSharpness"></a>
###URL.setSharpness(val)
Apply the "sharp" imgix param to the image url. Same as doing .setParam('sharp', val)

**Params**

- val  - the value to set for sharp  

<a name="imgix.URL#setSepia"></a>
###URL.setSepia(val)
Apply the "sepia" imgix param to the image url. Same as doing .setParam('sepia', val)

**Params**

- val  - the value to set for sepia  

<a name="imgix.URL#setHalftone"></a>
###URL.setHalftone(val)
Apply the "htn" imgix param to the image url. Same as doing .setParam('htn', val)

**Params**

- val  - the value to set for htn  

<a name="imgix.URL#setBlur"></a>
###URL.setBlur(val)
Apply the "blur" imgix param to the image url. Same as doing .setParam('blur', val)

**Params**

- val  - the value to set for blur  

<a name="imgix.URL#setMonochrome"></a>
###URL.setMonochrome(val)
Apply the "mono" imgix param to the image url. Same as doing .setParam('mono', val)

**Params**

- val  - the value to set for mono  

<a name="imgix.URL#setPixelate"></a>
###URL.setPixelate(val)
Apply the "px" imgix param to the image url. Same as doing .setParam('px', val)

**Params**

- val  - the value to set for px  

<a name="imgix.URL#setBlend"></a>
###URL.setBlend(val)
Apply the "blend" imgix param to the image url. Same as doing .setParam('blend', val)

**Params**

- val  - the value to set for blend  

<a name="imgix.URL#setText"></a>
###URL.setText(val)
Apply the "txt" imgix param to the image url. Same as doing .setParam('txt', val)

**Params**

- val  - the value to set for txt  

<a name="imgix.URL#setTextFont"></a>
###URL.setTextFont(val)
Apply the "txtfont" imgix param to the image url. Same as doing .setParam('txtfont', val)

**Params**

- val  - the value to set for txtfont  

<a name="imgix.URL#setTextSize"></a>
###URL.setTextSize(val)
Apply the "txtsize" imgix param to the image url. Same as doing .setParam('txtsize', val)

**Params**

- val  - the value to set for txtsize  

<a name="imgix.URL#setTextColor"></a>
###URL.setTextColor(val)
Apply the "txtclr" imgix param to the image url. Same as doing .setParam('txtclr', val)

**Params**

- val  - the value to set for txtclr  

<a name="imgix.URL#setTextAlign"></a>
###URL.setTextAlign(val)
Apply the "txtalign" imgix param to the image url. Same as doing .setParam('txtalign', val)

**Params**

- val  - the value to set for txtalign  

<a name="imgix.URL#setTextShadow"></a>
###URL.setTextShadow(val)
Apply the "txtshad" imgix param to the image url. Same as doing .setParam('txtshad', val)

**Params**

- val  - the value to set for txtshad  

<a name="imgix.URL#setTextPad"></a>
###URL.setTextPad(val)
Apply the "txtpad" imgix param to the image url. Same as doing .setParam('txtpad', val)

**Params**

- val  - the value to set for txtpad  

<a name="imgix.URL#setTextLine"></a>
###URL.setTextLine(val)
Apply the "txtline" imgix param to the image url. Same as doing .setParam('txtline', val)

**Params**

- val  - the value to set for txtline  

<a name="imgix.URL#setTextLineColor"></a>
###URL.setTextLineColor(val)
Apply the "txtlineclr" imgix param to the image url. Same as doing .setParam('txtlineclr', val)

**Params**

- val  - the value to set for txtlineclr  

<a name="imgix.URL#setTextFit"></a>
###URL.setTextFit(val)
Apply the "txtfit" imgix param to the image url. Same as doing .setParam('txtfit', val)

**Params**

- val  - the value to set for txtfit  

<a name="imgix.URL#setFormat"></a>
###URL.setFormat(val)
Apply the "fm" imgix param to the image url. Same as doing .setParam('fm', val)

**Params**

- val  - the value to set for fm  

<a name="imgix.URL#setQuality"></a>
###URL.setQuality(val)
Apply the "q" imgix param to the image url. Same as doing .setParam('q', val)

**Params**

- val  - the value to set for q  

<a name="imgix.URL#setWatermark"></a>
###URL.setWatermark(val)
Apply the "mark" imgix param to the image url. Same as doing .setParam('mark', val)

**Params**

- val  - the value to set for mark  

<a name="imgix.URL#setWatermarkWidth"></a>
###URL.setWatermarkWidth(val)
Apply the "markw" imgix param to the image url. Same as doing .setParam('markw', val)

**Params**

- val  - the value to set for markw  

<a name="imgix.URL#setWatermarkHeight"></a>
###URL.setWatermarkHeight(val)
Apply the "markh" imgix param to the image url. Same as doing .setParam('markh', val)

**Params**

- val  - the value to set for markh  

<a name="imgix.URL#setWatermarkFit"></a>
###URL.setWatermarkFit(val)
Apply the "markfit" imgix param to the image url. Same as doing .setParam('markfit', val)

**Params**

- val  - the value to set for markfit  

<a name="imgix.URL#setWatermarkScale"></a>
###URL.setWatermarkScale(val)
Apply the "markscale" imgix param to the image url. Same as doing .setParam('markscale', val)

**Params**

- val  - the value to set for markscale  

<a name="imgix.URL#setWatermarkAlign"></a>
###URL.setWatermarkAlign(val)
Apply the "markalign" imgix param to the image url. Same as doing .setParam('markalign', val)

**Params**

- val  - the value to set for markalign  

<a name="imgix.URL#setWatermarkAlpha"></a>
###URL.setWatermarkAlpha(val)
Apply the "markalpha" imgix param to the image url. Same as doing .setParam('markalpha', val)

**Params**

- val  - the value to set for markalpha  

<a name="imgix.URL#setWatermarkPadding"></a>
###URL.setWatermarkPadding(val)
Apply the "markpad" imgix param to the image url. Same as doing .setParam('markpad', val)

**Params**

- val  - the value to set for markpad  

<a name="imgix.URL#setPalette"></a>
###URL.setPalette(val)
Apply the "palette" imgix param to the image url. Same as doing .setParam('palette', val)

**Params**

- val  - the value to set for palette  

<a name="imgix.URL#setPaletteClass"></a>
###URL.setPaletteClass(val)
Apply the "class" imgix param to the image url. Same as doing .setParam('class', val)

**Params**

- val  - the value to set for class  

<a name="imgix.URL#setPaletteColorNumber"></a>
###URL.setPaletteColorNumber(val)
Apply the "colors" imgix param to the image url. Same as doing .setParam('colors', val)

**Params**

- val  - the value to set for colors  

<a name="imgix.URL#setAuto"></a>
###URL.setAuto(val)
Apply the "auto" imgix param to the image url. Same as doing .setParam('auto', val)

**Params**

- val  - the value to set for auto  

<a name="imgix.URL#setMask"></a>
###URL.setMask(val)
Apply the "mask" imgix param to the image url. Same as doing .setParam('mask', val)

**Params**

- val  - the value to set for mask  

<a name="imgix.URL#getCrop"></a>
###URL.getCrop(val)
Apply the "bg" imgix param to the image url. Same as doing .setParam('bg', val)

**Params**

- val  - the value to set for bg  

<a name="imgix.URL#getFit"></a>
###URL.getFit()
Get the value of the "fit" imgix param currently on the image url. Same as doing .getParam('fit')

<a name="imgix.URL#getHeight"></a>
###URL.getHeight()
Get the value of the "h" imgix param currently on the image url. Same as doing .getParam('h')

<a name="imgix.URL#getWidth"></a>
###URL.getWidth()
Get the value of the "w" imgix param currently on the image url. Same as doing .getParam('w')

<a name="imgix.URL#getRotate"></a>
###URL.getRotate()
Get the value of the "rot" imgix param currently on the image url. Same as doing .getParam('rot')

<a name="imgix.URL#getFlip"></a>
###URL.getFlip()
Get the value of the "flip" imgix param currently on the image url. Same as doing .getParam('flip')

<a name="imgix.URL#getOrient"></a>
###URL.getOrient()
Get the value of the "or" imgix param currently on the image url. Same as doing .getParam('or')

<a name="imgix.URL#getDPR"></a>
###URL.getDPR()
Get the value of the "dpr" imgix param currently on the image url. Same as doing .getParam('dpr')

<a name="imgix.URL#getHue"></a>
###URL.getHue()
Get the value of the "hue" imgix param currently on the image url. Same as doing .getParam('hue')

<a name="imgix.URL#getSaturation"></a>
###URL.getSaturation()
Get the value of the "sat" imgix param currently on the image url. Same as doing .getParam('sat')

<a name="imgix.URL#getBrightness"></a>
###URL.getBrightness()
Get the value of the "bri" imgix param currently on the image url. Same as doing .getParam('bri')

<a name="imgix.URL#getContrast"></a>
###URL.getContrast()
Get the value of the "con" imgix param currently on the image url. Same as doing .getParam('con')

<a name="imgix.URL#getExposure"></a>
###URL.getExposure()
Get the value of the "exp" imgix param currently on the image url. Same as doing .getParam('exp')

<a name="imgix.URL#getHighlight"></a>
###URL.getHighlight()
Get the value of the "high" imgix param currently on the image url. Same as doing .getParam('high')

<a name="imgix.URL#getShadow"></a>
###URL.getShadow()
Get the value of the "shad" imgix param currently on the image url. Same as doing .getParam('shad')

<a name="imgix.URL#getGamma"></a>
###URL.getGamma()
Get the value of the "gam" imgix param currently on the image url. Same as doing .getParam('gam')

<a name="imgix.URL#getVibrance"></a>
###URL.getVibrance()
Get the value of the "vib" imgix param currently on the image url. Same as doing .getParam('vib')

<a name="imgix.URL#getSharpness"></a>
###URL.getSharpness()
Get the value of the "sharp" imgix param currently on the image url. Same as doing .getParam('sharp')

<a name="imgix.URL#getSepia"></a>
###URL.getSepia()
Get the value of the "sepia" imgix param currently on the image url. Same as doing .getParam('sepia')

<a name="imgix.URL#getHalftone"></a>
###URL.getHalftone()
Get the value of the "htn" imgix param currently on the image url. Same as doing .getParam('htn')

<a name="imgix.URL#getBlur"></a>
###URL.getBlur()
Get the value of the "blur" imgix param currently on the image url. Same as doing .getParam('blur')

<a name="imgix.URL#getMonochrome"></a>
###URL.getMonochrome()
Get the value of the "mono" imgix param currently on the image url. Same as doing .getParam('mono')

<a name="imgix.URL#getPixelate"></a>
###URL.getPixelate()
Get the value of the "px" imgix param currently on the image url. Same as doing .getParam('px')

<a name="imgix.URL#getBlend"></a>
###URL.getBlend()
Get the value of the "blend" imgix param currently on the image url. Same as doing .getParam('blend')

<a name="imgix.URL#getText"></a>
###URL.getText()
Get the value of the "txt" imgix param currently on the image url. Same as doing .getParam('txt')

<a name="imgix.URL#getTextFont"></a>
###URL.getTextFont()
Get the value of the "txtfont" imgix param currently on the image url. Same as doing .getParam('txtfont')

<a name="imgix.URL#getTextSize"></a>
###URL.getTextSize()
Get the value of the "txtsize" imgix param currently on the image url. Same as doing .getParam('txtsize')

<a name="imgix.URL#getTextColor"></a>
###URL.getTextColor()
Get the value of the "txtclr" imgix param currently on the image url. Same as doing .getParam('txtclr')

<a name="imgix.URL#getTextAlign"></a>
###URL.getTextAlign()
Get the value of the "txtalign" imgix param currently on the image url. Same as doing .getParam('txtalign')

<a name="imgix.URL#getTextShadow"></a>
###URL.getTextShadow()
Get the value of the "txtshad" imgix param currently on the image url. Same as doing .getParam('txtshad')

<a name="imgix.URL#getTextPad"></a>
###URL.getTextPad()
Get the value of the "txtpad" imgix param currently on the image url. Same as doing .getParam('txtpad')

<a name="imgix.URL#getTextLine"></a>
###URL.getTextLine()
Get the value of the "txtline" imgix param currently on the image url. Same as doing .getParam('txtline')

<a name="imgix.URL#getTextLineColor"></a>
###URL.getTextLineColor()
Get the value of the "txtlineclr" imgix param currently on the image url. Same as doing .getParam('txtlineclr')

<a name="imgix.URL#getTextFit"></a>
###URL.getTextFit()
Get the value of the "txtfit" imgix param currently on the image url. Same as doing .getParam('txtfit')

<a name="imgix.URL#getFormat"></a>
###URL.getFormat()
Get the value of the "fm" imgix param currently on the image url. Same as doing .getParam('fm')

<a name="imgix.URL#getQuality"></a>
###URL.getQuality()
Get the value of the "q" imgix param currently on the image url. Same as doing .getParam('q')

<a name="imgix.URL#getWatermark"></a>
###URL.getWatermark()
Get the value of the "mark" imgix param currently on the image url. Same as doing .getParam('mark')

<a name="imgix.URL#getWatermarkWidth"></a>
###URL.getWatermarkWidth()
Get the value of the "markw" imgix param currently on the image url. Same as doing .getParam('markw')

<a name="imgix.URL#getWatermarkHeight"></a>
###URL.getWatermarkHeight()
Get the value of the "markh" imgix param currently on the image url. Same as doing .getParam('markh')

<a name="imgix.URL#getWatermarkFit"></a>
###URL.getWatermarkFit()
Get the value of the "markfit" imgix param currently on the image url. Same as doing .getParam('markfit')

<a name="imgix.URL#getWatermarkScale"></a>
###URL.getWatermarkScale()
Get the value of the "markscale" imgix param currently on the image url. Same as doing .getParam('markscale')

<a name="imgix.URL#getWatermarkAlign"></a>
###URL.getWatermarkAlign()
Get the value of the "markalign" imgix param currently on the image url. Same as doing .getParam('markalign')

<a name="imgix.URL#getWatermarkAlpha"></a>
###URL.getWatermarkAlpha()
Get the value of the "markalpha" imgix param currently on the image url. Same as doing .getParam('markalpha')

<a name="imgix.URL#getWatermarkPadding"></a>
###URL.getWatermarkPadding()
Get the value of the "markpad" imgix param currently on the image url. Same as doing .getParam('markpad')

<a name="imgix.URL#getPalette"></a>
###URL.getPalette()
Get the value of the "palette" imgix param currently on the image url. Same as doing .getParam('palette')

<a name="imgix.URL#getPaletteClass"></a>
###URL.getPaletteClass()
Get the value of the "class" imgix param currently on the image url. Same as doing .getParam('class')

<a name="imgix.URL#getPaletteColorNumber"></a>
###URL.getPaletteColorNumber()
Get the value of the "colors" imgix param currently on the image url. Same as doing .getParam('colors')

<a name="imgix.URL#getAuto"></a>
###URL.getAuto()
Get the value of the "auto" imgix param currently on the image url. Same as doing .getParam('auto')

<a name="imgix.URL#getMask"></a>
###URL.getMask()
Get the value of the "mask" imgix param currently on the image url. Same as doing .getParam('mask')

<a name="imgix.URL#getBackground"></a>
###URL.getBackground()
Get the value of the "bg" imgix param currently on the image url. Same as doing .getParam('bg')

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
This callback receives the colors in the image.

**Params**

- colors `array` - an array of colors  

**Type**: `function`  
<a name="autoUpdateElementCallback"></a>
#callback: autoUpdateElementCallback
**Params**

- obj `object` - information about element and image  

**Type**: `function`  
