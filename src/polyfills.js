
	// Define and run polyfills first. Don't want/need these? grunt build --no-polyfills
	function initPolyfills() {

		// Object.freeze polyfill (pure pass through)
		if (!Object.freeze) {
			Object.freeze = function freeze(object) {
				return object;
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
	}

	if (typeof window !== 'undefined') {
		initPolyfills();
	}
