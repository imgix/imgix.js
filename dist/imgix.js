/*! http://www.imgix.com imgix.js - v1.1.2 - 2015-06-11 
 _                    _             _
(_)                  (_)           (_)
 _  _ __ ___    __ _  _ __  __      _  ___
| || '_ ` _ \  / _` || |\ \/ /     | |/ __|
| || | | | | || (_| || | >  <  _   | |\__ \
|_||_| |_| |_| \__, ||_|/_/\_\(_)  | ||___/
                __/ |             _/ |
               |___/             |__/

*/

(function() {

// THIS FILE WAS GENERATED. DO NOT EDIT DIRECTLY. They will be overwritten
// Edit files in /src and then run: grunt build
// Please use the minified version of this file in production.


	// Define and run polyfills first. Don't want/need these? grunt build --no-polyfills
	function initPolyfills() {

		// Object.freeze polyfill (pure pass through)
		if (!Object.freeze) {
			Object.freeze = function freeze(object) {
				return object;
			};
		}

		// Console-polyfill. MIT license.
		// https://github.com/paulmillr/console-polyfill
		// Make it safe to do console.log() always.
		(function(con) {
			var prop, method;
			var empty = {};
			var dummy = function() {};
			var properties = 'memory'.split(',');
			var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
			'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
			'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
			while (prop = properties.pop()) {
				con[prop] = con[prop] || empty;
			}
			while (method = methods.pop()) {
				con[method] = con[method] || dummy;
			}
		})(window.console || {}); // Using `this` for web workers.

		// mozilla's Function.bind polyfill
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
		if (!Function.prototype.bind) {
			Function.prototype.bind = function (oThis) {
				if (typeof this !== "function") {
					// closest thing possible to the ECMAScript 5
					// internal IsCallable function
					throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
				}

				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function () {},
					fBound = function () {
						return fToBind.apply(this instanceof fNOP && oThis
							? this
							: oThis,
							aArgs.concat(Array.prototype.slice.call(arguments)));
					};

				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();

				return fBound;
			};
		}

		// filter polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		if (!Array.prototype.filter) {
			Array.prototype.filter = function(fun/*, thisArg*/) {
				if (this === void 0 || this === null) {
					throw new TypeError();
				}

				var t = Object(this);
				var len = t.length >>> 0;
				if (typeof fun !== 'function') {
					throw new TypeError();
				}

				var res = [];
				var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
				for (var i = 0; i < len; i++) {
					if (i in t) {
						var val = t[i];
						if (fun.call(thisArg, val, i, t)) {
							res.push(val);
						}
					}
				}

				return res;
			};
		}

		// map polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
		if (!Array.prototype.map) {
			Array.prototype.map = function(callback, thisArg) {

				var T, A, k;

				if (this == null) {
					throw new TypeError(" this is null or not defined");
				}

				var O = Object(this);

				var len = O.length >>> 0;

				if (typeof callback !== "function") {
					throw new TypeError(callback + " is not a function");
				}

				if (arguments.length > 1) {
					T = thisArg;
				}

				A = new Array(len);
				k = 0;
				while (k < len) {
					var kValue, mappedValue;
					if (k in O) {
						kValue = O[k];
						mappedValue = callback.call(T, kValue, k, O);
						A[k] = mappedValue;
					}
					k++;
				}

				return A;
			};
		}

		// Polyfill or document.querySelectorAll + document.querySelector
		// should only matter for the poor souls on IE <= 8
		// https://gist.github.com/chrisjlee/8960575
		if (!document.querySelectorAll) {
			document.querySelectorAll = function (selectors) {
				var style = document.createElement('style'), elements = [], element;
				document.documentElement.firstChild.appendChild(style);
				document._qsa = [];

				style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
				window.scrollBy(0, 0);
				style.parentNode.removeChild(style);

				while (document._qsa.length) {
					element = document._qsa.shift();
					element.style.removeAttribute('x-qsa');
					elements.push(element);
				}
				document._qsa = null;
				return elements;
			};
		}

		if (!document.querySelector) {
			document.querySelector = function (selectors) {
				var elements = document.querySelectorAll(selectors);
				return (elements.length) ? elements[0] : null;
			};
		}

		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (needle) {
				for (var i = 0; i < this.length; i++) {
					if (this[i] === needle) {
						return i;
					}
				}
				return -1;
			};
		}

		if (!Array.isArray) {
			Array.isArray = function(arg) {
				return Object.prototype.toString.call(arg) === '[object Array]';
			};
		}

		if (!Object.keys) {
			Object.keys = (function() {

				var hasOwnProperty = Object.prototype.hasOwnProperty,
					hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
					dontEnums = [
						'toString',
						'toLocaleString',
						'valueOf',
						'hasOwnProperty',
						'isPrototypeOf',
						'propertyIsEnumerable',
						'constructor'
					],
					dontEnumsLength = dontEnums.length;

				return function(obj) {
					if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
					throw new TypeError('Object.keys called on non-object');
					}

					var result = [], prop, i;

					for (prop in obj) {
						if (hasOwnProperty.call(obj, prop)) {
							result.push(prop);
						}
					}

					if (hasDontEnumBug) {
						for (i = 0; i < dontEnumsLength; i++) {
							if (hasOwnProperty.call(obj, dontEnums[i])) {
								result.push(dontEnums[i]);
							}
						}
					}
					return result;
				};
			}());
		}

		// polyfill for getComputedStyle (main for ie8)
		!('getComputedStyle' in window) && (window.getComputedStyle = (function () {
			function getPixelSize(element, style, property, fontSize) {
				var
				sizeWithSuffix = style[property],
				size = parseFloat(sizeWithSuffix),
				suffix = sizeWithSuffix.split(/\d/)[0],
				rootSize;

				fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
				rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

				return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
			}

			function setShortStyleProperty(style, property) {
				var
				borderSuffix = property == 'border' ? 'Width' : '',
				t = property + 'Top' + borderSuffix,
				r = property + 'Right' + borderSuffix,
				b = property + 'Bottom' + borderSuffix,
				l = property + 'Left' + borderSuffix;

				style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
				: style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
				: style[l] == style[r] ? [style[t], style[r], style[b]]
				: [style[t], style[r], style[b], style[l]]).join(' ');
			}

			function CSSStyleDeclaration(element) {
				var
				currentStyle = element.currentStyle,
				style = this,
				fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

				for (property in currentStyle) {
					if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
						style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
					} else if (property === 'styleFloat') {
						style['float'] = currentStyle[property];
					} else {
						style[property] = currentStyle[property];
					}
				}

				setShortStyleProperty(style, 'margin');
				setShortStyleProperty(style, 'padding');
				setShortStyleProperty(style, 'border');

				style.fontSize = fontSize + 'px';

				return style;
			}

			CSSStyleDeclaration.prototype = {
				constructor: CSSStyleDeclaration,
				getPropertyPriority: function () {},
				getPropertyValue: function ( prop ) {
					return this[prop] || '';
				},
				item: function () {},
				removeProperty: function () {},
				setProperty: function () {},
				getPropertyCSSValue: function () {}
			};

			function getComputedStyle(element) {
				return new CSSStyleDeclaration(element);
			}

			return getComputedStyle;
		})(window));

		// PROMISE

		(function() {
			var root;

			if (typeof window === 'object' && window) {
				root = window;
			} else {
				root = global;
			}

			if (typeof module !== 'undefined' && module.exports) {
				module.exports = root.Promise ? root.Promise : Promise;
			} else if (!root.Promise) {
				root.Promise = Promise;
			}

			// Use polyfill for setImmediate for performance gains
			var asap = root.setImmediate || function(fn) { setTimeout(fn, 1); };

			// Polyfill for Function.prototype.bind
			function bind(fn, thisArg) {
				return function() {
					fn.apply(thisArg, arguments);
				}
			}

			var isArray = Array.isArray || function(value) { return Object.prototype.toString.call(value) === "[object Array]" };

			function Promise(fn) {
				if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
				if (typeof fn !== 'function') throw new TypeError('not a function');
				this._state = null;
				this._value = null;
				this._deferreds = []

				doResolve(fn, bind(resolve, this), bind(reject, this))
			}

			function handle(deferred) {
				var me = this;
				if (this._state === null) {
					this._deferreds.push(deferred);
					return
				}
				asap(function() {
					var cb = me._state ? deferred.onFulfilled : deferred.onRejected
					if (cb === null) {
						(me._state ? deferred.resolve : deferred.reject)(me._value);
						return;
					}
					var ret;
					try {
						ret = cb(me._value);
					}
					catch (e) {
						deferred.reject(e);
						return;
					}
					deferred.resolve(ret);
				})
			}

			function resolve(newValue) {
				try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
					if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
					if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
						var then = newValue.then;
						if (typeof then === 'function') {
							doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
							return;
						}
					}
					this._state = true;
					this._value = newValue;
					finale.call(this);
				} catch (e) { reject.call(this, e); }
			}

			function reject(newValue) {
				this._state = false;
				this._value = newValue;
				finale.call(this);
			}

			function finale() {
				for (var i = 0, len = this._deferreds.length; i < len; i++) {
					handle.call(this, this._deferreds[i]);
				}
				this._deferreds = null;
			}

			function Handler(onFulfilled, onRejected, resolve, reject){
				this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
				this.onRejected = typeof onRejected === 'function' ? onRejected : null;
				this.resolve = resolve;
				this.reject = reject;
			}

			/**
			 * Take a potentially misbehaving resolver function and make sure
			 * onFulfilled and onRejected are only called once.
			 *
			 * Makes no guarantees about asynchrony.
			 */
			function doResolve(fn, onFulfilled, onRejected) {
				var done = false;
				try {
					fn(function (value) {
						if (done) return;
						done = true;
						onFulfilled(value);
					}, function (reason) {
						if (done) return;
						done = true;
						onRejected(reason);
					})
				} catch (ex) {
					if (done) return;
					done = true;
					onRejected(ex);
				}
			}

			Promise.prototype['catch'] = function (onRejected) {
				return this.then(null, onRejected);
			};

			Promise.prototype.then = function(onFulfilled, onRejected) {
				var me = this;
				return new Promise(function(resolve, reject) {
					handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
				})
			};

			Promise.all = function () {
				var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

				return new Promise(function (resolve, reject) {
					if (args.length === 0) return resolve([]);
					var remaining = args.length;
					function res(i, val) {
						try {
							if (val && (typeof val === 'object' || typeof val === 'function')) {
								var then = val.then;
								if (typeof then === 'function') {
									then.call(val, function (val) { res(i, val) }, reject);
									return;
								}
							}
							args[i] = val;
							if (--remaining === 0) {
								resolve(args);
							}
						} catch (ex) {
							reject(ex);
						}
					}
					for (var i = 0; i < args.length; i++) {
						res(i, args[i]);
					}
				});
			};

			Promise.resolve = function (value) {
				if (value && typeof value === 'object' && value.constructor === Promise) {
					return value;
				}

				return new Promise(function (resolve) {
					resolve(value);
				});
			};

			Promise.reject = function (value) {
				return new Promise(function (resolve, reject) {
					reject(value);
				});
			};

			Promise.race = function (values) {
				return new Promise(function (resolve, reject) {
					for(var i = 0, len = values.length; i < len; i++) {
						values[i].then(resolve, reject);
					}
				});
			};
		})();
	}

	if (typeof window !== 'undefined') {
		initPolyfills();
	}

'use strict';

// Establish the root object, `window` in the browser, or `exports` on the server.
var root = this;

/**
 * `imgix` is the root namespace for all imgix client code.
 * @namespace imgix
 */
var imgix = {
  version: '1.1.2'
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
  img.onload = function () {
    imgix.setElementImage(el, imgUrl);
    if (typeof callback === 'function') {
      callback(el, imgUrl);
    }
  };
  img.src = imgUrl;
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
  var suffix;

  if (xpath){
    suffix = imgix.hashCode(xpath);
  } else {
    suffix = (new Date()).getTime().toString(36);
  }

  return 'imgix-el-' + suffix;
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
  return 'tmp_' + imgix.hashCode(url);
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
 */
imgix.URL = function (url, imgParams) {

  this._autoUpdateSel = null;
  this._autoUpdateCallback = null;

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
  this.urlParts = imgix.parseUrl(url);
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
  var url = imgix.buildUrl(this.urlParts);

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

// Adapted from http://stackoverflow.com/a/22429679
imgix.hashCode = function (str) {
    /*jshint bitwise:false */
    var i, l, hval = 0x811c9dc5;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
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
  scrollInstances[this.namespace] = imgix.helpers.throttler(function () {
    this.reload();
  }.bind(this), this.options.throttle);

  if (document.addEventListener) {
    window.addEventListener('scroll', scrollInstances[this.namespace], false);
  } else {
    window.attachEvent('onscroll', scrollInstances[this.namespace]);
  }

  this.windowScrollEventBound = true;
};

imgix.FluidSet.prototype.attachWindowResizer = function () {
  resizeInstances[this.namespace] = imgix.helpers.debouncer(function () {
    if (this.windowLastWidth !== imgix.helpers.getWindowWidth() || this.windowLastHeight !== imgix.helpers.getWindowHeight()) {
      this.reload();
    }
  }.bind(this), this.options.debounce);

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
  imgix.onready = (function () {
      var ready,
          listener,
          callbacks = [],
          ieHack = document.documentElement.doScroll,
          loadedRgx = ieHack ? /^loaded|^c/ : /^loaded|c/,
          loaded = loadedRgx.test(document.readyState);

      function flush() {
        var callback;

        loaded = true;
        while (callback = callbacks.shift()) {
          callback();
        }
      }

      if (document.addEventListener) {
        listener = function () {
          document.removeEventListener('DOMContentLoaded', listener, false);
          flush();
        }

        document.addEventListener('DOMContentLoaded', listener, false);
      } else if (document.attachEvent) {
        listener = function () {
          if (/^c/.test(document.readyState)) {
            document.detachEvent('onreadystatechange', listener);
            flush();
          }
        }

        document.attachEvent('onreadystatechange', listener);
      }

      if (!!ieHack) {
        ready = function (callback) {
          if (window.self != window.top) {
            // We're in an iframe here
            if (loaded) {
              callback();
            } else {
              callbacks.push(callback);
            }
          } else {
            // In a top-level window
            (function () {
              try {
                document.documentElement.doScroll('left');
              } catch (e) {
                return setTimeout(function () {
                  ready(callback);
                }, 50);
              }
              callback();
            })();
          }
        };

      } else {
        ready = function (callback) {
          if (loaded) {
            callback();
          } else {
            callbacks.push(callback);
          }
        };
      }

      return ready;
    })();
}

// DOCS BELOW ARE AUTO GENERATED. DO NOT EDIT BY HAND




/**
	Apply the "bri" imgix param to the image url. Same as doing .setParam('bri', val)
	@param val the value to set for bri
	@name imgix.URL#setBrightness
	@function
*/

/**
	Apply the "con" imgix param to the image url. Same as doing .setParam('con', val)
	@param val the value to set for con
	@name imgix.URL#setContrast
	@function
*/

/**
	Apply the "exp" imgix param to the image url. Same as doing .setParam('exp', val)
	@param val the value to set for exp
	@name imgix.URL#setExposure
	@function
*/

/**
	Apply the "gam" imgix param to the image url. Same as doing .setParam('gam', val)
	@param val the value to set for gam
	@name imgix.URL#setGamma
	@function
*/

/**
	Apply the "high" imgix param to the image url. Same as doing .setParam('high', val)
	@param val the value to set for high
	@name imgix.URL#setHighlight
	@function
*/

/**
	Apply the "hue" imgix param to the image url. Same as doing .setParam('hue', val)
	@param val the value to set for hue
	@name imgix.URL#setHue
	@function
*/

/**
	Apply the "invert" imgix param to the image url. Same as doing .setParam('invert', val)
	@param val the value to set for invert
	@name imgix.URL#setInvert
	@function
*/

/**
	Apply the "sat" imgix param to the image url. Same as doing .setParam('sat', val)
	@param val the value to set for sat
	@name imgix.URL#setSaturation
	@function
*/

/**
	Apply the "shad" imgix param to the image url. Same as doing .setParam('shad', val)
	@param val the value to set for shad
	@name imgix.URL#setShadow
	@function
*/

/**
	Apply the "sharp" imgix param to the image url. Same as doing .setParam('sharp', val)
	@param val the value to set for sharp
	@name imgix.URL#setSharpness
	@function
*/

/**
	Apply the "usm" imgix param to the image url. Same as doing .setParam('usm', val)
	@param val the value to set for usm
	@name imgix.URL#setUnsharpMask
	@function
*/

/**
	Apply the "usmrad" imgix param to the image url. Same as doing .setParam('usmrad', val)
	@param val the value to set for usmrad
	@name imgix.URL#setUnsharpMaskRadius
	@function
*/

/**
	Apply the "vib" imgix param to the image url. Same as doing .setParam('vib', val)
	@param val the value to set for vib
	@name imgix.URL#setVibrance
	@function
*/

/**
	Apply the "auto" imgix param to the image url. Same as doing .setParam('auto', val)
	@param val the value to set for auto
	@name imgix.URL#setAuto
	@function
*/

/**
	Apply the "bg" imgix param to the image url. Same as doing .setParam('bg', val)
	@param val the value to set for bg
	@name imgix.URL#setBackground
	@function
*/

/**
	Apply the "ba" imgix param to the image url. Same as doing .setParam('ba', val)
	@param val the value to set for ba
	@name imgix.URL#setBlendAlign
	@function
*/

/**
	Apply the "balph" imgix param to the image url. Same as doing .setParam('balph', val)
	@param val the value to set for balph
	@name imgix.URL#setBlendAlpha
	@function
*/

/**
	Apply the "bc" imgix param to the image url. Same as doing .setParam('bc', val)
	@param val the value to set for bc
	@name imgix.URL#setBlendCrop
	@function
*/

/**
	Apply the "bf" imgix param to the image url. Same as doing .setParam('bf', val)
	@param val the value to set for bf
	@name imgix.URL#setBlendFit
	@function
*/

/**
	Apply the "bh" imgix param to the image url. Same as doing .setParam('bh', val)
	@param val the value to set for bh
	@name imgix.URL#setBlendHeight
	@function
*/

/**
	Apply the "blend" imgix param to the image url. Same as doing .setParam('blend', val)
	@param val the value to set for blend
	@name imgix.URL#setBlend
	@function
*/

/**
	Apply the "bm" imgix param to the image url. Same as doing .setParam('bm', val)
	@param val the value to set for bm
	@name imgix.URL#setBlendMode
	@function
*/

/**
	Apply the "bp" imgix param to the image url. Same as doing .setParam('bp', val)
	@param val the value to set for bp
	@name imgix.URL#setBlendPadding
	@function
*/

/**
	Apply the "bs" imgix param to the image url. Same as doing .setParam('bs', val)
	@param val the value to set for bs
	@name imgix.URL#setBlendSize
	@function
*/

/**
	Apply the "bw" imgix param to the image url. Same as doing .setParam('bw', val)
	@param val the value to set for bw
	@name imgix.URL#setBlendWidth
	@function
*/

/**
	Apply the "border" imgix param to the image url. Same as doing .setParam('border', val)
	@param val the value to set for border
	@name imgix.URL#setBorder
	@function
*/

/**
	Apply the "pad" imgix param to the image url. Same as doing .setParam('pad', val)
	@param val the value to set for pad
	@name imgix.URL#setPad
	@function
*/

/**
	Apply the "dl" imgix param to the image url. Same as doing .setParam('dl', val)
	@param val the value to set for dl
	@name imgix.URL#setDownload
	@function
*/

/**
	Apply the "fm" imgix param to the image url. Same as doing .setParam('fm', val)
	@param val the value to set for fm
	@name imgix.URL#setFormat
	@function
*/

/**
	Apply the "q" imgix param to the image url. Same as doing .setParam('q', val)
	@param val the value to set for q
	@name imgix.URL#setQuality
	@function
*/

/**
	Apply the "mask" imgix param to the image url. Same as doing .setParam('mask', val)
	@param val the value to set for mask
	@name imgix.URL#setMask
	@function
*/

/**
	Apply the "nr" imgix param to the image url. Same as doing .setParam('nr', val)
	@param val the value to set for nr
	@name imgix.URL#setNoiseReduction
	@function
*/

/**
	Apply the "nrs" imgix param to the image url. Same as doing .setParam('nrs', val)
	@param val the value to set for nrs
	@name imgix.URL#setNoiseReductionSharpen
	@function
*/

/**
	Apply the "palette" imgix param to the image url. Same as doing .setParam('palette', val)
	@param val the value to set for palette
	@name imgix.URL#setPalette
	@function
*/

/**
	Apply the "class" imgix param to the image url. Same as doing .setParam('class', val)
	@param val the value to set for class
	@name imgix.URL#setPaletteClass
	@function
*/

/**
	Apply the "prefix" imgix param to the image url. Same as doing .setParam('prefix', val)
	@param val the value to set for prefix
	@name imgix.URL#setPalettePrefix
	@function
*/

/**
	Apply the "colors" imgix param to the image url. Same as doing .setParam('colors', val)
	@param val the value to set for colors
	@name imgix.URL#setPaletteColorNumber
	@function
*/

/**
	Apply the "page" imgix param to the image url. Same as doing .setParam('page', val)
	@param val the value to set for page
	@name imgix.URL#setPage
	@function
*/

/**
	Apply the "dpr" imgix param to the image url. Same as doing .setParam('dpr', val)
	@param val the value to set for dpr
	@name imgix.URL#setDPR
	@function
*/

/**
	Apply the "flip" imgix param to the image url. Same as doing .setParam('flip', val)
	@param val the value to set for flip
	@name imgix.URL#setFlip
	@function
*/

/**
	Apply the "or" imgix param to the image url. Same as doing .setParam('or', val)
	@param val the value to set for or
	@name imgix.URL#setOrient
	@function
*/

/**
	Apply the "rot" imgix param to the image url. Same as doing .setParam('rot', val)
	@param val the value to set for rot
	@name imgix.URL#setRotate
	@function
*/

/**
	Apply the "crop" imgix param to the image url. Same as doing .setParam('crop', val)
	@param val the value to set for crop
	@name imgix.URL#setCrop
	@function
*/

/**
	Apply the "fit" imgix param to the image url. Same as doing .setParam('fit', val)
	@param val the value to set for fit
	@name imgix.URL#setFit
	@function
*/

/**
	Apply the "h" imgix param to the image url. Same as doing .setParam('h', val)
	@param val the value to set for h
	@name imgix.URL#setHeight
	@function
*/

/**
	Apply the "rect" imgix param to the image url. Same as doing .setParam('rect', val)
	@param val the value to set for rect
	@name imgix.URL#setRectangle
	@function
*/

/**
	Apply the "w" imgix param to the image url. Same as doing .setParam('w', val)
	@param val the value to set for w
	@name imgix.URL#setWidth
	@function
*/

/**
	Apply the "blur" imgix param to the image url. Same as doing .setParam('blur', val)
	@param val the value to set for blur
	@name imgix.URL#setBlur
	@function
*/

/**
	Apply the "htn" imgix param to the image url. Same as doing .setParam('htn', val)
	@param val the value to set for htn
	@name imgix.URL#setHalftone
	@function
*/

/**
	Apply the "mono" imgix param to the image url. Same as doing .setParam('mono', val)
	@param val the value to set for mono
	@name imgix.URL#setMonochrome
	@function
*/

/**
	Apply the "px" imgix param to the image url. Same as doing .setParam('px', val)
	@param val the value to set for px
	@name imgix.URL#setPixelate
	@function
*/

/**
	Apply the "sepia" imgix param to the image url. Same as doing .setParam('sepia', val)
	@param val the value to set for sepia
	@name imgix.URL#setSepia
	@function
*/

/**
	Apply the "txt" imgix param to the image url. Same as doing .setParam('txt', val)
	@param val the value to set for txt
	@name imgix.URL#setText
	@function
*/

/**
	Apply the "txtalign" imgix param to the image url. Same as doing .setParam('txtalign', val)
	@param val the value to set for txtalign
	@name imgix.URL#setTextAlign
	@function
*/

/**
	Apply the "txtclip" imgix param to the image url. Same as doing .setParam('txtclip', val)
	@param val the value to set for txtclip
	@name imgix.URL#setTextClip
	@function
*/

/**
	Apply the "txtclr" imgix param to the image url. Same as doing .setParam('txtclr', val)
	@param val the value to set for txtclr
	@name imgix.URL#setTextColor
	@function
*/

/**
	Apply the "txtfit" imgix param to the image url. Same as doing .setParam('txtfit', val)
	@param val the value to set for txtfit
	@name imgix.URL#setTextFit
	@function
*/

/**
	Apply the "txtfont" imgix param to the image url. Same as doing .setParam('txtfont', val)
	@param val the value to set for txtfont
	@name imgix.URL#setTextFont
	@function
*/

/**
	Apply the "txtline" imgix param to the image url. Same as doing .setParam('txtline', val)
	@param val the value to set for txtline
	@name imgix.URL#setTextLine
	@function
*/

/**
	Apply the "txtlineclr" imgix param to the image url. Same as doing .setParam('txtlineclr', val)
	@param val the value to set for txtlineclr
	@name imgix.URL#setTextLineColor
	@function
*/

/**
	Apply the "txtpad" imgix param to the image url. Same as doing .setParam('txtpad', val)
	@param val the value to set for txtpad
	@name imgix.URL#setTextPad
	@function
*/

/**
	Apply the "txtsize" imgix param to the image url. Same as doing .setParam('txtsize', val)
	@param val the value to set for txtsize
	@name imgix.URL#setTextSize
	@function
*/

/**
	Apply the "txtshad" imgix param to the image url. Same as doing .setParam('txtshad', val)
	@param val the value to set for txtshad
	@name imgix.URL#setTextShadow
	@function
*/

/**
	Apply the "trim" imgix param to the image url. Same as doing .setParam('trim', val)
	@param val the value to set for trim
	@name imgix.URL#setTrim
	@function
*/

/**
	Apply the "trimcolor" imgix param to the image url. Same as doing .setParam('trimcolor', val)
	@param val the value to set for trimcolor
	@name imgix.URL#setTrimColor
	@function
*/

/**
	Apply the "trimmd" imgix param to the image url. Same as doing .setParam('trimmd', val)
	@param val the value to set for trimmd
	@name imgix.URL#setTrimMeanDifference
	@function
*/

/**
	Apply the "mark" imgix param to the image url. Same as doing .setParam('mark', val)
	@param val the value to set for mark
	@name imgix.URL#setWatermark
	@function
*/

/**
	Apply the "markalign" imgix param to the image url. Same as doing .setParam('markalign', val)
	@param val the value to set for markalign
	@name imgix.URL#setWatermarkAlign
	@function
*/

/**
	Apply the "markalpha" imgix param to the image url. Same as doing .setParam('markalpha', val)
	@param val the value to set for markalpha
	@name imgix.URL#setWatermarkAlpha
	@function
*/

/**
	Apply the "markfit" imgix param to the image url. Same as doing .setParam('markfit', val)
	@param val the value to set for markfit
	@name imgix.URL#setWatermarkFit
	@function
*/

/**
	Apply the "markh" imgix param to the image url. Same as doing .setParam('markh', val)
	@param val the value to set for markh
	@name imgix.URL#setWatermarkHeight
	@function
*/

/**
	Apply the "markpad" imgix param to the image url. Same as doing .setParam('markpad', val)
	@param val the value to set for markpad
	@name imgix.URL#setWatermarkPadding
	@function
*/

/**
	Apply the "markscale" imgix param to the image url. Same as doing .setParam('markscale', val)
	@param val the value to set for markscale
	@name imgix.URL#setWatermarkScale
	@function
*/

/**
	Apply the "markw" imgix param to the image url. Same as doing .setParam('markw', val)
	@param val the value to set for markw
	@name imgix.URL#setWatermarkWidth
	@function
*//**
	Get the value of the "bri" imgix param currently on the image url. Same as doing .getParam('bri')
	@name imgix.URL#getBrightness
	@function
*/

/**
	Get the value of the "con" imgix param currently on the image url. Same as doing .getParam('con')
	@name imgix.URL#getContrast
	@function
*/

/**
	Get the value of the "exp" imgix param currently on the image url. Same as doing .getParam('exp')
	@name imgix.URL#getExposure
	@function
*/

/**
	Get the value of the "gam" imgix param currently on the image url. Same as doing .getParam('gam')
	@name imgix.URL#getGamma
	@function
*/

/**
	Get the value of the "high" imgix param currently on the image url. Same as doing .getParam('high')
	@name imgix.URL#getHighlight
	@function
*/

/**
	Get the value of the "hue" imgix param currently on the image url. Same as doing .getParam('hue')
	@name imgix.URL#getHue
	@function
*/

/**
	Get the value of the "invert" imgix param currently on the image url. Same as doing .getParam('invert')
	@name imgix.URL#getInvert
	@function
*/

/**
	Get the value of the "sat" imgix param currently on the image url. Same as doing .getParam('sat')
	@name imgix.URL#getSaturation
	@function
*/

/**
	Get the value of the "shad" imgix param currently on the image url. Same as doing .getParam('shad')
	@name imgix.URL#getShadow
	@function
*/

/**
	Get the value of the "sharp" imgix param currently on the image url. Same as doing .getParam('sharp')
	@name imgix.URL#getSharpness
	@function
*/

/**
	Get the value of the "usm" imgix param currently on the image url. Same as doing .getParam('usm')
	@name imgix.URL#getUnsharpMask
	@function
*/

/**
	Get the value of the "usmrad" imgix param currently on the image url. Same as doing .getParam('usmrad')
	@name imgix.URL#getUnsharpMaskRadius
	@function
*/

/**
	Get the value of the "vib" imgix param currently on the image url. Same as doing .getParam('vib')
	@name imgix.URL#getVibrance
	@function
*/

/**
	Get the value of the "auto" imgix param currently on the image url. Same as doing .getParam('auto')
	@name imgix.URL#getAuto
	@function
*/

/**
	Get the value of the "bg" imgix param currently on the image url. Same as doing .getParam('bg')
	@name imgix.URL#getBackground
	@function
*/

/**
	Get the value of the "ba" imgix param currently on the image url. Same as doing .getParam('ba')
	@name imgix.URL#getBlendAlign
	@function
*/

/**
	Get the value of the "balph" imgix param currently on the image url. Same as doing .getParam('balph')
	@name imgix.URL#getBlendAlpha
	@function
*/

/**
	Get the value of the "bc" imgix param currently on the image url. Same as doing .getParam('bc')
	@name imgix.URL#getBlendCrop
	@function
*/

/**
	Get the value of the "bf" imgix param currently on the image url. Same as doing .getParam('bf')
	@name imgix.URL#getBlendFit
	@function
*/

/**
	Get the value of the "bh" imgix param currently on the image url. Same as doing .getParam('bh')
	@name imgix.URL#getBlendHeight
	@function
*/

/**
	Get the value of the "blend" imgix param currently on the image url. Same as doing .getParam('blend')
	@name imgix.URL#getBlend
	@function
*/

/**
	Get the value of the "bm" imgix param currently on the image url. Same as doing .getParam('bm')
	@name imgix.URL#getBlendMode
	@function
*/

/**
	Get the value of the "bp" imgix param currently on the image url. Same as doing .getParam('bp')
	@name imgix.URL#getBlendPadding
	@function
*/

/**
	Get the value of the "bs" imgix param currently on the image url. Same as doing .getParam('bs')
	@name imgix.URL#getBlendSize
	@function
*/

/**
	Get the value of the "bw" imgix param currently on the image url. Same as doing .getParam('bw')
	@name imgix.URL#getBlendWidth
	@function
*/

/**
	Get the value of the "border" imgix param currently on the image url. Same as doing .getParam('border')
	@name imgix.URL#getBorder
	@function
*/

/**
	Get the value of the "pad" imgix param currently on the image url. Same as doing .getParam('pad')
	@name imgix.URL#getPad
	@function
*/

/**
	Get the value of the "dl" imgix param currently on the image url. Same as doing .getParam('dl')
	@name imgix.URL#getDownload
	@function
*/

/**
	Get the value of the "fm" imgix param currently on the image url. Same as doing .getParam('fm')
	@name imgix.URL#getFormat
	@function
*/

/**
	Get the value of the "q" imgix param currently on the image url. Same as doing .getParam('q')
	@name imgix.URL#getQuality
	@function
*/

/**
	Get the value of the "mask" imgix param currently on the image url. Same as doing .getParam('mask')
	@name imgix.URL#getMask
	@function
*/

/**
	Get the value of the "nr" imgix param currently on the image url. Same as doing .getParam('nr')
	@name imgix.URL#getNoiseReduction
	@function
*/

/**
	Get the value of the "nrs" imgix param currently on the image url. Same as doing .getParam('nrs')
	@name imgix.URL#getNoiseReductionSharpen
	@function
*/

/**
	Get the value of the "palette" imgix param currently on the image url. Same as doing .getParam('palette')
	@name imgix.URL#getPalette
	@function
*/

/**
	Get the value of the "class" imgix param currently on the image url. Same as doing .getParam('class')
	@name imgix.URL#getPaletteClass
	@function
*/

/**
	Get the value of the "prefix" imgix param currently on the image url. Same as doing .getParam('prefix')
	@name imgix.URL#getPalettePrefix
	@function
*/

/**
	Get the value of the "colors" imgix param currently on the image url. Same as doing .getParam('colors')
	@name imgix.URL#getPaletteColorNumber
	@function
*/

/**
	Get the value of the "page" imgix param currently on the image url. Same as doing .getParam('page')
	@name imgix.URL#getPage
	@function
*/

/**
	Get the value of the "dpr" imgix param currently on the image url. Same as doing .getParam('dpr')
	@name imgix.URL#getDPR
	@function
*/

/**
	Get the value of the "flip" imgix param currently on the image url. Same as doing .getParam('flip')
	@name imgix.URL#getFlip
	@function
*/

/**
	Get the value of the "or" imgix param currently on the image url. Same as doing .getParam('or')
	@name imgix.URL#getOrient
	@function
*/

/**
	Get the value of the "rot" imgix param currently on the image url. Same as doing .getParam('rot')
	@name imgix.URL#getRotate
	@function
*/

/**
	Get the value of the "crop" imgix param currently on the image url. Same as doing .getParam('crop')
	@name imgix.URL#getCrop
	@function
*/

/**
	Get the value of the "fit" imgix param currently on the image url. Same as doing .getParam('fit')
	@name imgix.URL#getFit
	@function
*/

/**
	Get the value of the "h" imgix param currently on the image url. Same as doing .getParam('h')
	@name imgix.URL#getHeight
	@function
*/

/**
	Get the value of the "rect" imgix param currently on the image url. Same as doing .getParam('rect')
	@name imgix.URL#getRectangle
	@function
*/

/**
	Get the value of the "w" imgix param currently on the image url. Same as doing .getParam('w')
	@name imgix.URL#getWidth
	@function
*/

/**
	Get the value of the "blur" imgix param currently on the image url. Same as doing .getParam('blur')
	@name imgix.URL#getBlur
	@function
*/

/**
	Get the value of the "htn" imgix param currently on the image url. Same as doing .getParam('htn')
	@name imgix.URL#getHalftone
	@function
*/

/**
	Get the value of the "mono" imgix param currently on the image url. Same as doing .getParam('mono')
	@name imgix.URL#getMonochrome
	@function
*/

/**
	Get the value of the "px" imgix param currently on the image url. Same as doing .getParam('px')
	@name imgix.URL#getPixelate
	@function
*/

/**
	Get the value of the "sepia" imgix param currently on the image url. Same as doing .getParam('sepia')
	@name imgix.URL#getSepia
	@function
*/

/**
	Get the value of the "txt" imgix param currently on the image url. Same as doing .getParam('txt')
	@name imgix.URL#getText
	@function
*/

/**
	Get the value of the "txtalign" imgix param currently on the image url. Same as doing .getParam('txtalign')
	@name imgix.URL#getTextAlign
	@function
*/

/**
	Get the value of the "txtclip" imgix param currently on the image url. Same as doing .getParam('txtclip')
	@name imgix.URL#getTextClip
	@function
*/

/**
	Get the value of the "txtclr" imgix param currently on the image url. Same as doing .getParam('txtclr')
	@name imgix.URL#getTextColor
	@function
*/

/**
	Get the value of the "txtfit" imgix param currently on the image url. Same as doing .getParam('txtfit')
	@name imgix.URL#getTextFit
	@function
*/

/**
	Get the value of the "txtfont" imgix param currently on the image url. Same as doing .getParam('txtfont')
	@name imgix.URL#getTextFont
	@function
*/

/**
	Get the value of the "txtline" imgix param currently on the image url. Same as doing .getParam('txtline')
	@name imgix.URL#getTextLine
	@function
*/

/**
	Get the value of the "txtlineclr" imgix param currently on the image url. Same as doing .getParam('txtlineclr')
	@name imgix.URL#getTextLineColor
	@function
*/

/**
	Get the value of the "txtpad" imgix param currently on the image url. Same as doing .getParam('txtpad')
	@name imgix.URL#getTextPad
	@function
*/

/**
	Get the value of the "txtsize" imgix param currently on the image url. Same as doing .getParam('txtsize')
	@name imgix.URL#getTextSize
	@function
*/

/**
	Get the value of the "txtshad" imgix param currently on the image url. Same as doing .getParam('txtshad')
	@name imgix.URL#getTextShadow
	@function
*/

/**
	Get the value of the "trim" imgix param currently on the image url. Same as doing .getParam('trim')
	@name imgix.URL#getTrim
	@function
*/

/**
	Get the value of the "trimcolor" imgix param currently on the image url. Same as doing .getParam('trimcolor')
	@name imgix.URL#getTrimColor
	@function
*/

/**
	Get the value of the "trimmd" imgix param currently on the image url. Same as doing .getParam('trimmd')
	@name imgix.URL#getTrimMeanDifference
	@function
*/

/**
	Get the value of the "mark" imgix param currently on the image url. Same as doing .getParam('mark')
	@name imgix.URL#getWatermark
	@function
*/

/**
	Get the value of the "markalign" imgix param currently on the image url. Same as doing .getParam('markalign')
	@name imgix.URL#getWatermarkAlign
	@function
*/

/**
	Get the value of the "markalpha" imgix param currently on the image url. Same as doing .getParam('markalpha')
	@name imgix.URL#getWatermarkAlpha
	@function
*/

/**
	Get the value of the "markfit" imgix param currently on the image url. Same as doing .getParam('markfit')
	@name imgix.URL#getWatermarkFit
	@function
*/

/**
	Get the value of the "markh" imgix param currently on the image url. Same as doing .getParam('markh')
	@name imgix.URL#getWatermarkHeight
	@function
*/

/**
	Get the value of the "markpad" imgix param currently on the image url. Same as doing .getParam('markpad')
	@name imgix.URL#getWatermarkPadding
	@function
*/

/**
	Get the value of the "markscale" imgix param currently on the image url. Same as doing .getParam('markscale')
	@name imgix.URL#getWatermarkScale
	@function
*/

/**
	Get the value of the "markw" imgix param currently on the image url. Same as doing .getParam('markw')
	@name imgix.URL#getWatermarkWidth
	@function
*/
	if (typeof define === 'function' && define.amd) {
		define('imgix', [], function() {
			return imgix;
		});
	}

}).call(this);
