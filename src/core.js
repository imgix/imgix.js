'use strict';

// Establish the root object, `window` in the browser, or `exports` on the server.
var root = this;

/**
 * `imgix` is the root namespace for all imgix client code.
 * @namespace imgix
 */
var imgix = {
  version: '1.0.25'
};

// expose imgix to browser or node
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = imgix;
  }
  exports.imgix = imgix;
} else {
  root.imgix = imgix;
}

var IMGIX_USABLE_CLASS = 'imgix-usable';

/**
 * The helper namespace for lower-level functions
 * @namespace imgix.helpers
 */
imgix.helpers = {
  debouncer: function (func, wait) {
    var timeoutRef;
    return function () {
      var self = this,
        args = arguments,
        later = function () {
          timeoutRef = null;
          func.apply(self, args);
        };

      window.clearTimeout(timeoutRef);
      timeoutRef = window.setTimeout(later, wait);
    };
  },

  // FROM: https://github.com/websanova/js-url | unknown license.
  urlParser: (function () {
    function isNumeric(arg) {
      return !isNaN(parseFloat(arg)) && isFinite(arg);
    }

    return function (arg, url) {
      var _ls = url || window.location.toString();

      if (!arg) {
        return _ls;
      } else {
        arg = arg.toString();
      }

      if (_ls.substring(0, 2) === '//') {
        _ls = 'http:' + _ls;
      } else if (_ls.split('://').length === 1) {
        _ls = 'http://' + _ls;
      }

      url = _ls.split('/');
      var _l = {auth: ''},
          host = url[2].split('@');

      if (host.length === 1) {
        host = host[0].split(':');
      } else {
        _l.auth = host[0]; host = host[1].split(':');
      }

      _l.protocol = url[0];
      _l.hostname = host[0];
      _l.port = (host[1] || ((_l.protocol.split(':')[0].toLowerCase() === 'https') ? '443' : '80'));
      _l.pathname = ( (url.length > 3 ? '/' : '') + url.slice(3, url.length).join('/').split('?')[0].split('#')[0]);
      var _p = _l.pathname;

      if (_p.charAt(_p.length - 1) === '/') {
        _p = _p.substring(0, _p.length - 1);
      }
      var _h = _l.hostname,
          _hs = _h.split('.'),
          _ps = _p.split('/');

      if (arg === 'hostname') {
        return _h;
      } else if (arg === 'domain') {
        if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(_h)) {
          return _h;
        } else {
          return _hs.slice(-2).join('.');
        }
      } else if (arg === 'sub') {
        return _hs.slice(0, _hs.length - 2).join('.');
      } else if (arg === 'port') {
        return _l.port;
      } else if (arg === 'protocol') {
        return _l.protocol.split(':')[0];
      } else if (arg === 'auth') {
        return _l.auth;
      } else if (arg === 'user') {
        return _l.auth.split(':')[0];
      } else if (arg === 'pass') {
        return _l.auth.split(':')[1] || '';
      } else if (arg === 'path') {
        return _l.pathname;
      } else if (arg.charAt(0) === '.') {
        arg = arg.substring(1);
        if (isNumeric(arg)) {
          arg = parseInt(arg, 10);
          return _hs[arg < 0 ? _hs.length + arg : arg - 1] || '';
        }
      } else if (isNumeric(arg)) {
        arg = parseInt(arg, 10);
        return _ps[arg < 0 ? _ps.length + arg : arg] || '';
      } else if (arg === 'file') {
        return _ps.slice(-1)[0];
      } else if (arg === 'filename') {
        return _ps.slice(-1)[0].split('.')[0];
      } else if (arg === 'fileext') {
        return _ps.slice(-1)[0].split('.')[1] || '';
      } else if (arg.charAt(0) === '?' || arg.charAt(0) === '#') {
        var params = _ls,
            param = null;

        if (arg.charAt(0) === '?') {
          params = (params.split('?')[1] || '').split('#')[0];
        } else if (arg.charAt(0) === '#') {
          params = (params.split('#')[1] || '');
        }

        if (!arg.charAt(1)) {
          return params;
        }

        arg = arg.substring(1);
        params = params.split('&');

        for (var i = 0, ii = params.length; i < ii; i++) {
          param = params[i].split('=');
          if (param[0] === arg) {
            return param[1] || '';
          }
        }

        return null;
      }

      return '';
    };
  })(),

  mergeObject: function () {
    var obj = {},
        i = 0,
        il = arguments.length,
        key;
    for (; i < il; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  },

  pixelRound: function (pixelSize, pixelStep) {
    return Math.ceil(pixelSize / pixelStep) * pixelStep;
  },

  isMobileDevice: function () {
    return (/iPhone|iPod|iPad/i).test(navigator.userAgent);
  },

  isNumber: function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  // From http://stackoverflow.com/a/16091319/24998
  getZoom: function () {
    var svg,
        ns = 'http://www.w3.org/2000/svg',
        z = 1;

    if (document.createElementNS) {
      svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('xmlns', ns);
      svg.setAttribute('version', '1.1');
      document.body.appendChild(svg);
      z = svg.currentScale || 1;
      document.body.removeChild(svg);
    }

    return z;
  },

  getDPR: function () {
    var dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;

    if (dpr % 1 !== 0) {
      var tmpStr = dpr.toString();
      tmpStr = tmpStr.split('.')[1];
      dpr = (tmpStr.length > 1 && tmpStr.slice(1, 2) !== '0') ? dpr.toFixed(2) : dpr.toFixed(1);
    }

    return dpr;
  },

  getWindowWidth: function () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) || 1024;
  },

  getWindowHeight: function () {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0) || 768;
  },

  getImgSrc: function (elem) {
    return elem.getAttribute('data-src') || elem.getAttribute('src');
  },

  calculateElementSize: function (elem) {
    var val = {
      width: elem.offsetWidth,
      height: elem.offsetHeight
    };

    if (elem.parentNode === null || elem === document.body) {
      val.width = this.getWindowWidth();
      val.height = this.getWindowHeight();
      return val;
    }

    if (val.width !== 0 || val.height !== 0) {
      if (elem.alt && !elem.fluid) {
        elem.fluid = true;
        return this.calculateElementSize(elem.parentNode);
      }
      return val;
    } else {
      var found,
        prop,
        past = {},
        visProp = {position: 'absolute', visibility: 'hidden', display: 'block'};

      for (prop in visProp) {
        if (visProp.hasOwnProperty(prop)) {
          past[prop] = elem.style[prop];
          elem.style[prop] = visProp[prop];
        }
      }

      found = {
        width: elem.offsetWidth,
        height: elem.offsetHeight
      };

      for (prop in visProp) {
        if (visProp.hasOwnProperty(prop)) {
          elem.style[prop] = past[prop];
        }
      }

      if (found.width === 0 || found.height === 0) {
        return this.calculateElementSize(elem.parentNode);
      } else {
        return found;
      }
    }
  },

  isReallyObject: function (elem) {
    return elem && typeof elem === 'object' && (elem.toString()) === '[object Object]';
  },

  isFluidSet: function (elem) {
    return elem && typeof elem === 'object' && (elem.toString()) === '[object FluidSet]';
  },

  extractInt: function (str) {
    if (str === undefined) {
      return 0;
    } else if (typeof str === 'number') {
      return str;
    }
    return parseInt(str.replace(/\D/g, ''), 10) || 0;
  },

  camelize: function (str) {
    return str.replace(/[-_\s]+(.)?/g, function (match, c) { return c ? c.toUpperCase() : ''; });
  },

  getElementCssProperty: function (elem, prop) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(elem, null).getPropertyValue(prop);
    } else {
      if (elem && elem.style && prop) {
        return elem.style[this.camelize(prop)];
      }
    }

    return '';
  },

  matchesSelector: function (elem, selector) {
    var children = (elem.parentNode || document).querySelectorAll(selector);
    return Array.prototype.slice.call(children).indexOf(elem) > -1;
  }
};

/**
 * Get html element by auto-generated (via XPath) class name
 * @memberof imgix
 * @static
 * @private
 * @param {string} xpath the xpath of the element
 * @returns {Element} element with the xpath
 */
imgix.getElementByXPathClassName = function (xpath) {
  return document.querySelector('.' + imgix.getXPathClass(xpath));
};


/**
 * Get image from an html element by auto-generated (via XPath) class name
 * @memberof imgix
 * @static
 * @private
 * @param {string} xpath the xpath of the element to get
 * @returns {string} url of image on the element
 */
imgix.getElementImageByXPathClassName = function (xpath) {
  return imgix.getElementImage(imgix.getElementByXPathClassName(xpath));
};

/**
 * Reports if an element is an image tag
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {boolean} true if the element is an img tag
 */
imgix.isImageElement = function (el) {
  return (el && el.tagName && el.tagName.toLowerCase() === 'img');
};

/**
 * Intelligently sets an image on an element after the image has been cached.
 * @memberof imgix
 * @static
 * @param {Element} el the element to place the image on
 * @param {string} url the url of the image to set
 * @param {function} callback called once image has been preloaded and set
 */
imgix.setElementImageAfterLoad = function (el, imgUrl, callback) {
  var img = new Image();
  img.src = imgUrl;
  img.onload = function () {
    imgix.setElementImage(el, imgUrl);
    if (typeof callback === 'function') {
      callback(el, imgUrl);
    }
  };
};

/**
 * Intelligently sets an image on an element.
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @param {string} url the url of the image to set
 * @returns {boolean} true on success
 */
imgix.setElementImage = function (el, imgUrl) {
  if (!el) {
    return false;
  }

  if (imgix.isImageElement(el)) {
    if (el.src !== imgUrl) {
      el.src = imgUrl;
    }
    return true;
  } else {
    var curBg = imgix.getBackgroundImage(el);
    if (curBg !== imgUrl) {
      if (curBg) {
        el.style.cssText = el.style.cssText.replace(curBg, imgUrl);
        return true;
      } else {
        if (document.addEventListener) {
          el.style.backgroundImage = 'url(' + imgUrl + ')';
        } else {
          el.style.cssText = 'background-image:url(' + imgUrl + ')';
        }
        return true;
      }
    }
  }

  return false;
};

/**
 * An empty 1x1 transparent image
 * @memberof imgix
 * @static
 * @returns {string} url of an empty image
 */
imgix.getEmptyImage = function () {
  return imgix.versionifyUrl('https://assets.imgix.net/pixel.gif');
};

/**
 * Intelligently returns the image on the element
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {string} url of the image on the element
 */
imgix.getElementImage = function (el) {
  if (imgix.isImageElement(el)) {
    return el.src;
  } else {
    return imgix.getBackgroundImage(el);
  }
};

/**
 * Returns the matches for the url on the element's cssText
 * @memberof imgix
 * @static
 * @private
 * @param {Element} el the element to check
 * @todo use cssProperty instead?
 * @returns {string} url of the image on the element
 */
imgix.getRawBackgroundImage = function (el) {
  return el.style.cssText.match(/url\(([^\)]+)/);
};

/**
 * Returns the background image for an element
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {string} url of the image on the element
 */
imgix.getBackgroundImage = function (el) {
  var raw = imgix.getRawBackgroundImage(el);
  if (!raw) {
    return '';
  } else {
    return raw.length === 2 ? raw[1] : '';
  }
};

/**
 * Gives a brightness score for a given color (higher is brighter)
 * @memberof imgix
 * @static
 * @param {string} color a color in rgb(r, g, b) format
 * @returns {Number} brightness score for the passed color
 */
imgix.getColorBrightness = function (c) {
  if (c) {
    if (c.slice(0, 1) === '#') {
      c = imgix.hexToRGB(c);
    }
  } else {
    return 0;
  }

  var parts = c.replace(/[^0-9,]+/g, '').split(','),
    r = parseInt(parts[0], 10),
    g = parseInt(parts[1], 10),
    b = parseInt(parts[2], 10);

  return Math.sqrt((r * r * 0.241) + (g * g * 0.691) + (b * b * 0.068));
};

/**
 * Apply alpha to a RGB color string
 * @memberof imgix
 * @static
 * @param {string} color a color in rgb(r, g, b) format
 * @param {number} alpha aplpha amount 1=opaque 0=transparent
 * @returns {string} color in rgba format rgb(255, 0, 255, 0.5)
 */
imgix.applyAlphaToRGB = function (rgb, alpha) {

  var pushAlpha = rgb.slice(0, 4) !== 'rgba',
    parts = rgb.split(',');

  parts = parts.map(function (a) {
    return parseInt(a.replace(/\D/g, ''), 10);
  });

  if (pushAlpha) {
    parts.push(alpha);
  } else if (parts.length === 4) {
    parts[3] = alpha;
  }

  return 'rgba(' + parts.join(', ') + ')';
};

/**
 * Converts a hex color to rgb (#ff00ff -> rgb(255, 0, 255)
 * @memberof imgix
 * @static
 * @param {string} color a color in hex format (#ff00ff)
 * @returns {string} color in rgb format rgb(255, 0, 255)
 */
imgix.hexToRGB = function (hex) {

  if (hex) {
    if (hex.slice(0, 1) === '#') {
      hex = hex.slice(1, hex.length);
    } else if (hex.slice(0, 3) === 'rgb') {
      return hex;
    }
  }

  var r = 0,
    g = 0,
    b = 0;

  function dupe(x) {
    return (x + x).toString();
  }

  if (hex.length === 3) {
    r = parseInt(dupe(hex.slice(0, 1)), 16);
    g = parseInt(dupe(hex.slice(1, 2)), 16);
    b = parseInt(dupe(hex.slice(2, 3)), 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    console.warn('invalid hex color:', hex);
  }

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

/**
 * Gives all elements on the page that have images (or could img). Does NOT support IE8
 * @memberof imgix
 * @static
 * @returns {NodeList} html elements with images
 */
imgix.getElementsWithImages = function () {
  imgix.markElementsWithImages();

  return document.querySelectorAll('.' + IMGIX_USABLE_CLASS);
};

/**
 * Does an element have an image attached
 * @memberof imgix
 * @static
 * @param {Element} el element to check for images
 * @returns {boolean} true if passed element has an image
 */
imgix.hasImage = function (el) {
  var toCheck = el.style.cssText ? el.style.cssText.toLowerCase() : el.style.cssText;
  return el && (imgix.isImageElement(el) || toCheck.indexOf('background-image') !== -1);
};

/**
 * Helper method that attaches IMGIX_CLASS to all elements with images on a page
 * @memberof imgix
 * @private
 * @static
 */
imgix.markElementsWithImages = function () {
  var all = document.getElementsByTagName('*');
  for (var i = 0, max = all.length; i < max; i++) {
    if (imgix.hasImage(all[i])) {
      imgix.setImgixClass(all[i]);
    }
  }
};

/**
 * Checks if an element has a class applied (via jquery)
 * @memberof imgix
 * @static
 * @param {Element} elem element to check for class
 * @param {string} name class name to look for
 * @returns {boolean} true if element has the class
 */
imgix.hasClass = function (elem, name) {
  return (' ' + elem.className + ' ').indexOf(' ' + name + ' ') > -1;
};

/**
 * Helper method that 'marks' an element as 'imgix usable' by adding special classes
 * @memberof imgix
 * @static
 * @private
 * @param {Element} el the element to place the class on
 * @returns {string} auto-generated class name (via xpath)
 */
imgix.setImgixClass = function (el) {
  if (imgix.hasClass(el, IMGIX_USABLE_CLASS)) {
    return imgix.getImgixClass(el);
  }

  var cls = imgix.getXPathClass(imgix.getElementTreeXPath(el));

  el.classList.add(cls);
  el.classList.add(IMGIX_USABLE_CLASS);

  return imgix.getImgixClass(el);
};

/**
 * Helper method that returns generated (via xpath) class name for 'marked' image elements
 * @memberof imgix
 * @static
 * @private
 * @param {Element} el the element to get the class for
 * @returns {string} class name
 */
imgix.getImgixClass = function (el) {
  if (imgix.hasClass(el, IMGIX_USABLE_CLASS)) {
    return el.className.match(/imgix-el-[^\s]+/)[0];
  }
};

imgix.getXPathClass = function (xpath) {
  xpath = !!xpath ? xpath : (new Date().getTime().toString());
  return 'imgix-el-' + imgix.md5(xpath);
};

/**
 * Helper method to turn rgb(255, 255, 255) style colors to hex (ffffff)
 * @memberof imgix
 * @static
 * @param {string} color in rgb(255, 255, 255) format
 * @returns {string} passed color converted to hex
 */
imgix.rgbToHex = function (value) {
  var parts = value.split(',');

  parts = parts.map(function (a) {
    return imgix.componentToHex(parseInt(a.replace(/\D/g, '')));
  });

  return parts.join('');
};

imgix.componentToHex = function (c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

// Current: https://github.com/firebug/firebug/blob/5026362f2d1734adfcc4b44d5413065c50b27400/extension/content/firebug/lib/xpath.js
imgix.getElementTreeXPath = function (element) {
  var paths = [];

  // Use nodeName (instead of localName) so namespace prefix is included (if any).
  for (; element && element.nodeType === Node.ELEMENT_NODE; element = element.parentNode) {
    var index = 0;
    for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
      // Ignore document type declaration.
      if (sibling.nodeType === Node.DOCUMENT_TYPE_NODE) {
        continue;
      }

      if (sibling.nodeName === element.nodeName) {
        ++index;
      }
    }

    var tagName = (element.prefix ? element.prefix + ':' : '') + element.localName,
        pathIndex = (index ? '[' + (index + 1) + ']' : '');

    paths.splice(0, 0, tagName + pathIndex);
  }

  return paths.length ? '/' + paths.join('/') : null;
};

/**
 * Returns a font lookup. Pretty Name => name to use with imgix
 * Example: 'American Typewriter Bold' => 'American Typewriter,bold',
 * @memberof imgix
 * @static
 * @returns {object} pretty font name to imgix font param value
 */
imgix.getFontLookup = function () {
  return {
    'American Typewriter': 'American Typewriter',
    'American Typewriter Bold': 'American Typewriter,bold',
    'American Typewriter Condensed': 'American Typewriter Condensed',
    'American Typewriter Condensed Bold': 'American Typewriter Condensed,bold',
    'American Typewriter Condensed Light': 'American Typewriter Condensed Light',
    'American Typewriter Light': 'American Typewriter Light',
    'Andale Mono': 'Andale Mono',
    'Arial': 'Arial',
    'Arial Black': 'Arial Black',
    'Arial Bold': 'Arial,bold',
    'Arial Bold Italic': 'Arial,bold,italic',
    'Arial Italic': 'Arial,italic',
    'Baskerville': 'Baskerville',
    'Big Caslon': 'Big Caslon',
    'Brush Script MT': 'Brush Script MT',
    'Cochin': 'Cochin',
    'Copperplate': 'Copperplate',
    'Courier': 'Courier',
    'Courier Bold': 'Courier,bold',
    'Courier Oblique': 'Courier Oblique',
    'Didot': 'Didot',
    'Futura': 'Futura',
    'Futura Condensed': 'Futura Condensed Medium',
    'Futura Italic': 'Futura Medium,italic',
    'Georgia': 'Georgia',
    'Georgia Bold': 'Georgia,bold',
    'Georgia Bold Italic': 'Georgia,bold,italic',
    'Georgia Italic': 'Georgia,italic',
    'Gill Sans': 'Gill Sans',
    'Gill Sans Bold': 'Gill Sans,bold',
    'Gill Sans Bold Italic': 'Gill Sans,bold,italic',
    'Gill Sans Italic': 'Gill Sans,italic',
    'Gill Sans Light': 'Gill Sans Light',
    'Gill Sans Light Italic': 'Gill Sans Light,italic',
    'Helvetica': 'Helvetica',
    'Helvetica Bold': 'Helvetica,bold',
    'Helvetica Light': 'Helvetica Light',
    'Helvetica Light Oblique': 'Helvetica Light Oblique',
    'Helvetica Neue': 'Helvetica Neue',
    'Helvetica Neue Bold': 'Helvetica Neue,bold',
    'Helvetica Neue Bold Italic': 'Helvetica Neue,bold,italic',
    'Helvetica Neue Condensed Black': 'Helvetica Neue Condensed Black',
    'Helvetica Neue Condensed Bold': 'Helvetica Neue Condensed,bold',
    'Helvetica Neue Light': 'Helvetica Neue Light',
    'Helvetica Neue Light Italic': 'Helvetica Neue Light,italic',
    'Helvetica Neue Medium': 'Helvetica Neue Medium',
    'Helvetica Neue UltraLight': 'Helvetica Neue UltraLight',
    'Helvetica Neue UltraLight Italic': 'Helvetica Neue UltraLight,italic',
    'Helvetica Oblique': 'Helvetica Oblique',
    'Herculanum': 'Herculanum',
    'Impact': 'Impact',
    'Marker Felt Thin': 'Marker Felt Thin',
    'Marker Felt Wide': 'Marker Felt Wide',
    'Optima': 'Optima',
    'Optima Bold': 'Optima,bold',
    'Optima Bold Italic': 'Optima,bold,italic',
    'Optima ExtraBlack': 'Optima ExtraBlack',
    'Optima Italic': 'Optima,italic',
    'Papyrus': 'Papyrus',
    'Papyrus Condensed': 'Papyrus Condensed',
    'Times': 'Times',
    'Times Bold': 'Times,bold',
    'Times Bold Italic': 'Times,bold,italic',
    'Times Italic': 'Times,italic',
    'Times New Roman': 'Times New Roman',
    'Times New Roman Bold': 'Times New Roman,bold',
    'Times New Roman Bold Italic': 'Times New Roman,bold,italic',
    'Times New Roman Italic': 'Times New Roman,italic',
    'Trebuchet MS': 'Trebuchet MS',
    'Trebuchet MS Bold': 'Trebuchet MS,bold',
    'Trebuchet MS Bold Italic': 'Trebuchet MS,bold,italic',
    'Trebuchet MS Italic': 'Trebuchet MS,italic',
    'Verdana': 'Verdana',
    'Verdana Bold': 'Verdana,bold',
    'Verdana Bold Italic': 'Verdana,bold,italic',
    'Verdana Italic': 'Verdana,italic',
    'Zapfino': 'Zapfino'
  };
};

/**
 * Get a list of all the fonts supported by imgix
 * @memberof imgix
 * @static
 * @returns {array} An array of strings of the supported font names
 */
imgix.getFonts = function () {
  return Object.keys(imgix.getFontLookup());
};

imgix.searchFonts = function (needle) {
  needle = needle.toLowerCase();
  return imgix.getFonts().filter(function (i) { return i.toLowerCase().indexOf(needle) !== -1; });
};

imgix.isFontAvailable = function (font) {
  return imgix.isDef(imgix.getFontLookup()[font]);
};

imgix.getAllParams = function () {
  return [
    // Adjustment
    'bri',
    'con',
    'exp',
    'gam',
    'high',
    'hue',
    'invert',
    'int', // Deprecated
    'sat',
    'shad',
    'sharp',
    'usm',
    'usmrad',
    'vib',

    // Automatic
    'auto',

    // Background
    'bg',

    // Blend
    'ba',
    'balph',
    'bc',
    'bf',
    'bh',
    'blend',
    'bm',
    'bp',
    'bs',
    'bw',

    // Border & padding
    'border',
    'pad',

    // Format
    'dl',
    'fm',
    'q',

    // Mask
    'mask',

    // Noise
    'nr',
    'nrs',

    // Palette
    'class', // Deprecated
    'colors',
    'prefix',
    'palette',

    // PDF
    'page',

    // Pixel Density
    'dpr',

    // Rotation
    'flip',
    'or',
    'rot',

    // Size
    'crop',
    'fit',
    'h',
    'rect',
    'w',

    // Stylize
    'blur',
    'htn',
    'mono',
    'px',
    'sepia',

    // Text
    'txt',
    'txtalign',
    'txtclip',
    'txtclr',
    'txtfit',
    'txtfont',
    'txtline',
    'txtlineclr',
    'txtpad',
    'txtshad',
    'txtsize',

    // Trim
    'trim',
    'trimcolor',
    'trimmd',

    // Watermark
    'mark',
    'markalign',
    'markalpha',
    'markfit',
    'markh',
    'markpad',
    'markscale',
    'markw'
  ];
};

imgix.getParamAliases = function () {
  return {
    t: 'txt',
    tf: 'txtfont',
    tsz: 'txtsize',
    tl: 'txtline',
    tsh: 'txtshad',
    tp: 'txtpad',
    txtlinecolor: 'txtlineclr',
    ta: 'txtalign',
    intensity: 'int',
    monochrome: 'mono',
    f: 'fit',
    orient: 'or',
    m: 'watermark',
    mf: 'markfit',
    ms: 'markscale',
    ma: 'markalign',
    mp: 'markpad'
  };
};

imgix.getDefaultParamValues = function () {
  return {
    // Adjustment
    bri: 0,
    con: 0,
    exp: 0,
    gam: 0,
    high: 0,
    hue: 0,
    sat: 0,
    shad: 0,
    sharp: 0,
    usm: 0,
    usmrad: 2.5,
    vib: 0,

    // Blend
    ba: 'middle,center',
    balph: 100,
    bf: 'clip',
    bp: 0,

    // Border & padding
    pad: 0,

    // Format
    q: 75,

    // Noise
    nr: 20,
    nrs: 20,

    // Palette
    colors: 6,
    prefix: 'image',
    palette: '',

    // PDF
    page: 1,

    // Pixel Density
    dpr: 1,

    // Rotation
    rot: 0,

    // Size
    fit: 'clip',

    // Stylize
    blur: 0,
    htn: 0,
    px: 0,
    sepia: 0,

    // Text
    txtalign: 'bottom,right',
    txtclip: 'end',
    txtclr: '000',
    txtfont: 'Helvetica',
    txtline: 0,
    txtlineclr: 'FFF',
    txtpad: 10,
    txtsize: 12,

    // Trim
    trimmd: 11,

    // Watermark
    markalign: 'bottom,right',
    markalpha: 100,
    markfit: 'clip',
    markpad: 10
  };
};

imgix.getDefaultParamValue = function (param) {
  return imgix.getDefaultParamValues()[param];
};

imgix.getDefaultParams = function () {
  return Object.keys(imgix.getDefaultParamValues());
};

imgix.makeCssClass = function (url) {
  return 'tmp_' + imgix.md5(url);
};

imgix.injectStyleSheet = function (url) {
  var ss = document.createElement('link');
  ss.type = 'text/css';
  ss.rel = 'stylesheet';
  ss.href = url;

  document.getElementsByTagName('head')[0].appendChild(ss);
};

imgix.findInjectedStyleSheet = function (url) {
  if (document.styleSheets) {
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].href === url) {
        return true;
      }
    }
  }

  return false;
};

imgix.getElementImageSize = function (el) {
  var w = 0,
    h = 0;

  if (imgix.isImageElement(el)) {
    w = el.naturalWidth;
    h = el.naturalHeight;
  } else {
    w = imgix.helpers.extractInt(imgix.getCssProperty(el, 'width'));
    h = imgix.helpers.extractInt(imgix.getCssProperty(el, 'height'));
  }

  return {
    width: w,
    height: h
  };
};

imgix.getCssPropertyById = function (elmId, property) {
  var elem = document.getElementById(elmId);
  return imgix.helpers.getElementCssProperty(elem, property);
};

imgix.getCssProperty = function (el, property) {
  return imgix.helpers.getElementCssProperty(el, property);
};

imgix.getCssPropertyBySelector = function (sel, property) {
  var elem = document.querySelector(sel);
  return imgix.helpers.getElementCssProperty(elem, property);
};

imgix.instanceOfImgixURL = function (x) {
  return x && x.toString() === '[object imgixURL]';
};

imgix.setGradientOnElement = function (el, colors, baseColor) {
  var baseColors = [];
  if (typeof baseColor === 'undefined') {
    // transparent base colors if not set
    baseColors = ['transparent', 'transparent'];
  } else {
    var base = imgix.hexToRGB(baseColor); // force rgb if in hex
    if (base.slice(0, 4) === 'rgba') {
      // if given an rgba then use that as the upper and force 0 for lower
      baseColors.push(base);
      baseColors.push(imgix.applyAlphaToRGB(base, 0));
    } else {
      // default to 0 to 50% transparency for passed solid base color
      baseColors.push(imgix.applyAlphaToRGB(base, 0.5));
      baseColors.push(imgix.applyAlphaToRGB(base, 0));
    }
  }

  var backgroundGradients = [
      '-ms-linear-gradient(top, ' + baseColors[0] + ' 0%, ' + baseColors[1] + ' 100%),-ms-linear-gradient(bottom left, ' + colors[2] + ' 0%,' + colors[4] + ' 25%, ' + colors[6] + ' 50%, ' + colors[8] + ' 75%,' + colors[10] + ' 100%)',
'-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, ' + baseColors[1] + '), color-stop(100%, ' + baseColors[0] + ')),-webkit-gradient(linear, 0% 100%, 100% 0%, color-stop(0%, ' + colors[2] + '), color-stop(25%, ' + colors[4] + '), color-stop(50%, ' + colors[6] + '), color-stop(75%, ' + colors[7] + '), color-stop(100%, ' + colors[10] + '))',
      '-webkit-linear-gradient(top, ' + baseColors[0] + ', ' + baseColors[1] + ' 100%),-webkit-linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')',
      '-moz-linear-gradient(top, ' + baseColors[0] + ', ' + baseColors[1] + ' ),-moz-linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')',
      '-o-linear-gradient(top, ' + baseColors[0] + ',' + baseColors[1] + '),-o-linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')',
      'linear-gradient(top, ' + baseColors[0] + ',' + baseColors[1] + '),linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')'
    ];

  for (var x = 0; x < backgroundGradients.length; x++) {
    el.style.backgroundImage = backgroundGradients[x];
  }
};

/**
 * Represents an imgix url
 * @memberof imgix
 * @constructor
 * @param {string} url An imgix url to start with (optional)
 * @param {object} imgParams imgix query string params (optional)
 * @param {object} token secure url token for signing images (optional)
 */
imgix.URL = function (url, imgParams, token, isRj) {

  this.token = token || '';
  this._autoUpdateSel = null;
  this._autoUpdateCallback = null;
  this.isRj = !imgix.isDef(isRj) ? false : isRj;

  if (url && url.slice(0, 2) === '//' && window && window.location) {
    url = window.location.protocol + url;
  }

  this.setUrl(url);

  if (typeof imgParams === 'object') {
    this.setParams(imgParams);
  }

  this.paramAliases = {};
};

/**
 * Attach a gradient of colors from the imgix image URL to the passed html element (or selector for that element)
 * @memberof imgix
 * @param {string} elemOrSel html elment or css selector for the element
 * @param {string} baseColor color in rgb or hex
 */
imgix.URL.prototype.attachGradientTo = function (elemOrSel, baseColor, callback) {
  this.getColors(16, function (colors) {
    if (colors && colors.length < 9) {
      console.warn('not enough colors to create a gradient');
      if (callback && typeof callback === 'function') {
        callback(false);
      }
      return;
    }
    if (typeof elemOrSel === 'string') {
      var results = document.querySelectorAll(elemOrSel);
      if (results && results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          imgix.setGradientOnElement(results[i], colors, baseColor);
        }
      }
    } else {
      imgix.setGradientOnElement(elemOrSel, colors, baseColor);
    }

    if (callback && typeof callback === 'function') {
      callback(true);
    }
  });
};

/**
 * Attach the image url (.getUrl() value) to the passed html element (or selector for that element)
 * @memberof imgix
 * @param {string} elemOrSel html elment or css selector for the element
 * @param {function} callback optional callback to be called when image is set on the element
 */
imgix.URL.prototype.attachImageTo = function (elemOrSel, callback) {
  // this.token = token;
  if (typeof elemOrSel === 'string') {
    var results = document.querySelectorAll(elemOrSel);
    if (results && results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        imgix.setElementImageAfterLoad(results[i], this.getUrl(), callback);
      }
    }
  } else {
    imgix.setElementImageAfterLoad(elemOrSel, this.getUrl(), callback);
  }
};


/**
 * Set the token for signing images. If a token is set it will always sign the generated urls
 * @memberof imgix
 * @param {string} token secure url token from your imgix source
 */
imgix.URL.prototype.setToken = function (token) {
  this.token = token;
};

imgix.createParamString = function () {
  return new imgix.URL('');
};

imgix.updateVersion = {};

var cssColorCache = {};
/**
 * Get an array of the colors in the image
 * @memberof imgix
 * @param {number} num Desired number of colors
 * @param {colorsCallback} callback handles the response of colors
 */
imgix.URL.prototype.getColors = function (num, callback) {
  var clone = new imgix.URL(this.getUrl()),
    paletteClass = imgix.makeCssClass(this.getUrl());

  if (typeof num === 'function') {
    if (typeof callback === 'number') {
      var tmpNum = callback;
      callback = num;
      num = tmpNum;
    } else {
      callback = num;
      num = 10;
    }
  }

  clone.setPaletteColorNumber(num);
  clone.setPalette('css');
  clone.setPaletteClass(paletteClass);

  var cssUrl = clone.getUrl();

  imgix.injectStyleSheet(cssUrl);

  var lookForLoadedCss = function () {
    if (!imgix.findInjectedStyleSheet(cssUrl)) {
      setTimeout(lookForLoadedCss, 100);
    } else {
      var lastColor = null;

      setTimeout(function () {
        var promises = [],
          maxTries = 100;

        for (var i = 1; i <= num; i++) {

          (function (i) {
            var tmps = document.createElement('span');
            tmps.id = paletteClass + '-' + i;
            tmps.className = paletteClass + '-fg-' + i;
            document.body.appendChild(tmps);

            promises.push(
              new Promise(function (resolve, reject) {
                var attempts = 0,
                    checkLoaded;

                checkLoaded = function () {
                  var c = imgix.getCssPropertyById(tmps.id, 'color');
                  if (c !== lastColor) {
                    document.body.removeChild(tmps);
                    resolve({'num': i, 'color': c});
                    lastColor = c;
                  } else {
                    if (++attempts < maxTries) {
                      setTimeout(checkLoaded, 50);
                    } else {
                      document.body.removeChild(tmps);
                      resolve({'num': i, 'color': 'rgb(255, 255, 255)'});
                    }
                  }
                };

                setTimeout(checkLoaded, 300);
              })
            );
          })(i);

        } // end loop

        Promise.all(promises).then(function (values) {
          var resultColors = [];

          values = values.sort(function (a, b) {
            return a.num - b.num;
          });

          for (var x = 0; x < values.length; x++) {
            resultColors.push(imgix.hexToRGB(values[x].color));
          }

          if (resultColors && resultColors.length > 1) {
            if (imgix.getColorBrightness(resultColors[resultColors.length - 1]) < imgix.getColorBrightness(resultColors[0])) {
              resultColors.reverse();
            }
          }

          cssColorCache[cssUrl] = resultColors;
          if (callback) {
            callback(resultColors);
          }
        });


      }, 10);
    }
  };

  if (cssColorCache.hasOwnProperty(cssUrl)) {
    if (callback) {
      callback(cssColorCache[cssUrl]);
    }
  } else {
    lookForLoadedCss();
  }
};
/**
 * This callback receives the colors in the image.
 * @callback colorsCallback
 * @param {array} colors an array of colors
 */

imgix.URL.prototype._handleAutoUpdate = function () {
  var self = this,
    totalImages = 0,
    loadedImages = 0,
    curSel = this._autoUpdateSel,
    imgToEls = {};

  if (!imgix.isDef(imgix.updateVersion[curSel])) {
    imgix.updateVersion[curSel] = 1;
  } else {
    imgix.updateVersion[curSel]++;
  }


  function isVersionFresh(v) {
    return curSel === self._autoUpdateSel && v === imgix.updateVersion[curSel];
  }

  function setImage(el, imgUrl) {
    if (!(imgUrl in imgToEls)) {
      imgToEls[imgUrl] = [];
      (function () {
        var img = document.createElement('img'),
          curV = imgix.updateVersion[curSel],
          startTime = (new Date()).getTime();

        img.src = imgUrl;
        img.onload = img.onerror = function () {
          if (!isVersionFresh(curV)) {
            // console.log(curV + ' is an old version -- not updating');
            return;
          }

          for (var i = 0; i < imgToEls[imgUrl].length; i++) {
            imgix.setElementImage(imgToEls[imgUrl][i], imgUrl);
            loadedImages++;

            if (typeof self._autoUpdateCallback === 'function') {
              var obj = {
                  element: imgToEls[imgUrl][i],
                  isComplete: loadedImages === totalImages, // boolean
                  percentComplete: (loadedImages / totalImages) * 100, // float
                  totalComplete: loadedImages, // int
                  loadTime: (new Date()).getTime() - startTime,
                  total: totalImages // int
                };

              self._autoUpdateCallback(obj);
            }
          }
        };
      })();
    }

    imgToEls[imgUrl].push(el);
  }

  function applyImg(el) {
    var elImg = imgix.getElementImage(el),
      elBaseUrl = elImg;

    if (elImg && elImg.indexOf('?') !== -1) {
      elBaseUrl = elImg.split('?')[0];
    }

    if (self.getBaseUrl()) {
      setImage(el, self.getUrl());
    } else if (elBaseUrl && self.getQueryString()) {
      setImage(el, elBaseUrl + '?' + self.getQueryString());
    } else {
      loadedImages++;
    }
  }

  if (this._autoUpdateSel !== null) {
    var el = document.querySelectorAll(this._autoUpdateSel);

    totalImages = el.length;

    if (el && totalImages === 1) {
      applyImg(el[0]);
    } else {
      for (var i = 0; i < totalImages; i++) {
        applyImg(el[i]);
      }
    }
  }
};


/**
 * When/if the url changes it will auto re-set the image on the element of the css selector passed
 * @memberof imgix
 * @param {string} sel css selector for an <img> element on the page
 * @param {autoUpdateElementCallback} callback fires whenever the img element is updated
 */
imgix.URL.prototype.autoUpdateImg = function (sel, callback) {
  this._autoUpdateSel = sel;
  this._autoUpdateCallback = callback;
  this._handleAutoUpdate();
};
/**
 *
 * @callback autoUpdateElementCallback
 * @param {object} obj information about element and image
 * @todo how to doc the complex object that is passed back
 */

imgix.URL.prototype.setUrl = function (url) {
  if (!url || typeof url !== 'string' || url.length === 0) {
    url = imgix.getEmptyImage();
  }
  this.urlParts = this.isRj ? imgix.parseRjUrl(url) : imgix.parseUrl(url);
};

imgix.URL.prototype.setURL = function (url) {
  return this.setUrl(url);
};

imgix.URL.prototype.getURL = function () {
  return this.getUrl();
};

imgix.URL.prototype.toString = function () {
  return '[object imgixURL]';
};

/**
 * The generated imgix image url
 * @memberof imgix
 * @returns {string} the generated url
 */
imgix.URL.prototype.getUrl = function () {
  var url = this.isRj ? imgix.buildRjUrl(this.urlParts) : imgix.buildUrl(this.urlParts);
  if (this.token) {
    return this.isRj ? imgix.signRjUrl(url, this.token) : imgix.signUrl(url, this.token);
  }

  if (!url || url.length === 0) {
    return imgix.getEmptyImage();
  }

  url = imgix.versionifyUrl(url);

  return url;
};

/**
 * Remove an imgix param
 * @memberof imgix
 * @param {string} param the imgix param to remove (e.g. txtfont)
 */
imgix.URL.prototype.removeParam = function (param) {
  if (this.urlParts.paramValues.hasOwnProperty(param)) {
    delete this.urlParts.paramValues[param];
    this.urlParts.params = Object.keys(this.urlParts.paramValues);
  }
};

/**
 * Remove an imgix param then immediately set new params. This only triggers one update if used with autoUpdateImg.
 * @memberof imgix
 * @param {object} params object of params to set
 */
imgix.URL.prototype.clearThenSetParams = function (params) {
  this.clearParams(false); // do not trigger update yet
  this.setParams(params);
};

/**
 * Clear all imgix params attached to the image
 * @memberof imgix
 * @param {boolean} runUpdate (optional) iff using autoUpdateImg should callback be called (defaults to true)
 */
imgix.URL.prototype.clearParams = function (runUpdate) {
  runUpdate = !imgix.isDef(runUpdate) ? true : runUpdate;

  for (var k in this.urlParts.paramValues) {
    if (this.urlParts.paramValues.hasOwnProperty(k)) {
      this.removeParam(k);
    }
  }

  if (runUpdate) {
    this._handleAutoUpdate();
  }
};


/**
 * Set multiple params using using an object (e.g. {txt: 'hello', txtclr: 'f00'})
 * @memberof imgix
 * @param {object} dict an object of imgix params and their values
 * @param {boolean} doOverride should the value(s) be overridden if they already exist (defaults to true)
 */
imgix.URL.prototype.setParams = function (dict, doOverride) {
  if (imgix.instanceOfImgixURL(dict)) {
    console.warn('setParams warning: dictionary of imgix params expectd. imgix URL instance passed instead');
    return;
  }
  for (var k in dict) {
    if (dict.hasOwnProperty(k)) {
      this.setParam(k, dict[k], doOverride, true);
    }
  }

  this._handleAutoUpdate();
};

// TODO: handle public/private status of this -- won't handle aliases if set...
/**
 * Set a single imgix param value
 * @memberof imgix

 * @param {string} param the imgix param to set (e.g. txtclr)
 * @param {string} value the value to set for the param
 * @param {boolean} doOverride (optional) should the value(s) be overridden if they already exist (defaults to true)
 * @param {boolean} noUpdate (optional) iff using autoUpdateImg should callback be called (defaults to false)
 */
imgix.URL.prototype.setParam = function (param, value, doOverride, noUpdate) {
  param = param.toLowerCase();

  doOverride = !imgix.isDef(doOverride) ? true : doOverride;
  noUpdate = !imgix.isDef(noUpdate) ? false : noUpdate;

  if (param === 'col' || param === 'colorize' || param === 'blend' || param === 'mono' || param === 'monochrome') {
    if (value.slice(0, 3) === 'rgb') {
      value = imgix.rgbToHex(value);
    }
  }

  // TODO: handle aliases -- only need on build?
  if (imgix.getAllParams().indexOf(param) === -1) {
    console.warn('\'' + param + '\' is an invalid imgix param');
    return this;
  }

  if (!doOverride && this.urlParts.paramValues[param]) {
    // we are not overriding because they didn't want to
    return this;
  }

  if (param === 'txtfont' && imgix.isFontAvailable(value)) {
    var tmp = imgix.getFontLookup()[value];
    if (tmp) {
      value = tmp;
    }
  }

  if (imgix.getDefaultParamValue(param) === value || !imgix.isDef(value) || value === null || value.length === 0) {
    this.removeParam(param);
    return this;
  }

  if (this.urlParts.params.indexOf(param) === -1) {
    this.urlParts.params.push(param);
  }

  if (decodeURIComponent(value) === value) {
    value = encodeURIComponent(value);
  }


  this.urlParts.paramValues[param] = String(value);

  if (!noUpdate) {
    this._handleAutoUpdate();
  }

  return this;
};

/**
 * Get the value of an imgix param in the query string
 * @memberof imgix
 * @param {string} param the imgix param that you want the value of (e.g. txtclr)
 * @returns {string} the value of the param in the current url
*/
imgix.URL.prototype.getParam = function (param) {
  if (param === 'mark' || param === 'mask') {
    var result = this.urlParts.paramValues[param];
    // if encoded then decode...
    if (decodeURIComponent(result) !== result) {
      return decodeURIComponent(result);
    }

    return result;
  }
  return this.urlParts.paramValues[param];
};

/**
 * Get an object of all the params and their values on the current image
 * @memberof imgix
 * @returns {object} an object of params and their values (e.g. {txt: 'hello', txtclr: 'f00'})
*/
imgix.URL.prototype.getParams = function () {
  if (this.urlParts.paramValues) {
    return this.urlParts.paramValues;
  }

  return {};
};

/**
 * Get the base url. This is getUrl() without the query string
 * @memberof imgix
 * @returns {string} the base url
*/
imgix.URL.prototype.getBaseUrl = function () {
  var url = this.getUrl();
  if (url.indexOf('?') !== -1) {
    url = this.getUrl().split('?')[0];
  }

  return url !== window.location.href ? url : '';
};

/**
 * Get the query string only. This is getUrl() with ONLY the query string (e.g. ?txt=hello&txtclr=f00)
 * @memberof imgix
 * @returns {string} the query string for the url
*/
imgix.URL.prototype.getQueryString = function () {
  var url = this.getUrl();
  if (url.indexOf('?') !== -1) {
    return this.getUrl().split('?')[1];
  }

  return '';
};

// 'param name': 'pretty name' (for auto-generated get/set-ers)
imgix.URL.theGetSetFuncs = Object.freeze({
  // Adjustment
  bri: 'Brightness',
  con: 'Contrast',
  exp: 'Exposure',
  gam: 'Gamma',
  high: 'Highlight',
  hue: 'Hue',
  invert: 'Invert',
  sat: 'Saturation',
  shad: 'Shadow',
  sharp: 'Sharpness',
  usm: 'UnsharpMask',
  usmrad: 'UnsharpMaskRadius',
  vib: 'Vibrance',

  // Automatic
  auto: 'Auto',

  // Background
  bg: 'Background',

  // Blend
  ba: 'BlendAlign',
  balph: 'BlendAlpha',
  bc: 'BlendCrop',
  bf: 'BlendFit',
  bh: 'BlendHeight',
  blend: 'Blend',
  bm: 'BlendMode',
  bp: 'BlendPadding',
  bs: 'BlendSize',
  bw: 'BlendWidth',

  // Border & padding
  border: 'Border',
  pad: 'Pad',

  // Format
  dl: 'Download',
  fm: 'Format',
  q: 'Quality',

  // Mask
  mask: 'Mask',

  // Noise
  nr: 'NoiseReduction',
  nrs: 'NoiseReductionSharpen',

  // Palette
  palette: 'Palette',
  'class': 'PaletteClass',
  prefix: 'PalettePrefix',
  colors: 'PaletteColorNumber',

  // PDF
  page: 'Page',

  // Pixel Density
  dpr: 'DPR',

  // Rotation
  flip: 'Flip',
  or: 'Orient',
  rot: 'Rotate',

  // Size
  crop: 'Crop',
  fit: 'Fit',
  h: 'Height',
  rect: 'Rectangle',
  w: 'Width',

  // Stylize
  blur: 'Blur',
  htn: 'Halftone',
  mono: 'Monochrome',
  px: 'Pixelate',
  sepia: 'Sepia',

  // Text
  txt: 'Text',
  txtalign: 'TextAlign',
  txtclip: 'TextClip',
  txtclr: 'TextColor',
  txtfit: 'TextFit',
  txtfont: 'TextFont',
  txtline: 'TextLine',
  txtlineclr: 'TextLineColor',
  txtpad: 'TextPad',
  txtsize: 'TextSize',
  txtshad: 'TextShadow',

  // Trim
  trim: 'Trim',
  trimcolor: 'TrimColor',
  trimmd: 'TrimMeanDifference',

  // watermarks
  mark: 'Watermark',
  markalign: 'WatermarkAlign',
  markalpha: 'WatermarkAlpha',
  markfit: 'WatermarkFit',
  markh: 'WatermarkHeight',
  markpad: 'WatermarkPadding',
  markscale: 'WatermarkScale',
  markw: 'WatermarkWidth'
});


/**
  Apply the sepia imgix param to the image url. Same as doing .setParam('sepia', val);
  @param val the value to set for sepia
  @name imgix.URL#setSepia
  @function
*/

// Dynamically create our param getter and setters
for (var param in imgix.URL.theGetSetFuncs) {
  if (imgix.URL.theGetSetFuncs.hasOwnProperty(param)) {
    (function (tmp) {
      imgix.URL.prototype['set' + imgix.URL.theGetSetFuncs[tmp]] = function (v, doOverride) {
        return this.setParam(tmp, v, doOverride);
      };
      imgix.URL.prototype['get' + imgix.URL.theGetSetFuncs[tmp]] = function () {
        return this.getParam(tmp);
      };
    })(param);
  }
}

// STATIC
imgix.parseRjUrl = function (url) {
  var keys = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'],
    parser = document.createElement('a'),
    result = {};

  parser.href = url;

  var pathParts = parser.pathname.split('p:'),
    sig = pathParts[0],
    qs = !pathParts[1] || pathParts[1].indexOf('=') === -1 ? '' : pathParts[1].match(/([^/]+)/)[1],
    path = !pathParts[1] ? '' : pathParts[1].replace(qs, '');

  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = parser[keys[i]];
  }

  result.pathname = path;
  result.search = qs;
  result.sig = sig || '';

  result.paramValues = {};
  result.params = [];
  result.baseUrl = path;

  // hack attack - handle case where admin changed from a RJ url to non-RJ url...
  if (sig.indexOf('.') !== -1) {
    result.baseUrl = url.split('?')[0];
  }

  // parse query string into dictionary
  if (qs && qs.length > 0) {

    var qsParts = qs.split('&');
    for (var y = 0; y < qsParts.length; y++) {
      var tmp = qsParts[y].split('=');
      if (tmp[0] && tmp[0].length) {
        result.paramValues[tmp[0]] = (tmp.length === 2 ? tmp[1] : '');
        result.params.push(tmp[0]);
      }
    }
  }
  return result;
};

imgix.buildRjUrl = function (parsed) {
  var result = parsed.protocol + '//' + parsed.host + parsed.sig;
  if (parsed.params.length > 0) {
    var qs = [];
    for (var i = 0; i < parsed.params.length; i++) {
      if (parsed.paramValues[parsed.params[i]].length > 0) {
        qs.push(parsed.params[i] + '=' + parsed.paramValues[parsed.params[i]]);
      }
    }

    result += 'p:' + qs.join('&');
  } else {
    result += 'p:'; // need this no matter what...
  }

  result += parsed.pathname;

  return result + parsed.hash;
};

imgix.parseUrl = function (url) {
  var
    pkeys = ['protocol', 'hostname', 'port', 'path', '?', '#', 'hostname'],
    keys = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'],
    result = {};

  // create clean object to return
  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = imgix.helpers.urlParser(pkeys[i], url);
  }

  var qs = result.search;

  result.paramValues = {};
  result.params = [];
  result.baseUrl = url.split('?')[0];

  // parse query string into dictionary
  if (qs && qs.length > 0) {
    if (qs[0] === '?') {
      qs = qs.substr(1, qs.length);
    }

    var parts = qs.split('&');
    for (var y = 0; y < parts.length; y++) {
      var tmp = parts[y].split('=');
      if (tmp[0] && tmp[0].length && tmp[0] !== 's') {
        result.paramValues[tmp[0]] = (tmp.length === 2 ? tmp[1] : '');
        if (result.params.indexOf(tmp[0]) === -1) {
          result.params.push(tmp[0]);
        }
      }
    }
  }

  return result;
};

imgix.buildUrl = function (parsed) {
  var result = parsed.protocol + '://' + parsed.host + parsed.pathname;
  if (parsed.params.length > 0) {


    parsed.params = parsed.params.map(function (e) {
      return e.toLowerCase();
    });

    // unique only
    parsed.params = parsed.params.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

    // sort
    parsed.params = parsed.params.sort(function (a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });

    var qs = [];
    for (var i = 0; i < parsed.params.length; i++) {
      if (parsed.paramValues[parsed.params[i]].length > 0) {
        qs.push(parsed.params[i] + '=' + parsed.paramValues[parsed.params[i]]);
      }
    }

    if (result.indexOf('?') !== -1) {
      result = result.split('?')[0];
    }

    result += '?' + qs.join('&');
  }

  return result;
};

imgix.signRjUrl = function (newUrl, token) {
  var p = imgix.parseUrl(newUrl), // normal url parse
    m = p.pathname.match(/([\w\-_*]+)/g),
    sig = m[0],
    sig_location = newUrl.indexOf(sig) + sig.length + 1,
    rest = newUrl.substr(sig_location),
    find_path = rest.match(/([^\/]+)(.+)/g),
    path = find_path[1],
    args = '/' + rest.replace(path, ''),
    concat = token + args,
    new_sig = imgix.safe_btoa_encode(imgix.md5(concat)).substr(0, 8),
    new_url = newUrl.replace(sig, new_sig);
  return new_url;
};

imgix.signUrl = function (newUrl, token) {
  if (token) {
    var parts = imgix.parseUrl(newUrl),
      toSign = token + parts.pathname + '?' + parts.search,
      sig = imgix.md5(token + parts.pathname + '?' + parts.search);

    if (newUrl.indexOf('?') === -1) {
      sig = imgix.md5(token + parts.pathname);
      newUrl = newUrl + '?s=' + sig;
    } else {
      newUrl = newUrl + '&s=' + sig;
    }
  }

  return newUrl;
};

imgix.versionifyUrl = function (url) {
  var parsed = imgix.parseUrl(url),
      versionParam = 'ixjsv';

  parsed.params.push(versionParam);
  parsed.paramValues[versionParam] = imgix.version;

  return imgix.buildUrl(parsed);
};

imgix.isDef = function (obj) {
  return (typeof obj !== 'undefined');
};

imgix.safe_btoa_encode = function (str) {
  return window.btoa(str).replace(/\+/g, '-').replace(/\//g, '_');
};

imgix.safe_btoa_decode = function (str) {
  return window.atob(str.replace(/\-+/g, '+').replace(/_+/g, '\/')); // http://
};


// #############################################################
//
// START FLUID

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
  token: null,
  ignoreDPR: false,
  pixelStep: 10,
  debounce: 200,
  lazyLoad: false,
  lazyLoadColor: null,
  lazyLoadOffsetVertical: 20,
  lazyLoadOffsetHorizontal: 20,
  maxHeight: 5000,
  maxWidth: 5000,
  onLoad: null
};

function getFluidDefaults() {
  return fluidDefaults;
}

imgix.elementInView = function (element, view) {
  if (element === null) {
    return false;
  }
  var box = element.getBoundingClientRect();
  return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
};

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

  this.reload = imgix.helpers.debouncer(this.reloader, this.options.debounce);
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

  if (this.options.lazyLoad) {
    var view = {
      l: 0 - this.lazyLoadOffsets.l,
      t: 0 - this.lazyLoadOffsets.t,
      b: (window.innerHeight || document.documentElement.clientHeight) + this.lazyLoadOffsets.b,
      r: (window.innerWidth || document.documentElement.clientWidth) + this.lazyLoadOffsets.r
    };

    if (!imgix.elementInView(elem, view)) {
      if (!elem.fluidLazyColored && this.options.lazyLoadColor) {
        elem.fluidLazyColored = 1;
        var self = this,
          llcType = typeof this.options.lazyLoadColor,
          i = new imgix.URL(imgix.helpers.getImgSrc(elem));

        i.getColors(16, function (colors) {
          if (!colors) {
            console.warn('No colors found for', i.getURL(), 'for element', elem);
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

  var details = this.getImgDetails(elem, pinchScale || 1),
    newUrl = details.url,
    currentElemWidth = details.width,
    currentElemHeight = details.height;

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

  var dpr = imgix.helpers.getDPR(elem),
    pixelStep = this.options.pixelStep,
    elemSize = imgix.helpers.calculateElementSize(imgix.isImageElement(elem) ? elem.parentNode : elem),
    elemWidth = imgix.helpers.pixelRound(elemSize.width * zoomMultiplier, pixelStep),
    elemHeight = imgix.helpers.pixelRound(elemSize.height * zoomMultiplier, pixelStep),
    i = new imgix.URL(imgix.helpers.getImgSrc(elem));

  if (this.options.token !== null) {
    i.setToken(this.options.token);
  }

  i.setHeight('');
  i.setWidth('');

  elemWidth = Math.min(elemWidth, this.options.maxWidth);
  elemHeight = Math.min(elemHeight, this.options.maxHeight);

  if (dpr !== 1 && !this.options.ignoreDPR) {
    i.setDPR(dpr);
  }

  if (this.options.highDPRAutoScaleQuality && dpr > 1) {
    i.setQuality(Math.min(Math.max(parseInt((100 / dpr), 10), 30), 75));
  }

  if (this.options.fitImgTagToContainerHeight && this.options.fitImgTagToContainerWidth) {
    i.setFit('crop');
  }

  if (i.getFit() === 'crop') {
    if (elemHeight > 0 && (!imgix.isImageElement(elem) || (imgix.isImageElement(elem) && this.options.fitImgTagToContainerHeight))) {
      i.setHeight(elemHeight);
    }

    if (elemWidth > 0 && (!imgix.isImageElement(elem) || (imgix.isImageElement(elem) && this.options.fitImgTagToContainerWidth))) {
      i.setWidth(elemWidth);
    }
  } else {
    if (elemHeight <= elemWidth) {
      i.setWidth(elemWidth);
    } else {
      i.setHeight(elemHeight);
    }
  }

  if (!imgix.isImageElement(elem) && this.options.autoInsertCSSBestPractices && elem.style) {
    elem.style.backgroundRepeat = 'no-repeat';
    elem.style.backgroundSize = 'cover';
    elem.style.backgroundPosition = '50% 50%';
  }

  var overrides = {};
  if (this.options.onChangeParamOverride !== null && typeof this.options.onChangeParamOverride === 'function') {
    overrides = this.options.onChangeParamOverride(elemWidth, elemHeight, i.getParams(), elem);
  }

  for (var k in overrides) {
    if (overrides.hasOwnProperty(k)) {
      i.setParam(k, overrides[k]);
    }
  }

  return {
    url: i.getURL(),
    width: elemWidth,
    height: elemHeight
  };
};

imgix.FluidSet.prototype.toString = function () {
  return '[object FluidSet]';
};

imgix.FluidSet.prototype.reloader = function () {
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


imgix.FluidSet.prototype.resizeListener = function () {
  if (this.windowLastWidth !== imgix.helpers.getWindowWidth() || this.windowLastHeight !== imgix.helpers.getWindowHeight()) {
    this.reload();
  }
};

var scrollInstances = {},
  resizeInstances = {};

imgix.FluidSet.prototype.attachScrollListener = function () {
  scrollInstances[this.namespace] = function () {
    this.reload();
  }.bind(this);

  if (document.addEventListener) {
    window.addEventListener('scroll', scrollInstances[this.namespace], false);
  } else {
    window.attachEvent('onscroll', scrollInstances[this.namespace]);
  }

  this.windowScrollEventBound = true;
};

imgix.FluidSet.prototype.attachWindowResizer = function () {
  resizeInstances[this.namespace] = function () {
    this.resizeListener();
  }.bind(this);

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

`token` __string__ the secure URL token to use to sign an image. when this is set URLs are automatically signed using this token<br>

`ignoreDPR` __boolean__ when true the `dpr` param is not set on the image.<br>

`debounce` __number__ postpones resize/lazy load execution until after this many milliseconds have elapsed since the last time it was invoked.<br>

`lazyLoad` __boolean__ when true the image is not actually loaded until it is viewable (or within the offset)<br>

`lazyLoadOffsetVertical` __number__ when `lazyLoad` is true this allows you to set how far above and below the viewport (in pixels) you want before imgix.js starts to load the images.<br>

`lazyLoadOffsetHorizontal` __number__ when `lazyLoad` is true this allows you to set how far to the left and right of the viewport (in pixels) you want before imgix.js starts to load the images.<br>

`lazyLoadColor` __boolean__ or __number__ or __function__ When defined the image container's background is set to a color in the image. When value is `true` use first color in the color array, when value is a `number` use that index from the color array, when value is a `function` it uses whatever color is returned by the function (`HTMLElement' el, `Array` colors)

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
    token: null,
    debounce: 200,
    ignoreDPR: false,
    lazyLoad: false,
    lazyLoadOffsetVertical: 20,
    lazyLoadOffsetHorizontal: 20,
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
        console.warn('\'' + passedKeys[i] + '\' is not a valid imgix.fluid config option. See https://github.com/imgix/imgix.js/blob/master/docs/api.md#imgix.fluid for a list of valid options.');
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


// END FLUID
// #############################################################


if (typeof window !== 'undefined') {
  /**
   * Cross-browser DOM ready helper
   * Dustin Diaz <dustindiaz.com> (MIT License)
   * https://github.com/ded/domready/tree/v0.3.0
   */

  /**
   * Runs a function when the DOM is ready (similar to jQuery.ready)
   * @memberof imgix
   * @static
   * @param {function} ready the function to run when the DOM is ready.
   */
  imgix.onready = (function (ready) {
      var fns = [],
          fn,
          f = false,
          doc = document,
          testEl = doc.documentElement,
          hack = testEl.doScroll,
          domContentLoaded = 'DOMContentLoaded',
          addEventListener = 'addEventListener',
          onreadystatechange = 'onreadystatechange',
          readyState = 'readyState',
          loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/,
          loaded = loadedRgx.test(doc[readyState]);

      function flush(f) {
        loaded = 1;
        while (f = fns.shift()) {
          f();
        }
      }

      if (doc[addEventListener]) {
        doc[addEventListener](domContentLoaded, fn = function () {
          doc.removeEventListener(domContentLoaded, fn, f);
          flush();
        }, f);
      }

      if (hack) {
        doc.attachEvent(onreadystatechange, fn = function () {
          if (/^c/.test(doc[readyState])) {
            doc.detachEvent(onreadystatechange, fn);
            flush();
          }
        });
      }

      ready = hack;

      if (!!ready) {
        return function (fn) {
          if (self !== top) {
            if (loaded) {
              fn();
            } else {
              fns.push(fn);
            }
          } else {
            (function () {
              try {
                testEl.doScroll('left');
              } catch (e) {
                return setTimeout(function () {
                  ready(fn);
                }, 50);
              }
              fn();
            })();
          }
        };
      } else {
        return function (fn) {
          if (loaded) {
            fn();
          } else {
            fns.push(fn);
          }
        };
      }
    })();
}
// MD5 stuff...

/*
 * JavaScript MD5 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define */
(function (ctx) {
  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }
  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var i, olda, oldb, oldc, oldd,
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = md5_ff(a, b, c, d, x[i], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = md5_ii(a, b, c, d, x[i], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return [a, b, c, d];
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr(input) {
    var i,
      output = '';
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    }
    return output;
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl(input) {
    var i,
      output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    }
    return output;
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstr_hmac_md5(key, data) {
    var i,
      bkey = rstr2binl(key),
      ipad = [],
      opad = [],
      hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex(input) {
    var hex_tab = '0123456789abcdef',
      output = '',
      x,
      i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F) +
        hex_tab.charAt(x & 0x0F);
    }
    return output;
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstr_utf8(input) {
    return unescape(encodeURIComponent(input));
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function raw_md5(s) {
    return rstr_md5(str2rstr_utf8(s));
  }
  function hex_md5(s) {
    return rstr2hex(raw_md5(s));
  }
  function raw_hmac_md5(k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
  }
  function hex_hmac_md5(k, d) {
    return rstr2hex(raw_hmac_md5(k, d));
  }

  function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return hex_md5(string);
      }
      return raw_md5(string);
    }
    if (!raw) {
      return hex_hmac_md5(key, string);
    }
    return raw_hmac_md5(key, string);
  }

  ctx.md5 = md5;
}(imgix));


// DOCS BELOW ARE AUTO GENERATED. DO NOT EDIT BY HAND


