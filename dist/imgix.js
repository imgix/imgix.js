(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var util = require('./util.js'),
  targetWidths = require('./targetWidths.js'),
  autoSize = require('./autoSize');

var ImgixTag = (function () {
  function ImgixTag(el, opts) {
    this.el = el;
    this.settings = opts || {};

    if (!this.el) {
      console.warn('ImgixTag must be passed a DOM element.');
      return;
    }

    if (this.el.hasAttribute('ix-initialized') && !this.settings.force) {
      return;
    }

    this.ixPathVal = el.getAttribute(this.settings.pathInputAttribute);
    this.ixParamsVal = el.getAttribute(this.settings.paramsInputAttribute);
    this.ixSrcVal = el.getAttribute(this.settings.srcInputAttribute);
    this.ixHostVal =
      el.getAttribute(this.settings.hostInputAttribute) || this.settings.host;

    if (this.ixPathVal && !this.ixHostVal) {
      console.warn(
        'You must set a value for `imgix.config.host` or specify an `ix-host` attribute to use `ix-path` and `ix-params`.'
      );
      return;
    }

    if (typeof this.ixPathVal === 'string' && this.ixPathVal.length == 0) {
      console.warn('`ix-path` cannot accept a value of empty string ""');
      return;
    }

    if (typeof this.ixSrcVal === 'string' && this.ixSrcVal.length == 0) {
      console.warn('`ix-src` cannot accept a value of empty string ""');
      return;
    }

    this.baseParams = this._extractBaseParams();
    this.baseUrl = this._buildBaseUrl();
    this.baseUrlWithoutQuery = this.baseUrl.split('?')[0];

    if (util.isString(this.settings.sizesAttribute)) {
      this.sizes();
    }

    if (util.isString(this.settings.srcsetAttribute)) {
      this.el.setAttribute(this.settings.srcsetAttribute, this.srcset());
    }

    if (
      util.isString(this.settings.srcAttribute) &&
      this.el.nodeName == 'IMG'
    ) {
      this.el.setAttribute(this.settings.srcAttribute, this.src());
    }

    this.el.setAttribute('ix-initialized', 'ix-initialized');
  }

  ImgixTag.prototype._extractBaseParams = function () {
    var params = {};

    if (
      this.settings.defaultParams &&
      typeof this.settings.defaultParams === 'object' &&
      this.settings.defaultParams !== null
    ) {
      params = Object.assign({}, this.settings.defaultParams);
    }

    if (this.ixPathVal) {
      params = Object.assign({}, params, JSON.parse(this.ixParamsVal) || {});

      // Encode any passed Base64 variant params
      for (var key in params) {
        if (key.substr(-2) === '64') {
          params[key] = util.encode64(params[key]);
        }
      }
    } else {
      // If the user used `ix-src`, we have to extract the base params
      // from that string URL.
      var lastQuestion = this.ixSrcVal.lastIndexOf('?');

      if (lastQuestion > -1) {
        var paramString = this.ixSrcVal.substr(lastQuestion + 1),
          splitParams = paramString.split('&');

        for (var i = 0, splitParam; i < splitParams.length; i++) {
          splitParam = splitParams[i].split('=');

          params[splitParam[0]] = splitParam[1];
        }
      }
    }

    if (this.settings.includeLibraryParam) {
      params.ixlib = 'imgixjs-' + imgix.VERSION;
    }

    return params;
  };

  ImgixTag.prototype._buildBaseUrl = function () {
    if (this.ixSrcVal) {
      return this.ixSrcVal;
    }

    var path = this.ixPathVal,
      protocol = this.settings.useHttps ? 'https' : 'http',
      url = protocol + '://' + this.ixHostVal,
      hostEndsWithSlash = this.ixHostVal.substr(-1) === '/',
      pathStartsWithSlash = path[0] === '/';

    // Make sure we don't end up with 2 or 0 slashes between
    // the host and path portions of the generated URL
    if (hostEndsWithSlash && pathStartsWithSlash) {
      url += path.substr(1);
    } else if (!hostEndsWithSlash && !pathStartsWithSlash) {
      url += '/' + path;
    } else {
      url += path;
    }

    url += '?';
    var params = [],
      param;
    for (var key in this.baseParams) {
      param = this.baseParams[key];
      if (param == null) {
        continue;
      }

      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(param));
    }

    url += params.join('&');

    return url;
  };

  ImgixTag.prototype._buildSrcsetPair = function (targetWidth) {
    var clonedParams = util.shallowClone(this.baseParams);
    clonedParams.w = targetWidth;

    if (this.baseParams.w != null && this.baseParams.h != null) {
      clonedParams.h = Math.round(
        targetWidth * (this.baseParams.h / this.baseParams.w)
      );
    }

    var url = this.baseUrlWithoutQuery + '?',
      val,
      params = [];
    for (var key in clonedParams) {
      val = clonedParams[key];
      params.push(key + '=' + val);
    }

    url += params.join('&');

    return url + ' ' + targetWidth + 'w';
  };

  ImgixTag.prototype.src = function () {
    return this.baseUrl;
  };

  // Returns a comma-separated list of `url widthDescriptor` pairs,
  // scaled appropriately to the same aspect ratio as the base image
  // as appropriate.
  ImgixTag.prototype.srcset = function () {
    var pairs = [];

    for (var i = 0; i < targetWidths.length; i++) {
      pairs.push(this._buildSrcsetPair(targetWidths[i]));
    }

    return pairs.join(', ');
  };

  ImgixTag.prototype.sizes = function () {
    var existingSizes = this.el.getAttribute('sizes');
    if (existingSizes) {
      let auto = autoSize({ img: this.el });
      if (!auto) {
        console.info('No auto');
        this.el.setAttribute('sizes', existingSizes);
      }
    } else {
      this.el.setAttribute('sizes', '100vw');
    }
  };

  return ImgixTag;
})();

module.exports = ImgixTag;

},{"./autoSize":2,"./targetWidths.js":5,"./util.js":6}],2:[function(require,module,exports){
const WIDTH_MIN_SIZE = 40;
const PICTURE_REGEX = /^picture$/i;
const IMG_REGEX = /^img$/i;

/*
 *
 * - `getElementSize` function that given an html element,
 *    determines its rendered size
 *
 * - `imgCanBeSized` function that determines if the `img` tag has
 *    necessary attributes(`src-set`, `src`) to have its`siz``es`
 *    automatically set
 *
 * - `imageLoaded` function that determines if the `img` in question
 *    was rendered on the page
 *
 * - `setImgSize` function that updates an `img` tag’s `sizes`
 *    attribute to the best size for the given screen size
 *
 */

// requestAnimationFrame implementation that queues up calls to rAF
const rAF = (function () {
  let running, waiting;
  let firstFns = [];
  let secondFns = [];
  let fns = firstFns;

  const run = function () {
    const runFns = fns;

    // fun fns in FILO fashion
    fns = firstFns.length ? secondFns : firstFns;

    running = true;
    waiting = false;

    while (runFns.length) {
      runFns.shift()();
    }

    running = false;
  };

  // helper that either adds to the fns queue or run the raf call
  const rafBatch = function (fn, queue) {
    // if not queued, just invoke the function
    if (running && !queue) {
      fn.apply(this, arguments);
      // otherwise add the fn to the batch
    } else {
      fns.push(fn);

      // if not running a current batch and document is visible, run the rafBatch
      if (!waiting) {
        waiting = true;
        // if browser does not support rAF, use setTimeout, otherwise use rAF
        (document.hidden ? setTimeout : requestAnimationFrame)(run);
      }
    }
  };

  return rafBatch;
})();

const imgHasAttributes = ({ img }) => {
  // Verify that the img has attributes. If it does, check that one of those
  // is`sizes` and that its value is set to "auto".

  let canBeSized = false;

  try {
    if (img.hasAttributes()) {
      const attrs = img.attributes;
      for (let i = attrs.length - 1; i >= 0; i--) {
        if (attrs[i].name === 'sizes' && attrs[i].value == 'auto') {
          canBeSized = true;
          break;
        }
      }
    } else {
      console.info('\nDid not find image with attributes, ');
      console.info(img.hasAttributes());
      console.info('\n');
    }
  } catch (error) {
    console.info(error.message);
  }
  return canBeSized;
};

// Based off of: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
// Determines if the `img` element was rendered on the page
const imageLoaded = ({ img }) => {
  let loaded = false;
  // During the onload event, browser identifies any images that
  // weren’t downloaded as not complete. Some Gecko-based
  // browsers report this incorrectly.
  // More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-complete
  if (!img.complete) {
    console.info('\nImage did not load. `img.complete was`' + img.complete);
  }

  // naturalWidth and naturalHeight give the true size of the image.
  // If it failed to load, both of these will be zero.
  // More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-naturalheight
  if (img.naturalWidth === 0) {
    console.info(
      '\nImage did not load. `img.naturalWidth was`' + img.naturalWidth
    );
  }

  // Otherwise, assume it’s ok.
  loaded = true;
  return loaded;
};

const imgCanBeSized = ({ img }) => {
  // if the img is an `<img>` tag, has loaded, and has the sizes=auto attribute,
  // then its size can be set
  let canBeSized = false;

  if (
    IMG_REGEX.test(img.nodeName || '') &&
    imageLoaded({ img }) &&
    imgHasAttributes({ img })
  ) {
    canBeSized = true;
  } else {
    if (!IMG_REGEX.test(img.nodeName || '')) {
      console.info('Img did not match REGEX');
    }
    if (!imageLoaded({ img })) {
      console.info('\n Img has not loaded');
    }
    if (!imgHasAttributes({ img })) {
      console.info('\n Image does not have attributes');
    }
  }

  return canBeSized;
};

const getWidth = function ({ img, parent, width }) {
  let elementWidth = width || img.offsetWidth;

  while (elementWidth < WIDTH_MIN_SIZE && parent && !img._ixWidth) {
    elementWidth = parent.offsetWidth;
    parent = parent.parentNode;
  }

  return elementWidth;
};

const setElementSize = ({ img }) => {
  const parent = img.parentNode;

  if (parent) {
    let width = img.offsetWidth;
    width = getWidth({ img, parent, width });

    if (width && width !== img._ixWidth) {
      resizeElement({ img, parent, width });
    }
  }
};

const resizeElement = ({ img, parent, width }) => {
  // use the rAFIt helper to avoid incurring performance hit
  return rAF(function () {
    let sources, i;
    // store the value of width before it's stringified so it can be compared later
    img._ixSizesWidth = width;
    width += 'px';

    img.setAttribute('sizes', width);

    // parent node is a <picture> element, so set sizes for each `<source>`
    if (PICTURE_REGEX.test(parent.nodeName || '')) {
      sources = parent.getElementsByTagName('source');
      for (i = 0; i < sources.length; i++) {
        sources[i].setAttribute('sizes', width);
      }
    }
  });
};

const setImgSize = ({ img }) => {
  let result = false;
  const canBeSized = imgCanBeSized({ img });

  if (canBeSized) {
    console.info('\n---------  *  -----------');
    console.info('Image can be sized!');
    console.info(img);
    console.info('\n---------  *  -----------');
    setElementSize({ img });
    result = true;
  } else {
    console.info('\n---------  *  -----------');
    console.info('Image could not be resized.');
    console.info('\n---------  *  -----------');
  }

  return result;
};

module.exports = setImgSize;

},{}],3:[function(require,module,exports){
module.exports = {
  // URL assembly
  host: null,
  useHttps: true,
  includeLibraryParam: true,
  defaultParams: {},

  // Output element attributes
  srcAttribute: 'src',
  srcsetAttribute: 'srcset',
  sizesAttribute: 'sizes',

  // Input element attributes
  srcInputAttribute: 'ix-src',
  pathInputAttribute: 'ix-path',
  paramsInputAttribute: 'ix-params',
  hostInputAttribute: 'ix-host'
};

},{}],4:[function(require,module,exports){
(function (global){(function (){
var ImgixTag = require('./ImgixTag.js'),
  util = require('./util.js'),
  defaultConfig = require('./defaultConfig');

var VERSION = '3.4.2';

global.imgix = {
  init: function (opts) {
    var settings = util.shallowClone(this.config);
    util.extend(settings, opts || {});

    var elementQuery = [
      'img[' + settings.srcInputAttribute + ']',
      'source[' + settings.srcInputAttribute + ']',
      'img[' + settings.pathInputAttribute + ']',
      'source[' + settings.pathInputAttribute + ']',
    ].join(',');

    var allImgandSourceTags = document.querySelectorAll(elementQuery);

    for (var i = 0, el; i < allImgandSourceTags.length; i++) {
      new ImgixTag(allImgandSourceTags[i], settings);
    }
  },
  config: defaultConfig,
  VERSION: VERSION,
};

util.domReady(function () {
  util.objectEach(defaultConfig, function (defaultValue, key) {
    var metaTagValue = util.getMetaTagValue(key);

    if (typeof metaTagValue !== 'undefined') {
      var defaultConfigType = typeof defaultConfig[key];
      // Only allow boolean values for boolean configs
      if (defaultConfigType === 'boolean') {
        global.imgix.config[key] = !!metaTagValue;
      } else if (defaultConfigType === 'object' && defaultConfig[key] != null) {
        global.imgix.config[key] = JSON.parse(metaTagValue) || {};
      } else {
        global.imgix.config[key] = metaTagValue;
      }
    }
  });

  if (util.getMetaTagValue('autoInit') !== false) {
    global.imgix.init();
  }
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ImgixTag.js":1,"./defaultConfig":3,"./util.js":6}],5:[function(require,module,exports){
function targetWidths() {
  var resolutions = [];
  var prev = 100;
  var INCREMENT_PERCENTAGE = 8;
  var MAX_SIZE = 8192;

  function ensureEven(n) {
    return 2 * Math.round(n / 2);
  }

  while (prev <= MAX_SIZE) {
    resolutions.push(ensureEven(prev));
    prev *= 1 + (INCREMENT_PERCENTAGE / 100) * 2;
  }

  return resolutions;
}

module.exports = targetWidths();

},{}],6:[function(require,module,exports){
module.exports = {
  compact: function (arr) {
    var compactedArr = [];

    for (var i = 0; i < arr.length; i++) {
      arr[i] && compactedArr.push(arr[i]);
    }

    return compactedArr;
  },
  shallowClone: function (obj) {
    var clone = {};

    for (var key in obj) {
      clone[key] = obj[key];
    }

    return clone;
  },
  extend: function (dest, source) {
    for (var key in source) {
      dest[key] = source[key];
    }

    return dest;
  },
  uniq: function (arr) {
    var n = {},
      r = [],
      i;

    for (i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }

    return r;
  },
  objectEach: function (obj, iterator) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator(obj[key], key);
      }
    }
  },
  isString: function (value) {
    return typeof value === 'string';
  },
  encode64: function (str) {
    var encodedUtf8Str = unescape(encodeURIComponent(str)),
      b64Str = btoa(encodedUtf8Str),
      urlSafeB64Str = b64Str.replace(/\+/g, '-');

    urlSafeB64Str = urlSafeB64Str
      .replace(/\//g, '_')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');

    return urlSafeB64Str;
  },
  decode64: function (urlSafeB64Str) {
    var b64Str = urlSafeB64Str.replace(/-/g, '+').replace(/_/g, '/'),
      encodedUtf8Str = atob(b64Str),
      str = decodeURIComponent(escape(encodedUtf8Str));

    return str;
  },
  domReady: function (cb) {
    if (document.readyState === 'complete') {
      setTimeout(cb, 0);
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', cb, false);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') {
          cb();
        }
      });
    }
  },
  getMetaTagValue: function (propertyName) {
    var metaTag = document.querySelector(
        'meta[property="ix:' + propertyName + '"]'
      ),
      metaTagContent;

    if (!metaTag) {
      return;
    }

    metaTagContent = metaTag.getAttribute('content');

    if (metaTagContent === 'true') {
      return true;
    } else if (metaTagContent === 'false') {
      return false;
    } else if (metaTagContent === '' || metaTagContent === 'null') {
      return null;
    } else {
      return metaTagContent;
    }
  },
};

},{}]},{},[4]);
