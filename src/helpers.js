'use strict';

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

  throttler: function (func, wait) {
    var timeoutRef;
    return function () {
      var self = this,
        args = arguments,
        later;

      if (!timeoutRef) {
        later = function () {
          timeoutRef = null;
          func.apply(self, args);
        };

        timeoutRef = window.setTimeout(later, wait);
      }
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

  isNumber: function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  getWindowDPR: function () {
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
  },

  warn: function(message) {
    if (window.console) {
      window.console.warn(message);
    }
  }
};
