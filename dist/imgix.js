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

    this.window = this.settings.window ? this.settings.window : null;

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
      this.el.setAttribute(this.settings.sizesAttribute, this.sizes());
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
    const el = this.el;
    const _window = this.window;

    if (existingSizes && existingSizes !== 'auto') {
      return existingSizes;
    } else if (existingSizes === 'auto') {
      return autoSize.updateOnResize({ el, existingSizes, _window });
    } else {
      return '100vw';
    }
  };

  return ImgixTag;
})();

module.exports = ImgixTag;

},{"./autoSize":2,"./targetWidths.js":5,"./util.js":6}],2:[function(require,module,exports){
const WIDTH_MIN_SIZE = 40;

// If element's width is less than parent width, use the parent's. If
// resulting width is less than minimum, use the minimum. Do this to
// Avoid failing to resize when window expands and avoid setting sizes
// to 0 when el.offsetWidth == 0.
const getWidth = function ({ el, parent, width }) {
  let parentWidth = parent.offsetWidth;

  // get the fist parent that has a size over the minimum
  while (parent.parentNode && parentWidth < WIDTH_MIN_SIZE) {
    parentWidth = parent.parentNode.offsetWidth;
    parent = parent.parentNode;
  }

  if (width < parentWidth) {
    width = parentWidth;
  }
  if (width < WIDTH_MIN_SIZE) {
    width = el._ixWidth ? el._ixWidth : WIDTH_MIN_SIZE;
  }

  el.setAttribute('_ixWidth', width);

  return width;
};

// Based off of: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
// Determines if the `img` element was rendered on the page
const imageLoaded = ({ el }) => {
  // During the onload event, browser identifies any images that
  // weren’t downloaded as not complete. Some Gecko-based browsers
  // report this incorrectly. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-complete
  if (!el.complete) {
    console.error('not complete');
    return false;
  }

  // naturalWidth and naturalHeight give the intrinsic (natural),
  // density-corrected size of the image. If img failed to load,
  // both of these will be zero. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-naturalheight
  if (el.naturalWidth === 0) {
    console.error('no natural width');
    return false;
  }

  // Otherwise, assume it’s ok.
  return true;
};

// Returns true if img has sizes attr and the img has loaded.
const imgCanBeSized = ({ el, existingSizes }) => {
  if (!existingSizes) {
    return false;
  }

  if (!el.hasAttributes()) {
    return false;
  }

  return imageLoaded({ el });
};

const getCurrentSize = ({ el, existingSizes }) => {
  // TODO: instead of sizes="557px" do sizes="(max-width: currentBrowserWidth + 100) 557px, 100vw"
  // browserWidth = 1000px, image width = 500px
  // sizes="(max-width: currentBrowserWidth + 100) 557px, (imageWidth / browserWidth * 100)vw" --> 50vw

  // If image loaded calc size, otherwise leave as existing
  let currentSize = imgCanBeSized({ el, existingSizes })
    ? getWidth({
        el,
        parent: el.parentNode,
        width: el.offsetWidth,
      }) + 'px'
    : existingSizes;

  return currentSize;
};

const rAF = ({ el, existingSizes, _window }) => {
  // If there's an existing rAF call, cancel it
  let currentRAF = el.getAttribute('_ixRaf');
  if (currentRAF) {
    el.setAttribute('_ixListening', false);
    el.setAttribute('_ixRaf', -1);
    _window.cancelAnimationFrame(currentRAF);
  }

  // Setup the new requestAnimationFrame()
  currentRAF = _window.requestAnimationFrame(() => {
    // Track the status of the listener
    el.setAttribute('_ixListening', true);
    // Run our resize function callback that calcs current size
    // and updates the elements `sizes` to match.
    const currentSize = getCurrentSize({ el, existingSizes });

    // Only update element attributes if changed
    if (currentSize !== existingSizes) {
      el.setAttribute('sizes', currentSize);
    }

    return currentSize;
  });
  // track the rAF id
  el.setAttribute('_ixRaf', currentRAF);
};

// Function that makes throttled rAF calls to avoid multiple calls in the same frame
const updateOnResize = ({ el, existingSizes, _window }) => {
  // Listen for resize
  _window.addEventListener(
    'resize',
    (event) => rAF({ el, existingSizes, _window }),
    false
  );
  // Return the current size
  return (
    getWidth({
      el,
      parent: el.parentNode,
      width: el.offsetWidth,
    }) + 'px'
  );
};

const autoSize = {
  getElementWidth: getWidth,
  imgCanBeSized,
  updateOnResize,
};

module.exports = autoSize;

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
  hostInputAttribute: 'ix-host',
  window: typeof window !== 'undefined' ? window : null,
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
