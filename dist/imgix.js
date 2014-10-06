/*! http://www.imgix.com imgix.js - v1.0.7 - 2014-10-06 
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

"use strict";

// Establish the root object, `window` in the browser, or `exports` on the server.
var root = this;

/**
 *  `imgix` is the root namespace for all imgix client code.
 * @namespace imgix
 */
var imgix = {};

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
	urlParser: (function() {
		function isNumeric(arg) {
			return !isNaN(parseFloat(arg)) && isFinite(arg);
		}

		return function(arg, url) {
			var _ls = url || window.location.toString();

			if (!arg) { return _ls; }
			else { arg = arg.toString(); }

			if (_ls.substring(0,2) === '//') { _ls = 'http:' + _ls; }
			else if (_ls.split('://').length === 1) { _ls = 'http://' + _ls; }

			url = _ls.split('/');
			var _l = {auth:''}, host = url[2].split('@');

			if (host.length === 1) { host = host[0].split(':'); }
			else { _l.auth = host[0]; host = host[1].split(':'); }

			_l.protocol = url[0];
			_l.hostname=host[0];
			_l.port=(host[1] || ((_l.protocol.split(':')[0].toLowerCase() === 'https') ? '443' : '80'));
			_l.pathname=( (url.length > 3 ? '/' : '') + url.slice(3, url.length).join('/').split('?')[0].split('#')[0]);
			var _p = _l.pathname;

			if (_p.charAt(_p.length-1) === '/') { _p=_p.substring(0, _p.length-1); }
			var _h = _l.hostname, _hs = _h.split('.'), _ps = _p.split('/');

			if (arg === 'hostname') { return _h; }
			else if (arg === 'domain') {
				if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(_h)) { return _h; }
				return _hs.slice(-2).join('.'); 
			}
			//else if (arg === 'tld') { return _hs.slice(-1).join('.'); }
			else if (arg === 'sub') { return _hs.slice(0, _hs.length - 2).join('.'); }
			else if (arg === 'port') { return _l.port; }
			else if (arg === 'protocol') { return _l.protocol.split(':')[0]; }
			else if (arg === 'auth') { return _l.auth; }
			else if (arg === 'user') { return _l.auth.split(':')[0]; }
			else if (arg === 'pass') { return _l.auth.split(':')[1] || ''; }
			else if (arg === 'path') { return _l.pathname; }
			else if (arg.charAt(0) === '.')
			{
				arg = arg.substring(1);
				if(isNumeric(arg)) {arg = parseInt(arg, 10); return _hs[arg < 0 ? _hs.length + arg : arg-1] || ''; }
			}
			else if (isNumeric(arg)) { arg = parseInt(arg, 10); return _ps[arg < 0 ? _ps.length + arg : arg] || ''; }
			else if (arg === 'file') { return _ps.slice(-1)[0]; }
			else if (arg === 'filename') { return _ps.slice(-1)[0].split('.')[0]; }
			else if (arg === 'fileext') { return _ps.slice(-1)[0].split('.')[1] || ''; }
			else if (arg.charAt(0) === '?' || arg.charAt(0) === '#')
			{
				var params = _ls, param = null;

				if(arg.charAt(0) === '?') { params = (params.split('?')[1] || '').split('#')[0]; }
				else if(arg.charAt(0) === '#') { params = (params.split('#')[1] || ''); }

				if(!arg.charAt(1)) { return params; }

				arg = arg.substring(1);
				params = params.split('&');

				for(var i=0,ii=params.length; i<ii; i++)
				{
					param = params[i].split('=');
					if(param[0] === arg) { return param[1] || ''; }
				}

				return null;
			}

			return '';
		};
	})(),

	mergeObject: function() {
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

	getZoom: function () {
		var zoomMult = Math.round((screen.width / window.innerWidth) * 10) / 10;
		return zoomMult <= 1 ? 1 : zoomMult;
	},

	getDPR: function () {
		var dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;

		if (dpr % 1 !== 0) {
			var tmpStr = '' + dpr;
			tmpStr = tmpStr.split('.')[1];
			dpr = (tmpStr.length > 1 && tmpStr.slice(1, 2) !== "0") ? dpr.toFixed(2) : dpr.toFixed(1);
		}

		return dpr;
	},

	getWindowWidth: function () {
		return document.documentElement.clientWidth || document.body && document.body.clientWidth || 1024;
	},

	getWindowHeight: function () {
		return document.documentElement.clientHeight || document.body && document.body.clientHeight || 768;
	},

	getImgSrc: function (elem) {
		return elem.getAttribute("data-src") || elem.getAttribute("src");
	},

	calculateElementSize: function (elem) {
		var val = {
			width: elem.offsetWidth,
			height: elem.offsetHeight
		};

		if (elem.parentNode === null) {
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
				visProp = {position : "absolute", visibility : "hidden", display : "block"};

			for (prop in visProp) {
				if (visProp.hasOwnProperty(prop)) {
					past[prop] = elem.style[prop];
					elem.style[prop] = visProp[prop];
				}
			}

			found = val;

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

	isReallyObject: function(elem) {
		return elem && typeof elem === "object" && (elem + '') === '[object Object]';
	},

	isFluidSet: function(elem) {
		return elem && typeof elem === "object" && (elem + '') === '[object FluidSet]';
	},

	extractInt: function(str) {
		if (str === undefined) {
			return 0;
		} else if (typeof str === "number") {
			return str;
		}
		return parseInt(str.replace(/\D/g, ''), 10) || 0;
	},

	camelize: function(str) {
		return str.replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
	},

	getElementCssProperty: function(elem, prop) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(elem, null).getPropertyValue(prop);
		} else {
			if (elem && elem.style && prop) {
				return elem.style[this.camelize(prop)];
			}
		}

		return '';
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
imgix.getElementByXPathClassName = function(xpath) {
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
imgix.getElementImageByXPathClassName = function(xpath) {
	return imgix.getElementImage(imgix.getElementByXPathClassName(xpath));
};

/**
 * Reports if an element is an image tag
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {boolean} true if the element is an img tag
 */
imgix.isImageElement = function(el) {
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
imgix.setElementImageAfterLoad = function(el, imgUrl, callback) {
	var img = new Image();
	img.src = imgUrl;
	img.onload = function() {
		imgix.setElementImage(el, imgUrl);
		if (typeof callback === "function") {
			callback();
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
imgix.setElementImage = function(el, imgUrl) {
	if (!el) {
		return false;
	}

	if (imgix.isImageElement(el)) {
		el.src = imgUrl;
		return true;
	} else {
		var curBg = imgix.getBackgroundImage(el);
		if (curBg) {
			el.style.cssText = el.style.cssText.replace(curBg, imgUrl);
			return true;
		} else {
			if(document.addEventListener){
				el.style.backgroundImage = 'url(' + imgUrl + ')';
			} else {
				el.style.cssText = 'background-image:url(' + imgUrl + ')';
			}
			return true;
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
imgix.getEmptyImage = function() {
	return 'https://assets.imgix.net/pixel.gif';
};

/**
 * Intelligently returns the image on the element
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {string} url of the image on the element
 */
imgix.getElementImage = function(el) {
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
imgix.getRawBackgroundImage = function(el) {
	return el.style.cssText.match(/url\(([^\)]+)/);
};

/**
 * Returns the background image for an element
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {string} url of the image on the element
 */
imgix.getBackgroundImage = function(el) {
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
imgix.getColorBrightness = function(c) {
	if (c) {
		if (c.slice(0, 1) === '#') {
			c = imgix.hexToRGB(c);
		}
	} else {
		return 0;
	}

	var parts = c.replace(/[^0-9,]+/g, '').split(","),
		r = +parts[0],
		g = +parts[1],
		b = +parts[2];

	return +Math.sqrt((r * r * .241) + (g * g * .691) + (b * b * .068));
};

/**
 * Converts a hex color to rgb (#ff00ff -> rgb(255, 0, 255)
 * @memberof imgix
 * @static
 * @param {string} color a color in hex format (#ff00ff)
 * @returns {string} color in rgb format rgb(255, 0, 255)
 */
imgix.hexToRGB = function(hex) {

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
		return '' + x + x;
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
		console.warn("invalid hex color:", hex);
	}

	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

/**
 * Gives all elements on the page that have images (or could img). Does NOT support IE8
 * @memberof imgix
 * @static
 * @returns {NodeList} html elements with images
 */
imgix.getElementsWithImages = function() {
	imgix.markElementsWithImages();

	return document.querySelectorAll("." + IMGIX_USABLE_CLASS);
};

/**
 * Does an element have an image attached
 * @memberof imgix
 * @static
 * @param {Element} el element to check for images
 * @returns {boolean} true if passed element has an image
 */
imgix.hasImage = function(el) {
	var toCheck = el.style.cssText ? el.style.cssText.toLowerCase() : el.style.cssText;
	return el && (imgix.isImageElement(el) || toCheck.indexOf('background-image') !== -1);
};

/**
 * Helper method that attaches IMGIX_CLASS to all elements with images on a page
 * @memberof imgix
 * @private
 * @static
 */
imgix.markElementsWithImages = function() {
	var all = document.getElementsByTagName("*");
	for (var i=0, max=all.length; i < max; i++) {
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
imgix.hasClass = function(elem, name) {
	return (" " + elem.className + " ").indexOf(" " + name + " ") > -1;
};

/**
 * Helper method that "marks" an element as "imgix usable" by adding special classes
 * @memberof imgix
 * @static
 * @private
 * @param {Element} el the element to place the class on
 * @returns {string} auto-generated class name (via xpath)
 */
imgix.setImgixClass = function(el) {
	if (imgix.hasClass(el, IMGIX_USABLE_CLASS)) {
		return imgix.getImgixClass(el);
	}

	var cls = imgix.getXPathClass(imgix.getElementTreeXPath(el));

	el.classList.add(cls);
	el.classList.add(IMGIX_USABLE_CLASS);

	return imgix.getImgixClass(el);
};

/**
 * Helper method that returns generated (via xpath) class name for "marked" image elements
 * @memberof imgix
 * @static
 * @private
 * @param {Element} el the element to get the class for
 * @returns {string} class name
 */
imgix.getImgixClass = function(el) {
	if (imgix.hasClass(el, IMGIX_USABLE_CLASS)) {
		return el.className.match(/imgix-el-[^\s]+/)[0];
	}
};

imgix.getXPathClass = function(xpath) {
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
imgix.rgbToHex = function(value) {
	var parts = value.split(",");

	parts = parts.map(function(a) {
		return imgix.componentToHex(parseInt(a.replace(/\D/g, '')));
	});

	return parts.join('');
};

imgix.componentToHex = function(c) {
	var hex = c.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
};

// Current: https://github.com/firebug/firebug/blob/5026362f2d1734adfcc4b44d5413065c50b27400/extension/content/firebug/lib/xpath.js
imgix.getElementTreeXPath = function(element) {
	var paths = [];

	// Use nodeName (instead of localName) so namespace prefix is included (if any).
	for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode) {
		var index = 0;
		for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
			// Ignore document type declaration.
			if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
				continue;

			if (sibling.nodeName == element.nodeName)
				++index;
		}

		var tagName = (element.prefix ? element.prefix + ":" : "") + element.localName;
		var pathIndex = (index ? "[" + (index+1) + "]" : "");
		paths.splice(0, 0, tagName + pathIndex);
	}

	return paths.length ? "/" + paths.join("/") : null;
};

/**
 * Returns a font lookup. Pretty Name => name to use with imgix
 * Example: "American Typewriter Bold" => "American Typewriter,bold",
 * @memberof imgix
 * @static
 * @returns {object} passed color converted to hex
 */
imgix.getFontLookup = function() {
	return {
		"American Typewriter": "American Typewriter",
		"American Typewriter Bold": "American Typewriter,bold",
		"American Typewriter Condensed": "American Typewriter Condensed",
		"American Typewriter Condensed Bold": "American Typewriter Condensed,bold",
		"American Typewriter Condensed Light": "American Typewriter Condensed Light",
		"American Typewriter Light": "American Typewriter Light",
		"Andale Mono": "Andale Mono",
		"Arial": "Arial",
		"Arial Black": "Arial Black",
		"Arial Bold": "Arial,bold",
		"Arial Bold Italic": "Arial,bold,italic",
		"Arial Italic": "Arial,italic",
		"Baskerville": "Baskerville",
		"Big Caslon": "Big Caslon",
		"Brush Script MT": "Brush Script MT",
		"Cochin": "Cochin",
		"Copperplate": "Copperplate",
		"Courier": "Courier",
		"Courier Bold": "Courier,bold",
		"Courier Oblique": "Courier Oblique",
		"Didot": "Didot",
		"Futura": "Futura",
		"Futura Condensed": "Futura Condensed Medium",
		"Futura Italic": "Futura Medium,italic",
		"Georgia": "Georgia",
		"Georgia Bold": "Georgia,bold",
		"Georgia Bold Italic": "Georgia,bold,italic",
		"Georgia Italic": "Georgia,italic",
		"Gill Sans": "Gill Sans",
		"Gill Sans Bold": "Gill Sans,bold",
		"Gill Sans Bold Italic": "Gill Sans,bold,italic",
		"Gill Sans Italic": "Gill Sans,italic",
		"Gill Sans Light": "Gill Sans Light",
		"Gill Sans Light Italic": "Gill Sans Light,italic",
		"Helvetica": "Helvetica",
		"Helvetica Bold": "Helvetica,bold",
		"Helvetica Light": "Helvetica Light",
		"Helvetica Light Oblique": "Helvetica Light Oblique",
		"Helvetica Neue": "Helvetica Neue",
		"Helvetica Neue Bold": "Helvetica Neue,bold",
		"Helvetica Neue Bold Italic": "Helvetica Neue,bold,italic",
		"Helvetica Neue Condensed Black": "Helvetica Neue Condensed Black",
		"Helvetica Neue Condensed Bold": "Helvetica Neue Condensed,bold",
		"Helvetica Neue Light": "Helvetica Neue Light",
		"Helvetica Neue Light Italic": "Helvetica Neue Light,italic",
		"Helvetica Neue Medium": "Helvetica Neue Medium",
		"Helvetica Neue UltraLight": "Helvetica Neue UltraLight",
		"Helvetica Neue UltraLight Italic": "Helvetica Neue UltraLight,italic",
		"Helvetica Oblique": "Helvetica Oblique",
		"Herculanum": "Herculanum",
		"Impact": "Impact",
		"Marker Felt Thin": "Marker Felt Thin",
		"Marker Felt Wide": "Marker Felt Wide",
		"Optima": "Optima",
		"Optima Bold": "Optima,bold",
		"Optima Bold Italic": "Optima,bold,italic",
		"Optima ExtraBlack": "Optima ExtraBlack",
		"Optima Italic": "Optima,italic",
		"Papyrus": "Papyrus",
		"Papyrus Condensed": "Papyrus Condensed",
		"Times": "Times",
		"Times Bold": "Times,bold",
		"Times Bold Italic": "Times,bold,italic",
		"Times Italic": "Times,italic",
		"Times New Roman": "Times New Roman",
		"Times New Roman Bold": "Times New Roman,bold",
		"Times New Roman Bold Italic": "Times New Roman,bold,italic",
		"Times New Roman Italic": "Times New Roman,italic",
		"Trebuchet MS": "Trebuchet MS",
		"Trebuchet MS Bold": "Trebuchet MS,bold",
		"Trebuchet MS Bold Italic": "Trebuchet MS,bold,italic",
		"Trebuchet MS Italic": "Trebuchet MS,italic",
		"Verdana": "Verdana",
		"Verdana Bold": "Verdana,bold",
		"Verdana Bold Italic": "Verdana,bold,italic",
		"Verdana Italic": "Verdana,italic",
		"Zapfino": "Zapfino"
	};
};

/**
 * Get a list of all the fonts supported by imgix
 * @memberof imgix
 * @static
 * @returns {array} An array of strings of the supported font names
 */
imgix.getFonts = function() {
	return Object.keys(imgix.getFontLookup());
};

imgix.searchFonts = function(needle) {
	needle = needle.toLowerCase();
	return imgix.getFonts().filter(function(i) { return i.toLowerCase().indexOf(needle) !== -1; });
};

imgix.isFontAvailable = function(font) {
	return imgix.isDef(imgix.getFontLookup()[font]);
};

imgix.getParamAliases = function() {
		return {
			't': 'txt',
			'tf': 'txtfont',
			'tsz': 'txtsize',
			'tl': 'txtline',
			'tsh': 'txtshad',
			'tp': 'txtpad',
			'txtlinecolor': 'txtlineclr',
			'ta': 'txtalign',
			'intensity': 'int',
			'monochrome': 'mono',
			'f': 'fit',
			'orient': 'or',
			'm': 'watermark',
			'mf': 'markfit',
			'ms': 'markscale',
			'ma': 'markalign',
			'mp': 'markpad'
		};
};

imgix.getDefaultParamValues = function() {
	return {
		// STYLIZE
		'sepia': "0",
		'px': "0",
		'htn': "0",
		'blur': "0",
		'mono': '',
		'blend': '',
		'int': "100",

		// ENHANCE
		'hue': "0",
		'sat': "0",
		'bri': "0",
		'con': "0",
		'exp': "0",
		'high': "0",
		'shad': "0",
		'gam': "0",
		'vib': "0",
		'sharp': "0",

		// TEXT
		'txt': '',
		'txtfont': 'Helvetica',
		'txtsize': "12",
		'txtclr': '000000',
		'txtalign': 'bottom,right',
		'txtshad': "0",
		'txtpad': "10",
		'txtline': "0",
		'txtlineclr': 'ffffff',
		'txtfit': '',

		// RESIZE
		'rect': '',
		'dpr': "1",
		'fit': 'clip',
		'flip': '',
		'or': "0",
		'crop': '',
		'rot': "0",
		'h': "0",
		'w': "0",

		// GENERAL
		'fm': '',
		'q': 75,

		// WATERMARK
		'mark': '',
		'markw': '',
		'markh': '',
		'markfit': 'clip',
		'markscale': '',
		'markalign': 'bottom,right',
		'markalpha': 100,
		'markpad': 5,

		'palette': '',
		'colors': '',
		'class': '',
		'auto': '',
		'mask': '',
		'bg': ''
	};
};

imgix.getDefaultParamValue = function(param) {
	return imgix.getDefaultParamValues()[param];
};

imgix.getDefaultParams = function() {
	return Object.keys(imgix.getDefaultParamValues());
};

imgix.makeCssClass = function(url) {
	return "tmp_" + imgix.md5(url);
};

imgix.injectStyleSheet = function(url) {
	var ss = document.createElement("link");
	ss.type = "text/css";
	ss.rel = "stylesheet";
	ss.href = url;

	document.getElementsByTagName("head")[0].appendChild(ss);
};

imgix.findInjectedStyleSheet = function(url) {
	if (document.styleSheets) {
		for (var i = 0; i < document.styleSheets.length; i++) {
			if (document.styleSheets[i].href === url) {
				return true;
			}
		}
	}

	return false;
};

imgix.getElementImageSize = function(el) {
	var w = 0,
		h = 0;

	if (imgix.isImageElement(el)) {
		w = el.naturalWidth;
		h = el.naturalHeight;
	} else {
		w = imgix.helpers.extractInt(imgix.getCssProperty(el, "width"));
		h = imgix.helpers.extractInt(imgix.getCssProperty(el, "height"));
	}

	return {
		width: w,
		height: h
	};
};

imgix.getCssPropertyById = function(elmId, property) {
	var elem = document.getElementById(elmId);
	return imgix.helpers.getElementCssProperty(elem, property);
};

imgix.getCssProperty = function(el, property) {
	return imgix.helpers.getElementCssProperty(el, property);
};

imgix.getCssPropertyBySelector = function(sel, property) {
	var elem = document.querySelector(sel);
	return imgix.helpers.getElementCssProperty(elem, property);
};

imgix.instanceOfImgixURL = function(x) {
	return x && x.toString() === "[object imgixURL]";
};

/**
 * Represents an imgix url
 * @memberof imgix
 * @constructor
 * @param {string} url An imgix url to start with (optional)
 * @param {object} imgParams imgix query string params (optional)
 * @param {object} token secure url token for signing images (optional)
 */
imgix.URL = function(url, imgParams, token, isRj) {

	this.token = token || '';
	this._autoUpdateSel = null;
	this._autoUpdateCallback = null;
	this.isRj = !imgix.isDef(isRj) ? false : isRj;
	this.setUrl(url);

	if (typeof imgParams === "object") {
		this.setParams(imgParams);
	}

	this.paramAliases = {};
};

/**
 * Attach the image url (.getUrl() value) to the passed html element (or selector for that element)
 * @memberof imgix
 * @param {string} elemOrSel html elment or css selector for the element
 * @param {function} callback optional callback to be called when image is set on the element
 */
imgix.URL.prototype.attachImageTo = function(elemOrSel, callback) {
	//this.token = token;
	if (typeof elemOrSel === "string") {
		imgix.setElementImageAfterLoad(document.querySelector(elemOrSel), this.getUrl(), callback);
	} else {
		imgix.setElementImageAfterLoad(elemOrSel, this.getUrl(), callback);
	}
};


/**
 * Set the token for signing images. If a token is set it will always sign the generated urls
 * @memberof imgix
 * @param {string} token secure url token from your imgix source
 */
imgix.URL.prototype.setToken = function(token) {
	this.token = token;
};

imgix.createParamString = function() {
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
imgix.URL.prototype.getColors = function(num, callback) {
	var clone = new imgix.URL(this.getUrl()),
		paletteClass = imgix.makeCssClass(this.getUrl());

	if (typeof num === "function") {
		if (typeof callback === "number") {
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

	var lookForLoadedCss = function() {
		if (!imgix.findInjectedStyleSheet(cssUrl)) {
			setTimeout(lookForLoadedCss, 100);
		} else {
			var lastColor = null;

			setTimeout(function() {
				var promises = [],
					maxTries = 100;

				for (var i = 1; i <= num; i++) {

					(function(i) {
						var tmps = document.createElement("span");
						tmps.id = paletteClass + '-' + i;
						tmps.className = paletteClass + '-fg-' + i;
						document.body.appendChild(tmps);

						promises.push(
							new Promise(function (resolve, reject) {
								var attempts = 0;
								var checkLoaded = function() {
									var c = imgix.getCssPropertyById(tmps.id, 'color');
									if (c !== lastColor) {
										document.body.removeChild(tmps);
										resolve({"num": i, "color": c});
										lastColor = c;
									} else {
										if (++attempts < maxTries) {
											setTimeout(checkLoaded, 50);
										} else {
											document.body.removeChild(tmps);
											resolve({"num": i, "color": 'rgb(255, 255, 255)'});
										}
									}
								};

								setTimeout(checkLoaded, 300);
							})
						);
					})(i);

				} // end loop

				Promise.all(promises).then(function(values) {
					var resultColors = [];

					values = values.sort(function(a, b) {
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

imgix.URL.prototype._handleAutoUpdate = function() {
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
			(function() {
				var img = document.createElement('img'),
					curV = imgix.updateVersion[curSel],
					startTime = (new Date()).getTime();

				img.src = imgUrl;
				img.onload = img.onerror = function() {
					if (!isVersionFresh(curV)) {
						//console.log(curV + ' is an old version -- not updating');
						return;
					}

					for (var i = 0; i < imgToEls[imgUrl].length; i++) {
						imgix.setElementImage(imgToEls[imgUrl][i], imgUrl);
						loadedImages++;

						if (typeof self._autoUpdateCallback === "function") {
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
imgix.URL.prototype.autoUpdateImg = function(sel, callback) {
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

imgix.URL.prototype.setUrl = function(url) {
	if (!url || typeof url !== "string" || url.length === 0) {
		url = imgix.getEmptyImage();
	}
	this.urlParts = this.isRj ? imgix.parseRjUrl(url) : imgix.parseUrl(url);
};

imgix.URL.prototype.setURL = function(url) {
	return this.setUrl(url);
};

imgix.URL.prototype.getURL = function() {
	return this.getUrl();
};

imgix.URL.prototype.toString = function() {
	return "[object imgixURL]";
};

/**
 * The generated imgix image url
 * @memberof imgix
 * @returns {string} the generated url
 */
imgix.URL.prototype.getUrl = function() {
	var url = this.isRj ? imgix.buildRjUrl(this.urlParts) : imgix.buildUrl(this.urlParts);
	if (this.token) {
		return this.isRj ? imgix.signRjUrl(url, this.token) : imgix.signUrl(url, this.token);
	}

	if (!url || url.length === 0) {
		return imgix.getEmptyImage();
	}

	return url;
};

/**
 * Remove an imgix param
 * @memberof imgix
 * @param {string} param the imgix param to remove (e.g. txtfont)
 */
imgix.URL.prototype.removeParam = function(param) {
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
imgix.URL.prototype.clearThenSetParams = function(params) {
	this.clearParams(false); //do not trigger update yet
	this.setParams(params);
};

/**
 * Clear all imgix params attached to the image
 * @memberof imgix
 * @param {boolean} runUpdate (optional) iff using autoUpdateImg should callback be called (defaults to true)
 */
imgix.URL.prototype.clearParams = function(runUpdate) {
	runUpdate = !imgix.isDef(runUpdate) ? true : runUpdate;

	for (var k in this.urlParts.paramValues) {
		this.removeParam(k);
	}

	if (runUpdate) {
		this._handleAutoUpdate();
	}
};


/**
 * Set multiple params using using an object (e.g. {txt: "hello", txtclr: "f00"})
 * @memberof imgix
 * @param {object} dict an object of imgix params and their values
 * @param {boolean} doOverride should the value(s) be overridden if they already exist (defaults to true)
 */
imgix.URL.prototype.setParams = function(dict, doOverride) {
	if (imgix.instanceOfImgixURL(dict)) {
		console.warn("setParams warning: dictionary of imgix params expectd. imgix URL instance passed instead");
		return;
	}
	for (var k in dict) {
		this.setParam(k, dict[k], doOverride, true);
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
imgix.URL.prototype.setParam = function(param, value, doOverride, noUpdate) {
	param = param.toLowerCase();

	doOverride = !imgix.isDef(doOverride) ? true : doOverride;
	noUpdate = !imgix.isDef(noUpdate) ? false : noUpdate;

	if (param === 'col' || param === 'colorize' || param === 'blend' || param === 'mono' || param === "monochrome") {
		if (value.slice(0, 3) === 'rgb') {
			value = imgix.rgbToHex(value);
		}
	}

	// TODO: handle aliases -- only need on build?
	if (imgix.getDefaultParams().indexOf(param) === -1) {
		console.warn("\"" + param + "\" is an invalid imgix param");
		return;
	}

	if (!doOverride && this.urlParts.paramValues[param]) {
		// we are not overriding because they didn't want to
		return;
	}

	if (param === 'txtfont' && imgix.isFontAvailable(value)) {
		var tmp = imgix.getFontLookup()[value];
		if (tmp) {
			value = tmp;
		}
	}

	if (imgix.getDefaultParamValue(param) === value || !imgix.isDef(value) || value === null ||	 value.length === 0) {
		this.removeParam(param);
		return;
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
};

/**
 * Get the value of an imgix param in the query string
 * @memberof imgix
 * @param {string} param the imgix param that you want the value of (e.g. txtclr)
 * @returns {string} the value of the param in the current url
*/
imgix.URL.prototype.getParam = function(param) {
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
 * @returns {object} an object of params and their values (e.g. {txt: "hello", txtclr: "f00"})
*/
imgix.URL.prototype.getParams = function() {
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
imgix.URL.prototype.getBaseUrl = function() {
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
imgix.URL.prototype.getQueryString = function() {
	var url = this.getUrl();
	if (url.indexOf('?') !== -1) {
		return this.getUrl().split('?')[1];
	}

	return '';
};

// "param name": "pretty name" (for auto-generated get/set-ers)
imgix.URL.theGetSetFuncs = Object.freeze({
	//resize
	"crop": "Crop",
	"fit": "Fit",
	"h": "Height",
	"w": "Width",
	"rot": "Rotate",
	"flip": "Flip",
	"or": "Orient",
	"dpr": "DPR",

	//enhance
	"hue": "Hue",
	"sat": "Saturation",
	"bri": "Brightness",
	"con": "Contrast",
	"exp": "Exposure",
	"high": "Highlight",
	"shad": "Shadow",
	"gam": "Gamma",
	"vib": "Vibrance",
	"sharp": "Sharpness",

	//stylize
	"sepia": "Sepia",
	"htn": "Halftone",
	"blur": "Blur",
	"mono": "Monochrome",
	"px": "Pixelate",

	"blend": "Blend",

	//text
	"txt": "Text",
	"txtfont": "TextFont",
	"txtsize": "TextSize",
	"txtclr": "TextColor",
	"txtalign": "TextAlign",
	"txtshad": "TextShadow",
	"txtpad": "TextPad",
	"txtline": "TextLine",
	"txtlineclr": "TextLineColor",
	"txtfit": "TextFit",

	//general
	"fm": "Format",
	"q": "Quality",

	// watermarks
	'mark': 'Watermark',
	'markw': 'WatermarkWidth',
	'markh': 'WatermarkHeight',
	'markfit': 'WatermarkFit',
	'markscale': 'WatermarkScale',
	'markalign': 'WatermarkAlign',
	'markalpha': 'WatermarkAlpha',
	'markpad': 'WatermarkPadding',

	// palette
	'palette': 'Palette',
	'class': 'PaletteClass',
	'colors': 'PaletteColorNumber',

	//
	'auto': 'Auto',
	'mask': 'Mask',
	'bg': 'Background'
});


/** 
	Apply the speia imgix param to the image url. Same as doing .setParam('sepia', val);
	@param val the value to set for sepia
	@name imgix.URL#setSepia
	@function 
*/ 

// Dynamically create our param getter and setters
for (var param in imgix.URL.theGetSetFuncs) {
	(function(tmp) {
		imgix.URL.prototype['set' + imgix.URL.theGetSetFuncs[tmp]] = function(v, doOverride) { this.setParam(tmp, v, doOverride); };
		imgix.URL.prototype['get' + imgix.URL.theGetSetFuncs[tmp]] = function() { return this.getParam(tmp); };
	})(param);
}

// STATIC
imgix.parseRjUrl = function(url) {
	var keys = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'],
		parser = document.createElement('a'),
		result = {};

	parser.href = url;

	var parts = parser.pathname.split('p:'),
		sig = parts[0],
		qs = !parts[1] || parts[1].indexOf('=') === -1 ? '' : parts[1].match(/([^/]+)/)[1],
		path =!parts[1] ? '' :	parts[1].replace(qs, '');

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

		var parts = qs.split('&');
		for (var y = 0; y < parts.length; y++) {
			var tmp = parts[y].split('=');
			if (tmp[0] && tmp[0].length) {
				result.paramValues[tmp[0]] = (tmp.length === 2 ? tmp[1] : '');
				result.params.push(tmp[0]);
			}
		}
	}
	return result;
};

imgix.buildRjUrl = function(parsed) {
	var result = parsed.protocol + '//' + parsed.host + parsed.sig;
	if (parsed.params.length > 0) {
		var qs = [];
		for (var i = 0; i < parsed.params.length; i++) {
			if (parsed.paramValues[parsed.params[i]].length > 0) {
				qs.push(parsed.params[i] + '=' + parsed.paramValues[parsed.params[i]]);
			}
		}

		result += 'p:' + qs.join('&')
	} else {
		result += 'p:'; // need this no matter what...
	}

	result += parsed.pathname;

	return result + parsed.hash;
};

imgix.parseUrl = function(url) {
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
			if (tmp[0] && tmp[0].length && tmp[0] !== "s") {
				result.paramValues[tmp[0]] = (tmp.length === 2 ? tmp[1] : '');
				if (result.params.indexOf(tmp[0]) === -1) {
					result.params.push(tmp[0]);
				}
			}
		}
	}

	return result;
};

imgix.buildUrl = function(parsed) {
	var result = parsed.protocol + '://' + parsed.host +  parsed.pathname;
	if (parsed.params.length > 0) {


		parsed.params = parsed.params.map(function(e) {
			return e.toLowerCase();
		});

		// unique only
		parsed.params = parsed.params.filter(function(value, index, self) {
			return self.indexOf(value) === index;
		});

		// sort
		parsed.params = parsed.params.sort(function(a, b) {
			if(a < b) return -1;
			if(a > b) return 1;
			return 0;
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

imgix.signRjUrl = function(newUrl, token) {
	var p = imgix.parseUrl(newUrl), // normal url parse
		m = p.pathname.match(/([\w\-_*]+)/g),
		sig = m[0];
		sig_location = newUrl.indexOf(sig) + sig.length + 1,
		rest = newUrl.substr(sig_location),
		find_path = rest.match(/([^\/]+)(.+)/g),
		path = find_path[1],
		args = "/" + rest.replace(path, ""),
		concat = token + args,
		new_sig = imgix.safe_btoa_encode(MD5_hash(concat)).substr(0, 8),
		new_url = newUrl.replace(sig, new_sig);
	return new_url;
}

imgix.signUrl = function(newUrl, token) {
	if (token) {
		var parts = imgix.parseUrl(newUrl),
			toSign = token + parts.pathname + '?' + parts.search,
			sig = imgix.md5(token + parts.pathname + '?' + parts.search);

		if (newUrl.indexOf('?') === -1) {
			sig = imgix.md5(token + parts.pathname);
			newUrl = newUrl + "?s=" + sig;
		} else {
			newUrl = newUrl + "&s=" + sig;
		}
	}

	return newUrl;
};

imgix.isDef = function(obj) {
	return (typeof obj !== "undefined");
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
};

function getFluidDefaults() {
	return fluidDefaults;
}

imgix.FluidSet = function(options) {
	if (imgix.helpers.isReallyObject(options)) {
		this.options = imgix.helpers.mergeObject(getFluidDefaults(), options);
	} else {
		this.options = imgix.helpers.mergeObject(getFluidDefaults(), {});
	}

	//Object.freeze(options);

	this.namespace = "" + Math.random().toString(36).substring(7);

	this.windowResizeEventBound = false;
	this.windowResizeTimeout = 200;
	this.windowLastWidth = 0;
	this.windowLastHeight = 0;

	this.reload = imgix.helpers.debouncer(this.reloader, this.windowResizeTimeout);
};

imgix.FluidSet.prototype.updateSrc = function(elem) {
	var details = this.getImgDetails(elem),
		newUrl = details.url,
		currentElemWidth = details.width,
		currentElemHeight = details.height;

	elem.lastWidth = elem.lastWidth || 0;
	elem.lastHeight = elem.lastHeight || 0;

	if (this.options.updateOnResizeDown === false && elem.lastWidth >= currentElemWidth && elem.lastHeight >= currentElemHeight) {
		return;
	}

	imgix.setElementImageAfterLoad(elem, newUrl);
	elem.lastWidth = currentElemWidth;
	elem.lastHeight = currentElemHeight;
};

imgix.FluidSet.prototype.getImgDetails = function(elem) {
	if (!elem) {
		return;
	}

	var dpr = imgix.helpers.getDPR(elem),
		pixelStep = this.options.pixelStep,
		zoomMultiplier = imgix.helpers.isMobileDevice() ? imgix.helpers.getZoom() : 1,
		elemSize = imgix.helpers.calculateElementSize(imgix.isImageElement(elem) ? elem.parentNode : elem),
		//elemSize = imgix.helpers.calculateElementSize(elem),
		elemWidth = imgix.helpers.pixelRound(elemSize.width * zoomMultiplier, pixelStep),
		elemHeight = imgix.helpers.pixelRound(elemSize.height * zoomMultiplier, pixelStep),
		i = new imgix.URL(imgix.helpers.getImgSrc(elem));

	i.setHeight('');
	i.setWidth('');

	if (dpr !== 1) {
		i.setDPR(dpr);
	}

	if (this.options.highDPRAutoScaleQuality && dpr > 1) {
		i.setQuality(Math.min(Math.max(parseInt((100 / dpr), 10), 30), 75));
	}

	if (this.options.fitImgTagToContainerHeight && this.options.fitImgTagToContainerWidth) {
		i.setFit('crop');
	}

	if (i.getFit() === 'crop') {
		//console.log("is auto", isAuto, " ||| ", elem);
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
	if (this.options.onChangeParamOverride !== null && typeof this.options.onChangeParamOverride === "function") {
		overrides = this.options.onChangeParamOverride(elemWidth, elemHeight, i.getParams());
	} else {
		//console.log("skipping...");
	}

	for (var k in overrides) {
		i.setParam(k, overrides[k]);
	}

	return {
		url: i.getURL(),
		width: elemWidth,
		height: elemHeight
	};
};

imgix.FluidSet.prototype.toString = function() {
	return "[object FluidSet]";
};

imgix.FluidSet.prototype.reloader = function() {
	imgix.fluid(this);

	this.windowLastWidth = imgix.helpers.getWindowWidth();
	this.windowLastHeight = imgix.helpers.getWindowHeight();
};

imgix.FluidSet.prototype.attachGestureEvent = function(elem) {
	var self = this;
	if (elem.addEventListener && !elem.listenerAttached) {
		elem.addEventListener("gestureend", function() {
			self.updateSrc(this);
		}, false);

		elem.addEventListener("gesturechange", function() {
			self.updateSrc(this);
		}, false);

		elem.listenerAttached = true;
	}
};


imgix.FluidSet.prototype.resizeListener = function() {
	if (this.windowLastWidth !== imgix.helpers.getWindowWidth() || this.windowLastHeight !== imgix.helpers.getWindowHeight()) {
		this.reload();
	}
};

var instances = {};

imgix.FluidSet.prototype.attachWindowResizer = function() {
	instances[this.namespace] = function() {
		this.resizeListener();
	}.bind(this);

	if (window.addEventListener) {
		window.addEventListener("resize", instances[this.namespace], false);
	} else if (window.attachEvent) {
		window.attachEvent("onresize", instances[this.namespace]);
	}

	this.windowResizeEventBound = true;
};


/**
 * Enables fluid (responsive) images for any element(s) with the "imgix-fluid" class


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


 * @memberof imgix
 * @static
 * @param {object} config options for fluid (this extends the defaults)
 */
imgix.fluid = function(elem) {
	if (elem === null){
		return;
	}

	var options,
		fluidSet;

	if (imgix.helpers.isReallyObject(elem)) {
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
		var cls = '' + options.fluidClass;
		cls = cls.slice(0, 1) === '.' ? cls : ('.' + cls);
		fluidElements = document.querySelectorAll(cls);
	}

	for (var i = 0; i < fluidElements.length; i++) {
		if (fluidElements[i] === null) {
			continue;
		}

		if (options.updateOnPinchZoom) {
			fluidSet.attachGestureEvent(fluidElements[i]);
		}

		fluidSet.updateSrc(fluidElements[i]);
	}

	if (options.updateOnResize && !fluidSet.windowResizeEventBound) {
		fluidSet.attachWindowResizer();
	}
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
	imgix.onready = function (ready) {
		var fns = [];
		var fn;
		var f = false;
		var doc = document;
		var testEl = doc.documentElement;
		var hack = testEl.doScroll;
		var domContentLoaded = "DOMContentLoaded";
		var addEventListener = "addEventListener";
		var onreadystatechange = "onreadystatechange";
		var readyState = "readyState";
		var loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/;
		var loaded = loadedRgx.test(doc[readyState]);
		function flush(f) {
			loaded = 1;
			while (f = fns.shift()) {
				f();
			}
		}
		doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
			doc.removeEventListener(domContentLoaded, fn, f);
			flush();
		}, f);
		hack && doc.attachEvent(onreadystatechange, fn = function () {
			if (/^c/.test(doc[readyState])) {
				doc.detachEvent(onreadystatechange, fn);
				flush();
			}
		});
		return (ready = hack ?
			function (fn) {
				self !== top ?
					loaded ? fn() : fns.push(fn) :
					function () {
						try {
							testEl.doScroll("left");
						} catch (e) {
							return setTimeout(function () {
							ready(fn);
							}, 50);
						}
					fn();
				}();
			}:
			function (fn) {
				loaded ? fn() : fns.push(fn);
			});
	}();
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
(function ($) {
	'use strict';

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
			a =	 1732584193,
			b = -271733879,
			c = -1732584194,
			d =	 271733878;

		for (i = 0; i < x.length; i += 16) {
			olda = a;
			oldb = b;
			oldc = c;
			oldd = d;

			a = md5_ff(a, b, c, d, x[i],	   7, -680876936);
			d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
			d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
			d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

			a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
			d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i],	  20, -373897302);
			a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
			d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
			c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
			d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
			c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

			a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
			d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
			d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
			d = md5_hh(d, a, b, c, x[i],	  11, -358537222);
			c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

			a = md5_ii(a, b, c, d, x[i],	   6, -198630844);
			d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
			d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

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

	if (typeof define === 'function' && define.amd) {
		define(function () {
			return md5;
		});
	} else {
		$.md5 = md5;
	}
}(imgix));


// DOCS BELOW ARE AUTO GENERATED. DO NOT EDIT BY HAND




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
	Apply the "w" imgix param to the image url. Same as doing .setParam('w', val)
	@param val the value to set for w
	@name imgix.URL#setWidth
	@function
*/

/**
	Apply the "rot" imgix param to the image url. Same as doing .setParam('rot', val)
	@param val the value to set for rot
	@name imgix.URL#setRotate
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
	Apply the "dpr" imgix param to the image url. Same as doing .setParam('dpr', val)
	@param val the value to set for dpr
	@name imgix.URL#setDPR
	@function
*/

/**
	Apply the "hue" imgix param to the image url. Same as doing .setParam('hue', val)
	@param val the value to set for hue
	@name imgix.URL#setHue
	@function
*/

/**
	Apply the "sat" imgix param to the image url. Same as doing .setParam('sat', val)
	@param val the value to set for sat
	@name imgix.URL#setSaturation
	@function
*/

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
	Apply the "high" imgix param to the image url. Same as doing .setParam('high', val)
	@param val the value to set for high
	@name imgix.URL#setHighlight
	@function
*/

/**
	Apply the "shad" imgix param to the image url. Same as doing .setParam('shad', val)
	@param val the value to set for shad
	@name imgix.URL#setShadow
	@function
*/

/**
	Apply the "gam" imgix param to the image url. Same as doing .setParam('gam', val)
	@param val the value to set for gam
	@name imgix.URL#setGamma
	@function
*/

/**
	Apply the "vib" imgix param to the image url. Same as doing .setParam('vib', val)
	@param val the value to set for vib
	@name imgix.URL#setVibrance
	@function
*/

/**
	Apply the "sharp" imgix param to the image url. Same as doing .setParam('sharp', val)
	@param val the value to set for sharp
	@name imgix.URL#setSharpness
	@function
*/

/**
	Apply the "sepia" imgix param to the image url. Same as doing .setParam('sepia', val)
	@param val the value to set for sepia
	@name imgix.URL#setSepia
	@function
*/

/**
	Apply the "htn" imgix param to the image url. Same as doing .setParam('htn', val)
	@param val the value to set for htn
	@name imgix.URL#setHalftone
	@function
*/

/**
	Apply the "blur" imgix param to the image url. Same as doing .setParam('blur', val)
	@param val the value to set for blur
	@name imgix.URL#setBlur
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
	Apply the "blend" imgix param to the image url. Same as doing .setParam('blend', val)
	@param val the value to set for blend
	@name imgix.URL#setBlend
	@function
*/

/**
	Apply the "txt" imgix param to the image url. Same as doing .setParam('txt', val)
	@param val the value to set for txt
	@name imgix.URL#setText
	@function
*/

/**
	Apply the "txtfont" imgix param to the image url. Same as doing .setParam('txtfont', val)
	@param val the value to set for txtfont
	@name imgix.URL#setTextFont
	@function
*/

/**
	Apply the "txtsize" imgix param to the image url. Same as doing .setParam('txtsize', val)
	@param val the value to set for txtsize
	@name imgix.URL#setTextSize
	@function
*/

/**
	Apply the "txtclr" imgix param to the image url. Same as doing .setParam('txtclr', val)
	@param val the value to set for txtclr
	@name imgix.URL#setTextColor
	@function
*/

/**
	Apply the "txtalign" imgix param to the image url. Same as doing .setParam('txtalign', val)
	@param val the value to set for txtalign
	@name imgix.URL#setTextAlign
	@function
*/

/**
	Apply the "txtshad" imgix param to the image url. Same as doing .setParam('txtshad', val)
	@param val the value to set for txtshad
	@name imgix.URL#setTextShadow
	@function
*/

/**
	Apply the "txtpad" imgix param to the image url. Same as doing .setParam('txtpad', val)
	@param val the value to set for txtpad
	@name imgix.URL#setTextPad
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
	Apply the "txtfit" imgix param to the image url. Same as doing .setParam('txtfit', val)
	@param val the value to set for txtfit
	@name imgix.URL#setTextFit
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
	Apply the "mark" imgix param to the image url. Same as doing .setParam('mark', val)
	@param val the value to set for mark
	@name imgix.URL#setWatermark
	@function
*/

/**
	Apply the "markw" imgix param to the image url. Same as doing .setParam('markw', val)
	@param val the value to set for markw
	@name imgix.URL#setWatermarkWidth
	@function
*/

/**
	Apply the "markh" imgix param to the image url. Same as doing .setParam('markh', val)
	@param val the value to set for markh
	@name imgix.URL#setWatermarkHeight
	@function
*/

/**
	Apply the "markfit" imgix param to the image url. Same as doing .setParam('markfit', val)
	@param val the value to set for markfit
	@name imgix.URL#setWatermarkFit
	@function
*/

/**
	Apply the "markscale" imgix param to the image url. Same as doing .setParam('markscale', val)
	@param val the value to set for markscale
	@name imgix.URL#setWatermarkScale
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
	Apply the "markpad" imgix param to the image url. Same as doing .setParam('markpad', val)
	@param val the value to set for markpad
	@name imgix.URL#setWatermarkPadding
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
	Apply the "colors" imgix param to the image url. Same as doing .setParam('colors', val)
	@param val the value to set for colors
	@name imgix.URL#setPaletteColorNumber
	@function
*/

/**
	Apply the "auto" imgix param to the image url. Same as doing .setParam('auto', val)
	@param val the value to set for auto
	@name imgix.URL#setAuto
	@function
*/

/**
	Apply the "mask" imgix param to the image url. Same as doing .setParam('mask', val)
	@param val the value to set for mask
	@name imgix.URL#setMask
	@function
*/

/**
	Apply the "bg" imgix param to the image url. Same as doing .setParam('bg', val)
	@param val the value to set for bg
	@name imgix.URL#setBackground
	@function
*//**
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
	Get the value of the "w" imgix param currently on the image url. Same as doing .getParam('w')
	@name imgix.URL#getWidth
	@function
*/

/**
	Get the value of the "rot" imgix param currently on the image url. Same as doing .getParam('rot')
	@name imgix.URL#getRotate
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
	Get the value of the "dpr" imgix param currently on the image url. Same as doing .getParam('dpr')
	@name imgix.URL#getDPR
	@function
*/

/**
	Get the value of the "hue" imgix param currently on the image url. Same as doing .getParam('hue')
	@name imgix.URL#getHue
	@function
*/

/**
	Get the value of the "sat" imgix param currently on the image url. Same as doing .getParam('sat')
	@name imgix.URL#getSaturation
	@function
*/

/**
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
	Get the value of the "high" imgix param currently on the image url. Same as doing .getParam('high')
	@name imgix.URL#getHighlight
	@function
*/

/**
	Get the value of the "shad" imgix param currently on the image url. Same as doing .getParam('shad')
	@name imgix.URL#getShadow
	@function
*/

/**
	Get the value of the "gam" imgix param currently on the image url. Same as doing .getParam('gam')
	@name imgix.URL#getGamma
	@function
*/

/**
	Get the value of the "vib" imgix param currently on the image url. Same as doing .getParam('vib')
	@name imgix.URL#getVibrance
	@function
*/

/**
	Get the value of the "sharp" imgix param currently on the image url. Same as doing .getParam('sharp')
	@name imgix.URL#getSharpness
	@function
*/

/**
	Get the value of the "sepia" imgix param currently on the image url. Same as doing .getParam('sepia')
	@name imgix.URL#getSepia
	@function
*/

/**
	Get the value of the "htn" imgix param currently on the image url. Same as doing .getParam('htn')
	@name imgix.URL#getHalftone
	@function
*/

/**
	Get the value of the "blur" imgix param currently on the image url. Same as doing .getParam('blur')
	@name imgix.URL#getBlur
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
	Get the value of the "blend" imgix param currently on the image url. Same as doing .getParam('blend')
	@name imgix.URL#getBlend
	@function
*/

/**
	Get the value of the "txt" imgix param currently on the image url. Same as doing .getParam('txt')
	@name imgix.URL#getText
	@function
*/

/**
	Get the value of the "txtfont" imgix param currently on the image url. Same as doing .getParam('txtfont')
	@name imgix.URL#getTextFont
	@function
*/

/**
	Get the value of the "txtsize" imgix param currently on the image url. Same as doing .getParam('txtsize')
	@name imgix.URL#getTextSize
	@function
*/

/**
	Get the value of the "txtclr" imgix param currently on the image url. Same as doing .getParam('txtclr')
	@name imgix.URL#getTextColor
	@function
*/

/**
	Get the value of the "txtalign" imgix param currently on the image url. Same as doing .getParam('txtalign')
	@name imgix.URL#getTextAlign
	@function
*/

/**
	Get the value of the "txtshad" imgix param currently on the image url. Same as doing .getParam('txtshad')
	@name imgix.URL#getTextShadow
	@function
*/

/**
	Get the value of the "txtpad" imgix param currently on the image url. Same as doing .getParam('txtpad')
	@name imgix.URL#getTextPad
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
	Get the value of the "txtfit" imgix param currently on the image url. Same as doing .getParam('txtfit')
	@name imgix.URL#getTextFit
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
	Get the value of the "mark" imgix param currently on the image url. Same as doing .getParam('mark')
	@name imgix.URL#getWatermark
	@function
*/

/**
	Get the value of the "markw" imgix param currently on the image url. Same as doing .getParam('markw')
	@name imgix.URL#getWatermarkWidth
	@function
*/

/**
	Get the value of the "markh" imgix param currently on the image url. Same as doing .getParam('markh')
	@name imgix.URL#getWatermarkHeight
	@function
*/

/**
	Get the value of the "markfit" imgix param currently on the image url. Same as doing .getParam('markfit')
	@name imgix.URL#getWatermarkFit
	@function
*/

/**
	Get the value of the "markscale" imgix param currently on the image url. Same as doing .getParam('markscale')
	@name imgix.URL#getWatermarkScale
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
	Get the value of the "markpad" imgix param currently on the image url. Same as doing .getParam('markpad')
	@name imgix.URL#getWatermarkPadding
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
	Get the value of the "colors" imgix param currently on the image url. Same as doing .getParam('colors')
	@name imgix.URL#getPaletteColorNumber
	@function
*/

/**
	Get the value of the "auto" imgix param currently on the image url. Same as doing .getParam('auto')
	@name imgix.URL#getAuto
	@function
*/

/**
	Get the value of the "mask" imgix param currently on the image url. Same as doing .getParam('mask')
	@name imgix.URL#getMask
	@function
*/

/**
	Get the value of the "bg" imgix param currently on the image url. Same as doing .getParam('bg')
	@name imgix.URL#getBackground
	@function
*/
}).call(this);
