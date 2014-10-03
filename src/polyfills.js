
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
