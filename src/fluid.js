'use strict';

var fluidDefaults = {
  fluidClass: 'imgix-fluid',
  updateOnResize: true,
  updateOnResizeDown: false,
  updateOnPinchZoom: false,
  highDPRAutoScaleQuality: true,
  onChangeParamOverride: null,
  autoInsertCSSBestPractices: false,

  fitImgTagToContainerWidth: true,
  fitImgTagToContainerHeight: false,
  ignoreDPR: false,
  pixelStep: 10,
  debounce: 200,
  lazyLoad: false,
  lazyLoadColor: null,
  lazyLoadOffsetVertical: 20,
  lazyLoadOffsetHorizontal: 20,
  throttle: 200,
  maxHeight: 5000,
  maxWidth: 5000,
  onLoad: null
};

function getFluidDefaults() {
  return fluidDefaults;
}

imgix.FluidSet = function (options) {
  if (imgix.helpers.isReallyObject(options)) {
    this.options = imgix.helpers.mergeObject(getFluidDefaults(), options);
  } else {
    this.options = imgix.helpers.mergeObject(getFluidDefaults(), {});
  }

  this.lazyLoadOffsets = {
    t: Math.max(this.options.lazyLoadOffsetVertical, 0),
    b: Math.max(this.options.lazyLoadOffsetVertical, 0),
    l: Math.max(this.options.lazyLoadOffsetHorizontal, 0),
    r: Math.max(this.options.lazyLoadOffsetHorizontal, 0)
  };

  this.namespace = Math.random().toString(36).substring(7);

  this.windowResizeEventBound = false;
  this.windowScrollEventBound = false;
  this.windowLastWidth = 0;
  this.windowLastHeight = 0;
};

imgix.FluidSet.prototype.updateSrc = function (elem, pinchScale) {
  // An empty src attribute throws off the 'hidden' check below,
  // so we need to give it something to actually fill it up
  if (elem.hasAttribute('src') && elem.getAttribute('src') === '') {
    elem.setAttribute('src', imgix.getEmptyImage());
  }

  // Short-circuit if the image is hidden
  if (!elem.offsetWidth && !elem.offsetHeight && !elem.getClientRects().length) {
    return;
  }

  var details = this.getImgDetails(elem, pinchScale || 1),
    newUrl = details.url,
    currentElemWidth = details.width,
    currentElemHeight = details.height;

  if (this.options.lazyLoad) {
    var r = elem.getBoundingClientRect(),
        view = {
          left: 0 - this.lazyLoadOffsets.l,
          top: 0 - this.lazyLoadOffsets.t,
          bottom: (window.innerHeight || document.documentElement.clientHeight) + this.lazyLoadOffsets.b,
          right: (window.innerWidth || document.documentElement.clientWidth) + this.lazyLoadOffsets.r
        };

    if ((r.top > view.bottom) || (r.left > view.right) || (r.top + currentElemHeight < view.top) || (r.left + currentElemWidth < view.left)) {

      if (!elem.fluidLazyColored && this.options.lazyLoadColor) {
        elem.fluidLazyColored = 1;
        var self = this,
          llcType = typeof this.options.lazyLoadColor,
          i = new imgix.URL(imgix.helpers.getImgSrc(elem));

        i.getColors(16, function (colors) {
          if (!colors) {
            imgix.helpers.warn('No colors found for', i.getURL(), 'for element', elem);
            return;
          }

          var useColor = null;
          if (llcType === 'boolean') {
            useColor = colors[0];
          } else if (llcType === 'number' && self.options.lazyLoadColor < colors.length) {
            useColor = colors[self.options.lazyLoadColor];
          } else if (llcType === 'function') {
            useColor = self.options.lazyLoadColor(elem, colors);
          }

          if (useColor !== null) {
            if (imgix.isImageElement(elem) && elem.parentNode && elem.parentNode.tagName.toLowerCase() !== 'body') {
              elem.parentNode.style.backgroundColor = useColor;
            } else {
              elem.style.backgroundColor = useColor;
            }
          }
        });
      }
      return;
    }
  }


  elem.lastWidth = elem.lastWidth || 0;
  elem.lastHeight = elem.lastHeight || 0;

  if (this.options.updateOnResizeDown === false && elem.lastWidth >= currentElemWidth && elem.lastHeight >= currentElemHeight) {
    return;
  }


  if (!elem.fluidUpdateCount) {
    elem.fluidUpdateCount = 0;
  }

  var onLoad = function () {};

  if (this.options.onLoad && typeof this.options.onLoad === 'function') {
    onLoad = this.options.onLoad;
  }

  // wrapped onLoad to handle race condition where multiple images are requested before the first one can load
  var wrappedOnLoad = function (el, imgUrl) {
    el.fluidUpdateCount = parseInt(el.fluidUpdateCount, 10) + 1;
    onLoad(el, imgUrl);
  };

  imgix.setElementImageAfterLoad(elem, newUrl, wrappedOnLoad);
  elem.lastWidth = currentElemWidth;
  elem.lastHeight = currentElemHeight;
};

imgix.FluidSet.prototype.getImgDetails = function (elem, zoomMultiplier) {
  if (!elem) {
    return;
  }

  var dpr = imgix.helpers.getWindowDPR(),
    pixelStep = this.options.pixelStep,
    elemSize = imgix.helpers.calculateElementSize(imgix.isImageElement(elem) ? elem.parentNode : elem),
    elemWidth = imgix.helpers.pixelRound(elemSize.width * zoomMultiplier, pixelStep),
    elemHeight = imgix.helpers.pixelRound(elemSize.height * zoomMultiplier, pixelStep);

  if (!elem.url) {
    elem.url = new imgix.URL(imgix.helpers.getImgSrc(elem));
  }

  elem.url.setParams({
    h: '',
    w: ''
  });

  elemWidth = Math.min(elemWidth, this.options.maxWidth);
  elemHeight = Math.min(elemHeight, this.options.maxHeight);

  if (dpr !== 1 && !this.options.ignoreDPR) {
    elem.url.setParam('dpr', dpr);
  }

  if (this.options.highDPRAutoScaleQuality && dpr > 1) {
    elem.url.setParam('q', Math.min(Math.max(parseInt((100 / dpr), 10), 30), 75));
  }

  if (this.options.fitImgTagToContainerHeight && this.options.fitImgTagToContainerWidth) {
    elem.url.setParam('fit', 'crop');
  }

  if (elem.url.getParam('fit') === 'crop') {
    if (elemHeight > 0 && (!imgix.isImageElement(elem) || (imgix.isImageElement(elem) && this.options.fitImgTagToContainerHeight))) {
      elem.url.setParam('h', elemHeight);
    }

    if (elemWidth > 0 && (!imgix.isImageElement(elem) || (imgix.isImageElement(elem) && this.options.fitImgTagToContainerWidth))) {
      elem.url.setParam('w', elemWidth);
    }
  } else {
    if (elemHeight <= elemWidth) {
      elem.url.setParam('w', elemWidth);
    } else {
      elem.url.setParam('h', elemHeight);
    }
  }

  if (!imgix.isImageElement(elem) && this.options.autoInsertCSSBestPractices && elem.style) {
    elem.style.backgroundRepeat = 'no-repeat';
    elem.style.backgroundSize = 'cover';
    elem.style.backgroundPosition = '50% 50%';
  }

  var overrides = {};
  if (this.options.onChangeParamOverride !== null && typeof this.options.onChangeParamOverride === 'function') {
    overrides = this.options.onChangeParamOverride(elemWidth, elemHeight, elem.url.getParams(), elem);
  }

  for (var k in overrides) {
    if (overrides.hasOwnProperty(k)) {
      elem.url.setParam(k, overrides[k]);
    }
  }

  return {
    url: elem.url.getURL(),
    width: elemWidth,
    height: elemHeight
  };
};

imgix.FluidSet.prototype.toString = function () {
  return '[object FluidSet]';
};

imgix.FluidSet.prototype.reload = function () {
  imgix.fluid(this);

  this.windowLastWidth = imgix.helpers.getWindowWidth();
  this.windowLastHeight = imgix.helpers.getWindowHeight();
};

imgix.FluidSet.prototype.attachGestureEvent = function (elem) {
  var self = this;
  if (elem.addEventListener && !elem.listenerAttached) {
    elem.addEventListener('gestureend', function (e) {
      self.updateSrc(this, e.scale);
    }, false);

    elem.addEventListener('gesturechange', function () {
      self.updateSrc(this);
    }, false);

    elem.listenerAttached = true;
  }
};

var scrollInstances = {},
  resizeInstances = {};

imgix.FluidSet.prototype.attachScrollListener = function () {
  var th = this;

  scrollInstances[this.namespace] = imgix.helpers.throttler(function () {
    th.reload();
  }, this.options.throttle);

  if (document.addEventListener) {
    window.addEventListener('scroll', scrollInstances[this.namespace], false);
  } else {
    window.attachEvent('onscroll', scrollInstances[this.namespace]);
  }

  this.windowScrollEventBound = true;
};

imgix.FluidSet.prototype.attachWindowResizer = function () {
  var th = this;

  resizeInstances[this.namespace] = imgix.helpers.debouncer(function () {
    if (this.windowLastWidth !== imgix.helpers.getWindowWidth() || this.windowLastHeight !== imgix.helpers.getWindowHeight()) {
      th.reload();
    }
  }, this.options.debounce);

  if (window.addEventListener) {
    window.addEventListener('resize', resizeInstances[this.namespace], false);
  } else if (window.attachEvent) {
    window.attachEvent('onresize', resizeInstances[this.namespace]);
  }

  this.windowResizeEventBound = true;
};


/**
 * Enables fluid (responsive) images for any element(s) with the 'imgix-fluid' class.
 * To scope to images within a specific DOM node, pass the enclosing HTML element as the first argument.


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


 * @memberof imgix
 * @static
 * @param [rootNode=document] optional HTML element to scope operations on
 * @param {object} config options for fluid (this extends the defaults)
 */
imgix.fluid = function () {
  var elem, node;
  if (arguments.length > 0 && arguments[0].nodeType === 1) {
    node = arguments[0];
    elem = arguments[1];
  } else {
    elem = arguments[0];
  }

  if (elem === null) {
    return;
  }

  var options,
    fluidSet;

  if (imgix.helpers.isReallyObject(elem)) {

    var passedKeys = Object.keys(elem),
      goodKeys = Object.keys(getFluidDefaults());

    for (var i = 0; i < passedKeys.length; i++) {
      if (goodKeys.indexOf(passedKeys[i]) === -1) {
        imgix.helpers.warn('\'' + passedKeys[i] + '\' is not a valid imgix.fluid config option. See https://github.com/imgix/imgix.js/blob/master/docs/api.md#imgix.fluid for a list of valid options.');
      }
    }

    options = imgix.helpers.mergeObject(getFluidDefaults(), elem);
    fluidSet = new imgix.FluidSet(options);
    elem = null;

  } else if (imgix.helpers.isFluidSet(elem)) {
    fluidSet = elem;
    options = fluidSet.options;
  } else {
    options = imgix.helpers.mergeObject(getFluidDefaults(), {});
    fluidSet = new imgix.FluidSet(options);
  }

  var fluidElements;
  if (elem && !imgix.helpers.isFluidSet(elem)) {
    fluidElements = Array.isArray(elem) ? elem : [elem];
  } else {
    var cls = options.fluidClass.toString();
    cls = cls.slice(0, 1) === '.' ? cls : ('.' + cls);
    fluidElements = (node || document).querySelectorAll(cls);
    if (node && imgix.helpers.matchesSelector(node, cls)) {
      fluidElements = Array.prototype.slice.call(fluidElements);
      fluidElements.unshift(node);
    }
  }

  for (var j = 0; j < fluidElements.length; j++) {
    if (fluidElements[j] === null) {
      continue;
    }

    if (options.updateOnPinchZoom) {
      fluidSet.attachGestureEvent(fluidElements[j]);
    }

    fluidSet.updateSrc(fluidElements[j]);
  }

  if (options.lazyLoad && !fluidSet.windowScrollEventBound) {
    fluidSet.attachScrollListener();
  }

  if (options.updateOnResize && !fluidSet.windowResizeEventBound) {
    fluidSet.attachWindowResizer();
  }

  return fluidSet;
};
