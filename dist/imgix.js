(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var util = require('./util.js'),
  targetWidths = require('./targetWidths.js');

var ImgixTag = (function() {
  function ImgixTag(el, opts) {
    this.el = el;
    this.settings = opts || {};

    if (!this.el) {
      throw new Error('ImgixTag must be passed a DOM element.');
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
      throw new Error(
        'You must set a value for `imgix.config.host` or specify an `ix-host` attribute to use `ix-path` and `ix-params`.'
      );
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

  ImgixTag.prototype._extractBaseParams = function() {
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

  ImgixTag.prototype._buildBaseUrl = function() {
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

  ImgixTag.prototype._buildSrcsetPair = function(targetWidth) {
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

  ImgixTag.prototype.src = function() {
    return this.baseUrl;
  };

  // Returns a comma-separated list of `url widthDescriptor` pairs,
  // scaled appropriately to the same aspect ratio as the base image
  // as appropriate.
  ImgixTag.prototype.srcset = function() {
    var pairs = [];

    for (var i = 0; i < targetWidths.length; i++) {
      pairs.push(this._buildSrcsetPair(targetWidths[i]));
    }

    return pairs.join(', ');
  };

  ImgixTag.prototype.sizes = function() {
    var existingSizes = this.el.getAttribute('sizes');

    if (existingSizes) {
      return existingSizes;
    } else {
      return '100vw';
    }
  };

  return ImgixTag;
})();

module.exports = ImgixTag;

},{"./targetWidths.js":4,"./util.js":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
(function (global){
var ImgixTag = require('./ImgixTag.js'),
  util = require('./util.js'),
  defaultConfig = require('./defaultConfig');

var VERSION = '3.4.1';

function getMetaTagValue(propertyName) {
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
}

global.imgix = {
  init: function(opts) {
    var settings = util.shallowClone(this.config);
    util.extend(settings, opts || {});

    var elementQuery = [
      'img[' + settings.srcInputAttribute + ']',
      'source[' + settings.srcInputAttribute + ']',
      'img[' + settings.pathInputAttribute + ']',
      'source[' + settings.pathInputAttribute + ']'
    ].join(',');

    var allImgandSourceTags = document.querySelectorAll(elementQuery);

    for (var i = 0, el; i < allImgandSourceTags.length; i++) {
      new ImgixTag(allImgandSourceTags[i], settings);
    }
  },
  config: defaultConfig,
  VERSION: VERSION
};

util.domReady(function() {
  util.objectEach(defaultConfig, function(defaultValue, key) {
    var metaTagValue = getMetaTagValue(key);

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

  if (getMetaTagValue('autoInit') !== false) {
    global.imgix.init();
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ImgixTag.js":1,"./defaultConfig":2,"./util.js":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = {
  compact: function(arr) {
    var compactedArr = [];

    for (var i = 0; i < arr.length; i++) {
      arr[i] && compactedArr.push(arr[i]);
    }

    return compactedArr;
  },
  shallowClone: function(obj) {
    var clone = {};

    for (var key in obj) {
      clone[key] = obj[key];
    }

    return clone;
  },
  extend: function(dest, source) {
    for (var key in source) {
      dest[key] = source[key];
    }

    return dest;
  },
  uniq: function(arr) {
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
  objectEach: function(obj, iterator) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator(obj[key], key);
      }
    }
  },
  isString: function(value) {
    return typeof value === 'string';
  },
  encode64: function(str) {
    var encodedUtf8Str = unescape(encodeURIComponent(str)),
      b64Str = btoa(encodedUtf8Str),
      urlSafeB64Str = b64Str.replace(/\+/g, '-');

    urlSafeB64Str = urlSafeB64Str
      .replace(/\//g, '_')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');

    return urlSafeB64Str;
  },
  decode64: function(urlSafeB64Str) {
    var b64Str = urlSafeB64Str.replace(/-/g, '+').replace(/_/g, '/'),
      encodedUtf8Str = atob(b64Str),
      str = decodeURIComponent(escape(encodedUtf8Str));

    return str;
  },
  domReady: function(cb) {
    if (document.readyState === 'complete') {
      setTimeout(cb, 0);
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', cb, false);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
          cb();
        }
      });
    }
  }
};

},{}]},{},[3]);
