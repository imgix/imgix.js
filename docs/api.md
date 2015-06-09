<!--- THIS IS AUTO GENERATED FROM JSDOCS. DO NOT EDIT DIRECTLY. ---> 

![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)


## imgix : <code>object</code>
`imgix` is the root namespace for all imgix client code.

**Kind**: global namespace  

* [imgix](#imgix.js Documentation) : <code>object</code>
  * [.URL](#imgix.URL)
    * [new imgix.URL(url, imgParams)](#new_imgix.URL_new)
    * [.attachGradientTo(elemOrSel, baseColor)](#imgix.URL+attachGradientTo)
    * [.attachImageTo(elemOrSel, callback)](#imgix.URL+attachImageTo)
    * [.getColors(num, callback)](#imgix.URL+getColors)
    * [.autoUpdateImg(sel, callback)](#imgix.URL+autoUpdateImg)
    * [.getUrl()](#imgix.URL+getUrl) ⇒ <code>string</code>
    * [.removeParam(param)](#imgix.URL+removeParam)
    * [.clearThenSetParams(params)](#imgix.URL+clearThenSetParams)
    * [.clearParams(runUpdate)](#imgix.URL+clearParams)
    * [.setParams(dict, doOverride)](#imgix.URL+setParams)
    * [.setParam(param, value, doOverride, noUpdate)](#imgix.URL+setParam)
    * [.getParam(param)](#imgix.URL+getParam) ⇒ <code>string</code>
    * [.getParams()](#imgix.URL+getParams) ⇒ <code>object</code>
    * [.getBaseUrl()](#imgix.URL+getBaseUrl) ⇒ <code>string</code>
    * [.getQueryString()](#imgix.URL+getQueryString) ⇒ <code>string</code>
    * [.setSepia(val)](#imgix.URL+setSepia)
    * [.setBrightness(val)](#imgix.URL+setBrightness)
    * [.setContrast(val)](#imgix.URL+setContrast)
    * [.setExposure(val)](#imgix.URL+setExposure)
    * [.setGamma(val)](#imgix.URL+setGamma)
    * [.setHighlight(val)](#imgix.URL+setHighlight)
    * [.setHue(val)](#imgix.URL+setHue)
    * [.setInvert(val)](#imgix.URL+setInvert)
    * [.setSaturation(val)](#imgix.URL+setSaturation)
    * [.setShadow(val)](#imgix.URL+setShadow)
    * [.setSharpness(val)](#imgix.URL+setSharpness)
    * [.setUnsharpMask(val)](#imgix.URL+setUnsharpMask)
    * [.setUnsharpMaskRadius(val)](#imgix.URL+setUnsharpMaskRadius)
    * [.setVibrance(val)](#imgix.URL+setVibrance)
    * [.setAuto(val)](#imgix.URL+setAuto)
    * [.setBackground(val)](#imgix.URL+setBackground)
    * [.setBlendAlign(val)](#imgix.URL+setBlendAlign)
    * [.setBlendAlpha(val)](#imgix.URL+setBlendAlpha)
    * [.setBlendCrop(val)](#imgix.URL+setBlendCrop)
    * [.setBlendFit(val)](#imgix.URL+setBlendFit)
    * [.setBlendHeight(val)](#imgix.URL+setBlendHeight)
    * [.setBlend(val)](#imgix.URL+setBlend)
    * [.setBlendMode(val)](#imgix.URL+setBlendMode)
    * [.setBlendPadding(val)](#imgix.URL+setBlendPadding)
    * [.setBlendSize(val)](#imgix.URL+setBlendSize)
    * [.setBlendWidth(val)](#imgix.URL+setBlendWidth)
    * [.setBorder(val)](#imgix.URL+setBorder)
    * [.setPad(val)](#imgix.URL+setPad)
    * [.setDownload(val)](#imgix.URL+setDownload)
    * [.setFormat(val)](#imgix.URL+setFormat)
    * [.setQuality(val)](#imgix.URL+setQuality)
    * [.setMask(val)](#imgix.URL+setMask)
    * [.setNoiseReduction(val)](#imgix.URL+setNoiseReduction)
    * [.setNoiseReductionSharpen(val)](#imgix.URL+setNoiseReductionSharpen)
    * [.setPalette(val)](#imgix.URL+setPalette)
    * [.setPaletteClass(val)](#imgix.URL+setPaletteClass)
    * [.setPalettePrefix(val)](#imgix.URL+setPalettePrefix)
    * [.setPaletteColorNumber(val)](#imgix.URL+setPaletteColorNumber)
    * [.setPage(val)](#imgix.URL+setPage)
    * [.setDPR(val)](#imgix.URL+setDPR)
    * [.setFlip(val)](#imgix.URL+setFlip)
    * [.setOrient(val)](#imgix.URL+setOrient)
    * [.setRotate(val)](#imgix.URL+setRotate)
    * [.setCrop(val)](#imgix.URL+setCrop)
    * [.setFit(val)](#imgix.URL+setFit)
    * [.setHeight(val)](#imgix.URL+setHeight)
    * [.setRectangle(val)](#imgix.URL+setRectangle)
    * [.setWidth(val)](#imgix.URL+setWidth)
    * [.setBlur(val)](#imgix.URL+setBlur)
    * [.setHalftone(val)](#imgix.URL+setHalftone)
    * [.setMonochrome(val)](#imgix.URL+setMonochrome)
    * [.setPixelate(val)](#imgix.URL+setPixelate)
    * [.setSepia(val)](#imgix.URL+setSepia)
    * [.setText(val)](#imgix.URL+setText)
    * [.setTextAlign(val)](#imgix.URL+setTextAlign)
    * [.setTextClip(val)](#imgix.URL+setTextClip)
    * [.setTextColor(val)](#imgix.URL+setTextColor)
    * [.setTextFit(val)](#imgix.URL+setTextFit)
    * [.setTextFont(val)](#imgix.URL+setTextFont)
    * [.setTextLine(val)](#imgix.URL+setTextLine)
    * [.setTextLineColor(val)](#imgix.URL+setTextLineColor)
    * [.setTextPad(val)](#imgix.URL+setTextPad)
    * [.setTextSize(val)](#imgix.URL+setTextSize)
    * [.setTextShadow(val)](#imgix.URL+setTextShadow)
    * [.setTrim(val)](#imgix.URL+setTrim)
    * [.setTrimColor(val)](#imgix.URL+setTrimColor)
    * [.setTrimMeanDifference(val)](#imgix.URL+setTrimMeanDifference)
    * [.setWatermark(val)](#imgix.URL+setWatermark)
    * [.setWatermarkAlign(val)](#imgix.URL+setWatermarkAlign)
    * [.setWatermarkAlpha(val)](#imgix.URL+setWatermarkAlpha)
    * [.setWatermarkFit(val)](#imgix.URL+setWatermarkFit)
    * [.setWatermarkHeight(val)](#imgix.URL+setWatermarkHeight)
    * [.setWatermarkPadding(val)](#imgix.URL+setWatermarkPadding)
    * [.setWatermarkScale(val)](#imgix.URL+setWatermarkScale)
    * [.setWatermarkWidth(val)](#imgix.URL+setWatermarkWidth)
    * [.getBrightness()](#imgix.URL+getBrightness)
    * [.getContrast()](#imgix.URL+getContrast)
    * [.getExposure()](#imgix.URL+getExposure)
    * [.getGamma()](#imgix.URL+getGamma)
    * [.getHighlight()](#imgix.URL+getHighlight)
    * [.getHue()](#imgix.URL+getHue)
    * [.getInvert()](#imgix.URL+getInvert)
    * [.getSaturation()](#imgix.URL+getSaturation)
    * [.getShadow()](#imgix.URL+getShadow)
    * [.getSharpness()](#imgix.URL+getSharpness)
    * [.getUnsharpMask()](#imgix.URL+getUnsharpMask)
    * [.getUnsharpMaskRadius()](#imgix.URL+getUnsharpMaskRadius)
    * [.getVibrance()](#imgix.URL+getVibrance)
    * [.getAuto()](#imgix.URL+getAuto)
    * [.getBackground()](#imgix.URL+getBackground)
    * [.getBlendAlign()](#imgix.URL+getBlendAlign)
    * [.getBlendAlpha()](#imgix.URL+getBlendAlpha)
    * [.getBlendCrop()](#imgix.URL+getBlendCrop)
    * [.getBlendFit()](#imgix.URL+getBlendFit)
    * [.getBlendHeight()](#imgix.URL+getBlendHeight)
    * [.getBlend()](#imgix.URL+getBlend)
    * [.getBlendMode()](#imgix.URL+getBlendMode)
    * [.getBlendPadding()](#imgix.URL+getBlendPadding)
    * [.getBlendSize()](#imgix.URL+getBlendSize)
    * [.getBlendWidth()](#imgix.URL+getBlendWidth)
    * [.getBorder()](#imgix.URL+getBorder)
    * [.getPad()](#imgix.URL+getPad)
    * [.getDownload()](#imgix.URL+getDownload)
    * [.getFormat()](#imgix.URL+getFormat)
    * [.getQuality()](#imgix.URL+getQuality)
    * [.getMask()](#imgix.URL+getMask)
    * [.getNoiseReduction()](#imgix.URL+getNoiseReduction)
    * [.getNoiseReductionSharpen()](#imgix.URL+getNoiseReductionSharpen)
    * [.getPalette()](#imgix.URL+getPalette)
    * [.getPaletteClass()](#imgix.URL+getPaletteClass)
    * [.getPalettePrefix()](#imgix.URL+getPalettePrefix)
    * [.getPaletteColorNumber()](#imgix.URL+getPaletteColorNumber)
    * [.getPage()](#imgix.URL+getPage)
    * [.getDPR()](#imgix.URL+getDPR)
    * [.getFlip()](#imgix.URL+getFlip)
    * [.getOrient()](#imgix.URL+getOrient)
    * [.getRotate()](#imgix.URL+getRotate)
    * [.getCrop()](#imgix.URL+getCrop)
    * [.getFit()](#imgix.URL+getFit)
    * [.getHeight()](#imgix.URL+getHeight)
    * [.getRectangle()](#imgix.URL+getRectangle)
    * [.getWidth()](#imgix.URL+getWidth)
    * [.getBlur()](#imgix.URL+getBlur)
    * [.getHalftone()](#imgix.URL+getHalftone)
    * [.getMonochrome()](#imgix.URL+getMonochrome)
    * [.getPixelate()](#imgix.URL+getPixelate)
    * [.getSepia()](#imgix.URL+getSepia)
    * [.getText()](#imgix.URL+getText)
    * [.getTextAlign()](#imgix.URL+getTextAlign)
    * [.getTextClip()](#imgix.URL+getTextClip)
    * [.getTextColor()](#imgix.URL+getTextColor)
    * [.getTextFit()](#imgix.URL+getTextFit)
    * [.getTextFont()](#imgix.URL+getTextFont)
    * [.getTextLine()](#imgix.URL+getTextLine)
    * [.getTextLineColor()](#imgix.URL+getTextLineColor)
    * [.getTextPad()](#imgix.URL+getTextPad)
    * [.getTextSize()](#imgix.URL+getTextSize)
    * [.getTextShadow()](#imgix.URL+getTextShadow)
    * [.getTrim()](#imgix.URL+getTrim)
    * [.getTrimColor()](#imgix.URL+getTrimColor)
    * [.getTrimMeanDifference()](#imgix.URL+getTrimMeanDifference)
    * [.getWatermark()](#imgix.URL+getWatermark)
    * [.getWatermarkAlign()](#imgix.URL+getWatermarkAlign)
    * [.getWatermarkAlpha()](#imgix.URL+getWatermarkAlpha)
    * [.getWatermarkFit()](#imgix.URL+getWatermarkFit)
    * [.getWatermarkHeight()](#imgix.URL+getWatermarkHeight)
    * [.getWatermarkPadding()](#imgix.URL+getWatermarkPadding)
    * [.getWatermarkScale()](#imgix.URL+getWatermarkScale)
    * [.getWatermarkWidth()](#imgix.URL+getWatermarkWidth)
  * [.onready](#imgix.onready)
  * [.helpers](#imgix.helpers) : <code>object</code>
  * [.isImageElement(el)](#imgix.isImageElement) ⇒ <code>boolean</code>
  * [.setElementImageAfterLoad(el, url, callback)](#imgix.setElementImageAfterLoad)
  * [.setElementImage(el, url)](#imgix.setElementImage) ⇒ <code>boolean</code>
  * [.getEmptyImage()](#imgix.getEmptyImage) ⇒ <code>string</code>
  * [.getElementImage(el)](#imgix.getElementImage) ⇒ <code>string</code>
  * [.getBackgroundImage(el)](#imgix.getBackgroundImage) ⇒ <code>string</code>
  * [.getColorBrightness(color)](#imgix.getColorBrightness) ⇒ <code>Number</code>
  * [.applyAlphaToRGB(color, alpha)](#imgix.applyAlphaToRGB) ⇒ <code>string</code>
  * [.hexToRGB(color)](#imgix.hexToRGB) ⇒ <code>string</code>
  * [.getElementsWithImages()](#imgix.getElementsWithImages) ⇒ <code>NodeList</code>
  * [.hasImage(el)](#imgix.hasImage) ⇒ <code>boolean</code>
  * [.hasClass(elem, name)](#imgix.hasClass) ⇒ <code>boolean</code>
  * [.rgbToHex(color)](#imgix.rgbToHex) ⇒ <code>string</code>
  * [.getFontLookup()](#imgix.getFontLookup) ⇒ <code>object</code>
  * [.getFonts()](#imgix.getFonts) ⇒ <code>array</code>
  * [.fluid([rootNode], config)](#imgix.fluid)

<a name="imgix.URL"></a>
### imgix.URL
**Kind**: static class of <code>[imgix](#imgix)</code>  

* [.URL](#imgix.URL)
  * [new imgix.URL(url, imgParams)](#new_imgix.URL_new)
  * [.attachGradientTo(elemOrSel, baseColor)](#imgix.URL+attachGradientTo)
  * [.attachImageTo(elemOrSel, callback)](#imgix.URL+attachImageTo)
  * [.getColors(num, callback)](#imgix.URL+getColors)
  * [.autoUpdateImg(sel, callback)](#imgix.URL+autoUpdateImg)
  * [.getUrl()](#imgix.URL+getUrl) ⇒ <code>string</code>
  * [.removeParam(param)](#imgix.URL+removeParam)
  * [.clearThenSetParams(params)](#imgix.URL+clearThenSetParams)
  * [.clearParams(runUpdate)](#imgix.URL+clearParams)
  * [.setParams(dict, doOverride)](#imgix.URL+setParams)
  * [.setParam(param, value, doOverride, noUpdate)](#imgix.URL+setParam)
  * [.getParam(param)](#imgix.URL+getParam) ⇒ <code>string</code>
  * [.getParams()](#imgix.URL+getParams) ⇒ <code>object</code>
  * [.getBaseUrl()](#imgix.URL+getBaseUrl) ⇒ <code>string</code>
  * [.getQueryString()](#imgix.URL+getQueryString) ⇒ <code>string</code>
  * [.setSepia(val)](#imgix.URL+setSepia)
  * [.setBrightness(val)](#imgix.URL+setBrightness)
  * [.setContrast(val)](#imgix.URL+setContrast)
  * [.setExposure(val)](#imgix.URL+setExposure)
  * [.setGamma(val)](#imgix.URL+setGamma)
  * [.setHighlight(val)](#imgix.URL+setHighlight)
  * [.setHue(val)](#imgix.URL+setHue)
  * [.setInvert(val)](#imgix.URL+setInvert)
  * [.setSaturation(val)](#imgix.URL+setSaturation)
  * [.setShadow(val)](#imgix.URL+setShadow)
  * [.setSharpness(val)](#imgix.URL+setSharpness)
  * [.setUnsharpMask(val)](#imgix.URL+setUnsharpMask)
  * [.setUnsharpMaskRadius(val)](#imgix.URL+setUnsharpMaskRadius)
  * [.setVibrance(val)](#imgix.URL+setVibrance)
  * [.setAuto(val)](#imgix.URL+setAuto)
  * [.setBackground(val)](#imgix.URL+setBackground)
  * [.setBlendAlign(val)](#imgix.URL+setBlendAlign)
  * [.setBlendAlpha(val)](#imgix.URL+setBlendAlpha)
  * [.setBlendCrop(val)](#imgix.URL+setBlendCrop)
  * [.setBlendFit(val)](#imgix.URL+setBlendFit)
  * [.setBlendHeight(val)](#imgix.URL+setBlendHeight)
  * [.setBlend(val)](#imgix.URL+setBlend)
  * [.setBlendMode(val)](#imgix.URL+setBlendMode)
  * [.setBlendPadding(val)](#imgix.URL+setBlendPadding)
  * [.setBlendSize(val)](#imgix.URL+setBlendSize)
  * [.setBlendWidth(val)](#imgix.URL+setBlendWidth)
  * [.setBorder(val)](#imgix.URL+setBorder)
  * [.setPad(val)](#imgix.URL+setPad)
  * [.setDownload(val)](#imgix.URL+setDownload)
  * [.setFormat(val)](#imgix.URL+setFormat)
  * [.setQuality(val)](#imgix.URL+setQuality)
  * [.setMask(val)](#imgix.URL+setMask)
  * [.setNoiseReduction(val)](#imgix.URL+setNoiseReduction)
  * [.setNoiseReductionSharpen(val)](#imgix.URL+setNoiseReductionSharpen)
  * [.setPalette(val)](#imgix.URL+setPalette)
  * [.setPaletteClass(val)](#imgix.URL+setPaletteClass)
  * [.setPalettePrefix(val)](#imgix.URL+setPalettePrefix)
  * [.setPaletteColorNumber(val)](#imgix.URL+setPaletteColorNumber)
  * [.setPage(val)](#imgix.URL+setPage)
  * [.setDPR(val)](#imgix.URL+setDPR)
  * [.setFlip(val)](#imgix.URL+setFlip)
  * [.setOrient(val)](#imgix.URL+setOrient)
  * [.setRotate(val)](#imgix.URL+setRotate)
  * [.setCrop(val)](#imgix.URL+setCrop)
  * [.setFit(val)](#imgix.URL+setFit)
  * [.setHeight(val)](#imgix.URL+setHeight)
  * [.setRectangle(val)](#imgix.URL+setRectangle)
  * [.setWidth(val)](#imgix.URL+setWidth)
  * [.setBlur(val)](#imgix.URL+setBlur)
  * [.setHalftone(val)](#imgix.URL+setHalftone)
  * [.setMonochrome(val)](#imgix.URL+setMonochrome)
  * [.setPixelate(val)](#imgix.URL+setPixelate)
  * [.setSepia(val)](#imgix.URL+setSepia)
  * [.setText(val)](#imgix.URL+setText)
  * [.setTextAlign(val)](#imgix.URL+setTextAlign)
  * [.setTextClip(val)](#imgix.URL+setTextClip)
  * [.setTextColor(val)](#imgix.URL+setTextColor)
  * [.setTextFit(val)](#imgix.URL+setTextFit)
  * [.setTextFont(val)](#imgix.URL+setTextFont)
  * [.setTextLine(val)](#imgix.URL+setTextLine)
  * [.setTextLineColor(val)](#imgix.URL+setTextLineColor)
  * [.setTextPad(val)](#imgix.URL+setTextPad)
  * [.setTextSize(val)](#imgix.URL+setTextSize)
  * [.setTextShadow(val)](#imgix.URL+setTextShadow)
  * [.setTrim(val)](#imgix.URL+setTrim)
  * [.setTrimColor(val)](#imgix.URL+setTrimColor)
  * [.setTrimMeanDifference(val)](#imgix.URL+setTrimMeanDifference)
  * [.setWatermark(val)](#imgix.URL+setWatermark)
  * [.setWatermarkAlign(val)](#imgix.URL+setWatermarkAlign)
  * [.setWatermarkAlpha(val)](#imgix.URL+setWatermarkAlpha)
  * [.setWatermarkFit(val)](#imgix.URL+setWatermarkFit)
  * [.setWatermarkHeight(val)](#imgix.URL+setWatermarkHeight)
  * [.setWatermarkPadding(val)](#imgix.URL+setWatermarkPadding)
  * [.setWatermarkScale(val)](#imgix.URL+setWatermarkScale)
  * [.setWatermarkWidth(val)](#imgix.URL+setWatermarkWidth)
  * [.getBrightness()](#imgix.URL+getBrightness)
  * [.getContrast()](#imgix.URL+getContrast)
  * [.getExposure()](#imgix.URL+getExposure)
  * [.getGamma()](#imgix.URL+getGamma)
  * [.getHighlight()](#imgix.URL+getHighlight)
  * [.getHue()](#imgix.URL+getHue)
  * [.getInvert()](#imgix.URL+getInvert)
  * [.getSaturation()](#imgix.URL+getSaturation)
  * [.getShadow()](#imgix.URL+getShadow)
  * [.getSharpness()](#imgix.URL+getSharpness)
  * [.getUnsharpMask()](#imgix.URL+getUnsharpMask)
  * [.getUnsharpMaskRadius()](#imgix.URL+getUnsharpMaskRadius)
  * [.getVibrance()](#imgix.URL+getVibrance)
  * [.getAuto()](#imgix.URL+getAuto)
  * [.getBackground()](#imgix.URL+getBackground)
  * [.getBlendAlign()](#imgix.URL+getBlendAlign)
  * [.getBlendAlpha()](#imgix.URL+getBlendAlpha)
  * [.getBlendCrop()](#imgix.URL+getBlendCrop)
  * [.getBlendFit()](#imgix.URL+getBlendFit)
  * [.getBlendHeight()](#imgix.URL+getBlendHeight)
  * [.getBlend()](#imgix.URL+getBlend)
  * [.getBlendMode()](#imgix.URL+getBlendMode)
  * [.getBlendPadding()](#imgix.URL+getBlendPadding)
  * [.getBlendSize()](#imgix.URL+getBlendSize)
  * [.getBlendWidth()](#imgix.URL+getBlendWidth)
  * [.getBorder()](#imgix.URL+getBorder)
  * [.getPad()](#imgix.URL+getPad)
  * [.getDownload()](#imgix.URL+getDownload)
  * [.getFormat()](#imgix.URL+getFormat)
  * [.getQuality()](#imgix.URL+getQuality)
  * [.getMask()](#imgix.URL+getMask)
  * [.getNoiseReduction()](#imgix.URL+getNoiseReduction)
  * [.getNoiseReductionSharpen()](#imgix.URL+getNoiseReductionSharpen)
  * [.getPalette()](#imgix.URL+getPalette)
  * [.getPaletteClass()](#imgix.URL+getPaletteClass)
  * [.getPalettePrefix()](#imgix.URL+getPalettePrefix)
  * [.getPaletteColorNumber()](#imgix.URL+getPaletteColorNumber)
  * [.getPage()](#imgix.URL+getPage)
  * [.getDPR()](#imgix.URL+getDPR)
  * [.getFlip()](#imgix.URL+getFlip)
  * [.getOrient()](#imgix.URL+getOrient)
  * [.getRotate()](#imgix.URL+getRotate)
  * [.getCrop()](#imgix.URL+getCrop)
  * [.getFit()](#imgix.URL+getFit)
  * [.getHeight()](#imgix.URL+getHeight)
  * [.getRectangle()](#imgix.URL+getRectangle)
  * [.getWidth()](#imgix.URL+getWidth)
  * [.getBlur()](#imgix.URL+getBlur)
  * [.getHalftone()](#imgix.URL+getHalftone)
  * [.getMonochrome()](#imgix.URL+getMonochrome)
  * [.getPixelate()](#imgix.URL+getPixelate)
  * [.getSepia()](#imgix.URL+getSepia)
  * [.getText()](#imgix.URL+getText)
  * [.getTextAlign()](#imgix.URL+getTextAlign)
  * [.getTextClip()](#imgix.URL+getTextClip)
  * [.getTextColor()](#imgix.URL+getTextColor)
  * [.getTextFit()](#imgix.URL+getTextFit)
  * [.getTextFont()](#imgix.URL+getTextFont)
  * [.getTextLine()](#imgix.URL+getTextLine)
  * [.getTextLineColor()](#imgix.URL+getTextLineColor)
  * [.getTextPad()](#imgix.URL+getTextPad)
  * [.getTextSize()](#imgix.URL+getTextSize)
  * [.getTextShadow()](#imgix.URL+getTextShadow)
  * [.getTrim()](#imgix.URL+getTrim)
  * [.getTrimColor()](#imgix.URL+getTrimColor)
  * [.getTrimMeanDifference()](#imgix.URL+getTrimMeanDifference)
  * [.getWatermark()](#imgix.URL+getWatermark)
  * [.getWatermarkAlign()](#imgix.URL+getWatermarkAlign)
  * [.getWatermarkAlpha()](#imgix.URL+getWatermarkAlpha)
  * [.getWatermarkFit()](#imgix.URL+getWatermarkFit)
  * [.getWatermarkHeight()](#imgix.URL+getWatermarkHeight)
  * [.getWatermarkPadding()](#imgix.URL+getWatermarkPadding)
  * [.getWatermarkScale()](#imgix.URL+getWatermarkScale)
  * [.getWatermarkWidth()](#imgix.URL+getWatermarkWidth)

<a name="new_imgix.URL_new"></a>
#### new imgix.URL(url, imgParams)
Represents an imgix url


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | An imgix url to start with (optional) |
| imgParams | <code>object</code> | imgix query string params (optional) |

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

<a name="imgix.URL+getColors"></a>
#### URL.getColors(num, callback)
Get an array of the colors in the image

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | Desired number of colors |
| callback | <code>[colorsCallback](#colorsCallback)</code> | handles the response of colors |

<a name="imgix.URL+autoUpdateImg"></a>
#### URL.autoUpdateImg(sel, callback)
When/if the url changes it will auto re-set the image on the element of the css selector passed

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| sel | <code>string</code> | css selector for an <img> element on the page |
| callback | <code>[autoUpdateElementCallback](#autoUpdateElementCallback)</code> | fires whenever the img element is updated |

<a name="imgix.URL+getUrl"></a>
#### URL.getUrl() ⇒ <code>string</code>
The generated imgix image url

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>string</code> - the generated url  
<a name="imgix.URL+removeParam"></a>
#### URL.removeParam(param)
Remove an imgix param

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> | the imgix param to remove (e.g. txtfont) |

<a name="imgix.URL+clearThenSetParams"></a>
#### URL.clearThenSetParams(params)
Remove an imgix param then immediately set new params. This only triggers one update if used with autoUpdateImg.

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | object of params to set |

<a name="imgix.URL+clearParams"></a>
#### URL.clearParams(runUpdate)
Clear all imgix params attached to the image

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| runUpdate | <code>boolean</code> | (optional) iff using autoUpdateImg should callback be called (defaults to true) |

<a name="imgix.URL+setParams"></a>
#### URL.setParams(dict, doOverride)
Set multiple params using using an object (e.g. {txt: 'hello', txtclr: 'f00'})

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Type | Description |
| --- | --- | --- |
| dict | <code>object</code> | an object of imgix params and their values |
| doOverride | <code>boolean</code> | should the value(s) be overridden if they already exist (defaults to true) |

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
<a name="imgix.URL+getBaseUrl"></a>
#### URL.getBaseUrl() ⇒ <code>string</code>
Get the base url. This is getUrl() without the query string

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>string</code> - the base url  
<a name="imgix.URL+getQueryString"></a>
#### URL.getQueryString() ⇒ <code>string</code>
Get the query string only. This is getUrl() with ONLY the query string (e.g. ?txt=hello&txtclr=f00)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
**Returns**: <code>string</code> - the query string for the url  
<a name="imgix.URL+setSepia"></a>
#### URL.setSepia(val)
Apply the sepia imgix param to the image url. Same as doing .setParam('sepia', val);

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for sepia |

<a name="imgix.URL+setBrightness"></a>
#### URL.setBrightness(val)
Apply the "bri" imgix param to the image url. Same as doing .setParam('bri', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bri |

<a name="imgix.URL+setContrast"></a>
#### URL.setContrast(val)
Apply the "con" imgix param to the image url. Same as doing .setParam('con', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for con |

<a name="imgix.URL+setExposure"></a>
#### URL.setExposure(val)
Apply the "exp" imgix param to the image url. Same as doing .setParam('exp', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for exp |

<a name="imgix.URL+setGamma"></a>
#### URL.setGamma(val)
Apply the "gam" imgix param to the image url. Same as doing .setParam('gam', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for gam |

<a name="imgix.URL+setHighlight"></a>
#### URL.setHighlight(val)
Apply the "high" imgix param to the image url. Same as doing .setParam('high', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for high |

<a name="imgix.URL+setHue"></a>
#### URL.setHue(val)
Apply the "hue" imgix param to the image url. Same as doing .setParam('hue', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for hue |

<a name="imgix.URL+setInvert"></a>
#### URL.setInvert(val)
Apply the "invert" imgix param to the image url. Same as doing .setParam('invert', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for invert |

<a name="imgix.URL+setSaturation"></a>
#### URL.setSaturation(val)
Apply the "sat" imgix param to the image url. Same as doing .setParam('sat', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for sat |

<a name="imgix.URL+setShadow"></a>
#### URL.setShadow(val)
Apply the "shad" imgix param to the image url. Same as doing .setParam('shad', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for shad |

<a name="imgix.URL+setSharpness"></a>
#### URL.setSharpness(val)
Apply the "sharp" imgix param to the image url. Same as doing .setParam('sharp', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for sharp |

<a name="imgix.URL+setUnsharpMask"></a>
#### URL.setUnsharpMask(val)
Apply the "usm" imgix param to the image url. Same as doing .setParam('usm', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for usm |

<a name="imgix.URL+setUnsharpMaskRadius"></a>
#### URL.setUnsharpMaskRadius(val)
Apply the "usmrad" imgix param to the image url. Same as doing .setParam('usmrad', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for usmrad |

<a name="imgix.URL+setVibrance"></a>
#### URL.setVibrance(val)
Apply the "vib" imgix param to the image url. Same as doing .setParam('vib', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for vib |

<a name="imgix.URL+setAuto"></a>
#### URL.setAuto(val)
Apply the "auto" imgix param to the image url. Same as doing .setParam('auto', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for auto |

<a name="imgix.URL+setBackground"></a>
#### URL.setBackground(val)
Apply the "bg" imgix param to the image url. Same as doing .setParam('bg', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bg |

<a name="imgix.URL+setBlendAlign"></a>
#### URL.setBlendAlign(val)
Apply the "ba" imgix param to the image url. Same as doing .setParam('ba', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for ba |

<a name="imgix.URL+setBlendAlpha"></a>
#### URL.setBlendAlpha(val)
Apply the "balph" imgix param to the image url. Same as doing .setParam('balph', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for balph |

<a name="imgix.URL+setBlendCrop"></a>
#### URL.setBlendCrop(val)
Apply the "bc" imgix param to the image url. Same as doing .setParam('bc', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bc |

<a name="imgix.URL+setBlendFit"></a>
#### URL.setBlendFit(val)
Apply the "bf" imgix param to the image url. Same as doing .setParam('bf', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bf |

<a name="imgix.URL+setBlendHeight"></a>
#### URL.setBlendHeight(val)
Apply the "bh" imgix param to the image url. Same as doing .setParam('bh', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bh |

<a name="imgix.URL+setBlend"></a>
#### URL.setBlend(val)
Apply the "blend" imgix param to the image url. Same as doing .setParam('blend', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for blend |

<a name="imgix.URL+setBlendMode"></a>
#### URL.setBlendMode(val)
Apply the "bm" imgix param to the image url. Same as doing .setParam('bm', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bm |

<a name="imgix.URL+setBlendPadding"></a>
#### URL.setBlendPadding(val)
Apply the "bp" imgix param to the image url. Same as doing .setParam('bp', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bp |

<a name="imgix.URL+setBlendSize"></a>
#### URL.setBlendSize(val)
Apply the "bs" imgix param to the image url. Same as doing .setParam('bs', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bs |

<a name="imgix.URL+setBlendWidth"></a>
#### URL.setBlendWidth(val)
Apply the "bw" imgix param to the image url. Same as doing .setParam('bw', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for bw |

<a name="imgix.URL+setBorder"></a>
#### URL.setBorder(val)
Apply the "border" imgix param to the image url. Same as doing .setParam('border', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for border |

<a name="imgix.URL+setPad"></a>
#### URL.setPad(val)
Apply the "pad" imgix param to the image url. Same as doing .setParam('pad', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for pad |

<a name="imgix.URL+setDownload"></a>
#### URL.setDownload(val)
Apply the "dl" imgix param to the image url. Same as doing .setParam('dl', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for dl |

<a name="imgix.URL+setFormat"></a>
#### URL.setFormat(val)
Apply the "fm" imgix param to the image url. Same as doing .setParam('fm', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for fm |

<a name="imgix.URL+setQuality"></a>
#### URL.setQuality(val)
Apply the "q" imgix param to the image url. Same as doing .setParam('q', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for q |

<a name="imgix.URL+setMask"></a>
#### URL.setMask(val)
Apply the "mask" imgix param to the image url. Same as doing .setParam('mask', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for mask |

<a name="imgix.URL+setNoiseReduction"></a>
#### URL.setNoiseReduction(val)
Apply the "nr" imgix param to the image url. Same as doing .setParam('nr', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for nr |

<a name="imgix.URL+setNoiseReductionSharpen"></a>
#### URL.setNoiseReductionSharpen(val)
Apply the "nrs" imgix param to the image url. Same as doing .setParam('nrs', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for nrs |

<a name="imgix.URL+setPalette"></a>
#### URL.setPalette(val)
Apply the "palette" imgix param to the image url. Same as doing .setParam('palette', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for palette |

<a name="imgix.URL+setPaletteClass"></a>
#### URL.setPaletteClass(val)
Apply the "class" imgix param to the image url. Same as doing .setParam('class', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for class |

<a name="imgix.URL+setPalettePrefix"></a>
#### URL.setPalettePrefix(val)
Apply the "prefix" imgix param to the image url. Same as doing .setParam('prefix', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for prefix |

<a name="imgix.URL+setPaletteColorNumber"></a>
#### URL.setPaletteColorNumber(val)
Apply the "colors" imgix param to the image url. Same as doing .setParam('colors', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for colors |

<a name="imgix.URL+setPage"></a>
#### URL.setPage(val)
Apply the "page" imgix param to the image url. Same as doing .setParam('page', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for page |

<a name="imgix.URL+setDPR"></a>
#### URL.setDPR(val)
Apply the "dpr" imgix param to the image url. Same as doing .setParam('dpr', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for dpr |

<a name="imgix.URL+setFlip"></a>
#### URL.setFlip(val)
Apply the "flip" imgix param to the image url. Same as doing .setParam('flip', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for flip |

<a name="imgix.URL+setOrient"></a>
#### URL.setOrient(val)
Apply the "or" imgix param to the image url. Same as doing .setParam('or', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for or |

<a name="imgix.URL+setRotate"></a>
#### URL.setRotate(val)
Apply the "rot" imgix param to the image url. Same as doing .setParam('rot', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for rot |

<a name="imgix.URL+setCrop"></a>
#### URL.setCrop(val)
Apply the "crop" imgix param to the image url. Same as doing .setParam('crop', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for crop |

<a name="imgix.URL+setFit"></a>
#### URL.setFit(val)
Apply the "fit" imgix param to the image url. Same as doing .setParam('fit', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for fit |

<a name="imgix.URL+setHeight"></a>
#### URL.setHeight(val)
Apply the "h" imgix param to the image url. Same as doing .setParam('h', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for h |

<a name="imgix.URL+setRectangle"></a>
#### URL.setRectangle(val)
Apply the "rect" imgix param to the image url. Same as doing .setParam('rect', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for rect |

<a name="imgix.URL+setWidth"></a>
#### URL.setWidth(val)
Apply the "w" imgix param to the image url. Same as doing .setParam('w', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for w |

<a name="imgix.URL+setBlur"></a>
#### URL.setBlur(val)
Apply the "blur" imgix param to the image url. Same as doing .setParam('blur', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for blur |

<a name="imgix.URL+setHalftone"></a>
#### URL.setHalftone(val)
Apply the "htn" imgix param to the image url. Same as doing .setParam('htn', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for htn |

<a name="imgix.URL+setMonochrome"></a>
#### URL.setMonochrome(val)
Apply the "mono" imgix param to the image url. Same as doing .setParam('mono', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for mono |

<a name="imgix.URL+setPixelate"></a>
#### URL.setPixelate(val)
Apply the "px" imgix param to the image url. Same as doing .setParam('px', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for px |

<a name="imgix.URL+setSepia"></a>
#### URL.setSepia(val)
Apply the "sepia" imgix param to the image url. Same as doing .setParam('sepia', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for sepia |

<a name="imgix.URL+setText"></a>
#### URL.setText(val)
Apply the "txt" imgix param to the image url. Same as doing .setParam('txt', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txt |

<a name="imgix.URL+setTextAlign"></a>
#### URL.setTextAlign(val)
Apply the "txtalign" imgix param to the image url. Same as doing .setParam('txtalign', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtalign |

<a name="imgix.URL+setTextClip"></a>
#### URL.setTextClip(val)
Apply the "txtclip" imgix param to the image url. Same as doing .setParam('txtclip', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtclip |

<a name="imgix.URL+setTextColor"></a>
#### URL.setTextColor(val)
Apply the "txtclr" imgix param to the image url. Same as doing .setParam('txtclr', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtclr |

<a name="imgix.URL+setTextFit"></a>
#### URL.setTextFit(val)
Apply the "txtfit" imgix param to the image url. Same as doing .setParam('txtfit', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtfit |

<a name="imgix.URL+setTextFont"></a>
#### URL.setTextFont(val)
Apply the "txtfont" imgix param to the image url. Same as doing .setParam('txtfont', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtfont |

<a name="imgix.URL+setTextLine"></a>
#### URL.setTextLine(val)
Apply the "txtline" imgix param to the image url. Same as doing .setParam('txtline', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtline |

<a name="imgix.URL+setTextLineColor"></a>
#### URL.setTextLineColor(val)
Apply the "txtlineclr" imgix param to the image url. Same as doing .setParam('txtlineclr', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtlineclr |

<a name="imgix.URL+setTextPad"></a>
#### URL.setTextPad(val)
Apply the "txtpad" imgix param to the image url. Same as doing .setParam('txtpad', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtpad |

<a name="imgix.URL+setTextSize"></a>
#### URL.setTextSize(val)
Apply the "txtsize" imgix param to the image url. Same as doing .setParam('txtsize', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtsize |

<a name="imgix.URL+setTextShadow"></a>
#### URL.setTextShadow(val)
Apply the "txtshad" imgix param to the image url. Same as doing .setParam('txtshad', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for txtshad |

<a name="imgix.URL+setTrim"></a>
#### URL.setTrim(val)
Apply the "trim" imgix param to the image url. Same as doing .setParam('trim', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for trim |

<a name="imgix.URL+setTrimColor"></a>
#### URL.setTrimColor(val)
Apply the "trimcolor" imgix param to the image url. Same as doing .setParam('trimcolor', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for trimcolor |

<a name="imgix.URL+setTrimMeanDifference"></a>
#### URL.setTrimMeanDifference(val)
Apply the "trimmd" imgix param to the image url. Same as doing .setParam('trimmd', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for trimmd |

<a name="imgix.URL+setWatermark"></a>
#### URL.setWatermark(val)
Apply the "mark" imgix param to the image url. Same as doing .setParam('mark', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for mark |

<a name="imgix.URL+setWatermarkAlign"></a>
#### URL.setWatermarkAlign(val)
Apply the "markalign" imgix param to the image url. Same as doing .setParam('markalign', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for markalign |

<a name="imgix.URL+setWatermarkAlpha"></a>
#### URL.setWatermarkAlpha(val)
Apply the "markalpha" imgix param to the image url. Same as doing .setParam('markalpha', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for markalpha |

<a name="imgix.URL+setWatermarkFit"></a>
#### URL.setWatermarkFit(val)
Apply the "markfit" imgix param to the image url. Same as doing .setParam('markfit', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for markfit |

<a name="imgix.URL+setWatermarkHeight"></a>
#### URL.setWatermarkHeight(val)
Apply the "markh" imgix param to the image url. Same as doing .setParam('markh', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for markh |

<a name="imgix.URL+setWatermarkPadding"></a>
#### URL.setWatermarkPadding(val)
Apply the "markpad" imgix param to the image url. Same as doing .setParam('markpad', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for markpad |

<a name="imgix.URL+setWatermarkScale"></a>
#### URL.setWatermarkScale(val)
Apply the "markscale" imgix param to the image url. Same as doing .setParam('markscale', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for markscale |

<a name="imgix.URL+setWatermarkWidth"></a>
#### URL.setWatermarkWidth(val)
Apply the "markw" imgix param to the image url. Same as doing .setParam('markw', val)

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  

| Param | Description |
| --- | --- |
| val | the value to set for markw |

<a name="imgix.URL+getBrightness"></a>
#### URL.getBrightness()
Get the value of the "bri" imgix param currently on the image url. Same as doing .getParam('bri')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getContrast"></a>
#### URL.getContrast()
Get the value of the "con" imgix param currently on the image url. Same as doing .getParam('con')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getExposure"></a>
#### URL.getExposure()
Get the value of the "exp" imgix param currently on the image url. Same as doing .getParam('exp')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getGamma"></a>
#### URL.getGamma()
Get the value of the "gam" imgix param currently on the image url. Same as doing .getParam('gam')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getHighlight"></a>
#### URL.getHighlight()
Get the value of the "high" imgix param currently on the image url. Same as doing .getParam('high')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getHue"></a>
#### URL.getHue()
Get the value of the "hue" imgix param currently on the image url. Same as doing .getParam('hue')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getInvert"></a>
#### URL.getInvert()
Get the value of the "invert" imgix param currently on the image url. Same as doing .getParam('invert')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getSaturation"></a>
#### URL.getSaturation()
Get the value of the "sat" imgix param currently on the image url. Same as doing .getParam('sat')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getShadow"></a>
#### URL.getShadow()
Get the value of the "shad" imgix param currently on the image url. Same as doing .getParam('shad')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getSharpness"></a>
#### URL.getSharpness()
Get the value of the "sharp" imgix param currently on the image url. Same as doing .getParam('sharp')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getUnsharpMask"></a>
#### URL.getUnsharpMask()
Get the value of the "usm" imgix param currently on the image url. Same as doing .getParam('usm')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getUnsharpMaskRadius"></a>
#### URL.getUnsharpMaskRadius()
Get the value of the "usmrad" imgix param currently on the image url. Same as doing .getParam('usmrad')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getVibrance"></a>
#### URL.getVibrance()
Get the value of the "vib" imgix param currently on the image url. Same as doing .getParam('vib')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getAuto"></a>
#### URL.getAuto()
Get the value of the "auto" imgix param currently on the image url. Same as doing .getParam('auto')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBackground"></a>
#### URL.getBackground()
Get the value of the "bg" imgix param currently on the image url. Same as doing .getParam('bg')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendAlign"></a>
#### URL.getBlendAlign()
Get the value of the "ba" imgix param currently on the image url. Same as doing .getParam('ba')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendAlpha"></a>
#### URL.getBlendAlpha()
Get the value of the "balph" imgix param currently on the image url. Same as doing .getParam('balph')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendCrop"></a>
#### URL.getBlendCrop()
Get the value of the "bc" imgix param currently on the image url. Same as doing .getParam('bc')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendFit"></a>
#### URL.getBlendFit()
Get the value of the "bf" imgix param currently on the image url. Same as doing .getParam('bf')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendHeight"></a>
#### URL.getBlendHeight()
Get the value of the "bh" imgix param currently on the image url. Same as doing .getParam('bh')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlend"></a>
#### URL.getBlend()
Get the value of the "blend" imgix param currently on the image url. Same as doing .getParam('blend')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendMode"></a>
#### URL.getBlendMode()
Get the value of the "bm" imgix param currently on the image url. Same as doing .getParam('bm')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendPadding"></a>
#### URL.getBlendPadding()
Get the value of the "bp" imgix param currently on the image url. Same as doing .getParam('bp')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendSize"></a>
#### URL.getBlendSize()
Get the value of the "bs" imgix param currently on the image url. Same as doing .getParam('bs')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlendWidth"></a>
#### URL.getBlendWidth()
Get the value of the "bw" imgix param currently on the image url. Same as doing .getParam('bw')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBorder"></a>
#### URL.getBorder()
Get the value of the "border" imgix param currently on the image url. Same as doing .getParam('border')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getPad"></a>
#### URL.getPad()
Get the value of the "pad" imgix param currently on the image url. Same as doing .getParam('pad')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getDownload"></a>
#### URL.getDownload()
Get the value of the "dl" imgix param currently on the image url. Same as doing .getParam('dl')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getFormat"></a>
#### URL.getFormat()
Get the value of the "fm" imgix param currently on the image url. Same as doing .getParam('fm')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getQuality"></a>
#### URL.getQuality()
Get the value of the "q" imgix param currently on the image url. Same as doing .getParam('q')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getMask"></a>
#### URL.getMask()
Get the value of the "mask" imgix param currently on the image url. Same as doing .getParam('mask')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getNoiseReduction"></a>
#### URL.getNoiseReduction()
Get the value of the "nr" imgix param currently on the image url. Same as doing .getParam('nr')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getNoiseReductionSharpen"></a>
#### URL.getNoiseReductionSharpen()
Get the value of the "nrs" imgix param currently on the image url. Same as doing .getParam('nrs')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getPalette"></a>
#### URL.getPalette()
Get the value of the "palette" imgix param currently on the image url. Same as doing .getParam('palette')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getPaletteClass"></a>
#### URL.getPaletteClass()
Get the value of the "class" imgix param currently on the image url. Same as doing .getParam('class')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getPalettePrefix"></a>
#### URL.getPalettePrefix()
Get the value of the "prefix" imgix param currently on the image url. Same as doing .getParam('prefix')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getPaletteColorNumber"></a>
#### URL.getPaletteColorNumber()
Get the value of the "colors" imgix param currently on the image url. Same as doing .getParam('colors')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getPage"></a>
#### URL.getPage()
Get the value of the "page" imgix param currently on the image url. Same as doing .getParam('page')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getDPR"></a>
#### URL.getDPR()
Get the value of the "dpr" imgix param currently on the image url. Same as doing .getParam('dpr')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getFlip"></a>
#### URL.getFlip()
Get the value of the "flip" imgix param currently on the image url. Same as doing .getParam('flip')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getOrient"></a>
#### URL.getOrient()
Get the value of the "or" imgix param currently on the image url. Same as doing .getParam('or')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getRotate"></a>
#### URL.getRotate()
Get the value of the "rot" imgix param currently on the image url. Same as doing .getParam('rot')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getCrop"></a>
#### URL.getCrop()
Get the value of the "crop" imgix param currently on the image url. Same as doing .getParam('crop')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getFit"></a>
#### URL.getFit()
Get the value of the "fit" imgix param currently on the image url. Same as doing .getParam('fit')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getHeight"></a>
#### URL.getHeight()
Get the value of the "h" imgix param currently on the image url. Same as doing .getParam('h')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getRectangle"></a>
#### URL.getRectangle()
Get the value of the "rect" imgix param currently on the image url. Same as doing .getParam('rect')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWidth"></a>
#### URL.getWidth()
Get the value of the "w" imgix param currently on the image url. Same as doing .getParam('w')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getBlur"></a>
#### URL.getBlur()
Get the value of the "blur" imgix param currently on the image url. Same as doing .getParam('blur')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getHalftone"></a>
#### URL.getHalftone()
Get the value of the "htn" imgix param currently on the image url. Same as doing .getParam('htn')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getMonochrome"></a>
#### URL.getMonochrome()
Get the value of the "mono" imgix param currently on the image url. Same as doing .getParam('mono')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getPixelate"></a>
#### URL.getPixelate()
Get the value of the "px" imgix param currently on the image url. Same as doing .getParam('px')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getSepia"></a>
#### URL.getSepia()
Get the value of the "sepia" imgix param currently on the image url. Same as doing .getParam('sepia')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getText"></a>
#### URL.getText()
Get the value of the "txt" imgix param currently on the image url. Same as doing .getParam('txt')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextAlign"></a>
#### URL.getTextAlign()
Get the value of the "txtalign" imgix param currently on the image url. Same as doing .getParam('txtalign')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextClip"></a>
#### URL.getTextClip()
Get the value of the "txtclip" imgix param currently on the image url. Same as doing .getParam('txtclip')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextColor"></a>
#### URL.getTextColor()
Get the value of the "txtclr" imgix param currently on the image url. Same as doing .getParam('txtclr')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextFit"></a>
#### URL.getTextFit()
Get the value of the "txtfit" imgix param currently on the image url. Same as doing .getParam('txtfit')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextFont"></a>
#### URL.getTextFont()
Get the value of the "txtfont" imgix param currently on the image url. Same as doing .getParam('txtfont')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextLine"></a>
#### URL.getTextLine()
Get the value of the "txtline" imgix param currently on the image url. Same as doing .getParam('txtline')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextLineColor"></a>
#### URL.getTextLineColor()
Get the value of the "txtlineclr" imgix param currently on the image url. Same as doing .getParam('txtlineclr')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextPad"></a>
#### URL.getTextPad()
Get the value of the "txtpad" imgix param currently on the image url. Same as doing .getParam('txtpad')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextSize"></a>
#### URL.getTextSize()
Get the value of the "txtsize" imgix param currently on the image url. Same as doing .getParam('txtsize')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTextShadow"></a>
#### URL.getTextShadow()
Get the value of the "txtshad" imgix param currently on the image url. Same as doing .getParam('txtshad')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTrim"></a>
#### URL.getTrim()
Get the value of the "trim" imgix param currently on the image url. Same as doing .getParam('trim')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTrimColor"></a>
#### URL.getTrimColor()
Get the value of the "trimcolor" imgix param currently on the image url. Same as doing .getParam('trimcolor')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getTrimMeanDifference"></a>
#### URL.getTrimMeanDifference()
Get the value of the "trimmd" imgix param currently on the image url. Same as doing .getParam('trimmd')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermark"></a>
#### URL.getWatermark()
Get the value of the "mark" imgix param currently on the image url. Same as doing .getParam('mark')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermarkAlign"></a>
#### URL.getWatermarkAlign()
Get the value of the "markalign" imgix param currently on the image url. Same as doing .getParam('markalign')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermarkAlpha"></a>
#### URL.getWatermarkAlpha()
Get the value of the "markalpha" imgix param currently on the image url. Same as doing .getParam('markalpha')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermarkFit"></a>
#### URL.getWatermarkFit()
Get the value of the "markfit" imgix param currently on the image url. Same as doing .getParam('markfit')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermarkHeight"></a>
#### URL.getWatermarkHeight()
Get the value of the "markh" imgix param currently on the image url. Same as doing .getParam('markh')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermarkPadding"></a>
#### URL.getWatermarkPadding()
Get the value of the "markpad" imgix param currently on the image url. Same as doing .getParam('markpad')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermarkScale"></a>
#### URL.getWatermarkScale()
Get the value of the "markscale" imgix param currently on the image url. Same as doing .getParam('markscale')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.URL+getWatermarkWidth"></a>
#### URL.getWatermarkWidth()
Get the value of the "markw" imgix param currently on the image url. Same as doing .getParam('markw')

**Kind**: instance method of <code>[URL](#imgix.URL)</code>  
<a name="imgix.onready"></a>
### imgix.onready
Runs a function when the DOM is ready (similar to jQuery.ready)

**Kind**: static property of <code>[imgix](#imgix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ready | <code>function</code> | the function to run when the DOM is ready. |

<a name="imgix.helpers"></a>
### imgix.helpers : <code>object</code>
The helper namespace for lower-level functions

**Kind**: static namespace of <code>[imgix](#imgix)</code>  
<a name="imgix.isImageElement"></a>
### imgix.isImageElement(el) ⇒ <code>boolean</code>
Reports if an element is an image tag

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true if the element is an img tag  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to check |

<a name="imgix.setElementImageAfterLoad"></a>
### imgix.setElementImageAfterLoad(el, url, callback)
Intelligently sets an image on an element after the image has been cached.

**Kind**: static method of <code>[imgix](#imgix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to place the image on |
| url | <code>string</code> | the url of the image to set |
| callback | <code>function</code> | called once image has been preloaded and set |

<a name="imgix.setElementImage"></a>
### imgix.setElementImage(el, url) ⇒ <code>boolean</code>
Intelligently sets an image on an element.

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true on success  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to check |
| url | <code>string</code> | the url of the image to set |

<a name="imgix.getEmptyImage"></a>
### imgix.getEmptyImage() ⇒ <code>string</code>
An empty 1x1 transparent image

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - url of an empty image  
<a name="imgix.getElementImage"></a>
### imgix.getElementImage(el) ⇒ <code>string</code>
Intelligently returns the image on the element

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - url of the image on the element  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | the element to check |

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

<a name="imgix.applyAlphaToRGB"></a>
### imgix.applyAlphaToRGB(color, alpha) ⇒ <code>string</code>
Apply alpha to a RGB color string

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - color in rgba format rgb(255, 0, 255, 0.5)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | a color in rgb(r, g, b) format |
| alpha | <code>number</code> | aplpha amount 1=opaque 0=transparent |

<a name="imgix.hexToRGB"></a>
### imgix.hexToRGB(color) ⇒ <code>string</code>
Converts a hex color to rgb (#ff00ff -> rgb(255, 0, 255)

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - color in rgb format rgb(255, 0, 255)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | a color in hex format (#ff00ff) |

<a name="imgix.getElementsWithImages"></a>
### imgix.getElementsWithImages() ⇒ <code>NodeList</code>
Gives all elements on the page that have images (or could img). Does NOT support IE8

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>NodeList</code> - html elements with images  
<a name="imgix.hasImage"></a>
### imgix.hasImage(el) ⇒ <code>boolean</code>
Does an element have an image attached

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true if passed element has an image  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | element to check for images |

<a name="imgix.hasClass"></a>
### imgix.hasClass(elem, name) ⇒ <code>boolean</code>
Checks if an element has a class applied (via jquery)

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>boolean</code> - true if element has the class  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Element</code> | element to check for class |
| name | <code>string</code> | class name to look for |

<a name="imgix.rgbToHex"></a>
### imgix.rgbToHex(color) ⇒ <code>string</code>
Helper method to turn rgb(255, 255, 255) style colors to hex (ffffff)

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>string</code> - passed color converted to hex  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | in rgb(255, 255, 255) format |

<a name="imgix.getFontLookup"></a>
### imgix.getFontLookup() ⇒ <code>object</code>
Returns a font lookup. Pretty Name => name to use with imgix
Example: 'American Typewriter Bold' => 'American Typewriter,bold',

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>object</code> - pretty font name to imgix font param value  
<a name="imgix.getFonts"></a>
### imgix.getFonts() ⇒ <code>array</code>
Get a list of all the fonts supported by imgix

**Kind**: static method of <code>[imgix](#imgix)</code>  
**Returns**: <code>array</code> - An array of strings of the supported font names  
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

<a name="colorsCallback"></a>
## colorsCallback : <code>function</code>
This callback receives the colors in the image.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| colors | <code>array</code> | an array of colors |

<a name="autoUpdateElementCallback"></a>
## autoUpdateElementCallback : <code>function</code>
**Kind**: global typedef  
**Todo**

- [ ] how to doc the complex object that is passed back


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | information about element and image |

