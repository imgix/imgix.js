"use strict";

// TODO: promote some of the private functions to public...
// TODO: jsdoc
// TODO: README for installing dev, running tests, etc.
// TODO: handle options... as obj
// TODO: handle encoding...

// TODO: handle rentjuice-style signing too
// TODO: param validator/ranges...
// TODO:function setOption(option, value)

(function() {

	// Establish the root object, `window` in the browser, or `exports` on the server.
	var root = this;

	/**
	 * The root namespace for all imgix client code. 
	 * @namespace imgix
	 */
	var imgix = {};

	// expose imgix to browser or node
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}
		exports.imgix = imgix;
	} else {
		root.imgix = imgix;
	}

	var config = {
		isDocMarked: null,
	},
		IMGIX_USABLE = 'imgix-usable';

	// TODO: promote some of these private methods _* to public

	/**
	 * Get html element by XPath
	 * @memberof imgix
	 * @static
	 * @private
	 * @param {string} xpath the xpath of the element
	 * @returns {Element} element with the xpath
	 */
	imgix._getElementByXPath = function(xpath) {
		return document.querySelector('.' + imgix._getXPathClass(xpath));
	};


	/**
	 * Get html element by XPath
	 * @memberof imgix
	 * @static
	 * @private
	 * @param {string} xpath the xpath of the element to get
	 * @returns {Element} element with the xpath
	 */
	imgix._getElementImageByXPath = function(xpath) {
		return imgix._getElementImage(imgix._getElementByXPath(xpath));
	};

	/**
	 * Reports if an element is an image tag
	 * @memberof imgix
	 * @static
	 * @private
	 * @param {Element} el the element to check
	 * @returns {boolean} true if the element is an img tag
	 */
	imgix._isImageElement = function(el) {
		return (el && el.tagName.toLowerCase() === 'img');
	};

	imgix._setElementImageAfterLoad = function(el, imgUrl, callback) {
		var img = new Image();
		img.src = imgUrl;
		img.onload = function() {
			imgix._setElementImage(el, imgUrl);
			if (typeof callback === "function") {
				callback();
			}
		};
	};

	imgix._setElementImage = function(el, imgUrl) {
		if (!el) {
			return false;
		}

		if (imgix._isImageElement(el)) {
			el.src = imgUrl;
			return true;
		} else {
			var curBg = imgix._getBackgroundImage(el);
			if (curBg) {
				el.style.cssText = el.style.cssText.replace(curBg, imgUrl);
				return true;
			} else {
				el.style.backgroundImage = 'url(' + imgUrl + ')';
				return true;
			}
		}

		return false
	};

	imgix._getEmptyImage = function() {
		return 'https://assets.imgix.net/pixel.gif';
	};

	imgix._getElementImage = function(el) {
		if (imgix._isImageElement(el)) {
			return el.src;
		} else {
			return imgix._getBackgroundImage(el);
		}
	};

	imgix._getRawBackgroundImage = function(el) {
		return el.style.cssText.match(/url\(([^\)]+)/);
	};

	imgix._getBackgroundImage = function(el) {
		var raw = imgix._getRawBackgroundImage(el);
		if (!raw) {
			return '';
		} else {
			return raw.length === 2 ? raw[1] : '';
		}
	}

	//////////////////////////////////////////////////

	imgix.getImages = function() {
		imgix._scanDocument();

		return document.querySelectorAll("." + IMGIX_USABLE);
	}

	imgix.hasImage = function(el) {
		return el && (el.tagName.toLowerCase() === 'img' ||
			el.style.cssText.indexOf('background-image') !== -1);
	};

	imgix._scanDocument = function() {
		var all = document.getElementsByTagName("*");
		for (var i=0, max=all.length; i < max; i++) {
			if (imgix.hasImage(all[i])) {
				imgix._setImgixClass(all[i]);
			}
		}
	};

	imgix._hasClass = function(elem, name) {
		return (" " + elem.className + " ").indexOf(" " + name + " ") > -1;//jquery
	}

	imgix._setImgixClass = function(el) {
		if (imgix._hasClass(el, IMGIX_USABLE)) {
			return imgix._getImgixClass(el);
		}

		var cls = imgix._getXPathClass(imgix._getElementTreeXPath(el));

		el.classList.add(cls);
		el.classList.add(IMGIX_USABLE);
		return cls;
	};

	imgix._getImgixClass = function(el) {
		if (imgix._hasClass(el, IMGIX_USABLE)) {
			return el.className.match(/imgix-el-[^\s]+/)[0];
		}
	}

	imgix._getXPathClass = function(xpath) {
		xpath = !!xpath ? xpath: (new Date().getTime().toString());
		return 'imgix-el-' + imgix.md5(xpath);
	};

	imgix._rgbToHex = function(value) {
		var parts = value.split(","),
			parts = parts.map(function(a) {
				return imgix._componentToHex(parseInt(a.replace(/\D/g, '')));
			});

		return value = parts.join('');
	};

	imgix._componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};

		// Current: https://github.com/firebug/firebug/blob/5026362f2d1734adfcc4b44d5413065c50b27400/extension/content/firebug/lib/xpath.js
	imgix._getElementTreeXPath = function(element) {
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

	imgix.getFonts = function() {
		return Object.keys(imgix.getFontLookup());
	};

	imgix.searchFonts = function(needle) {
		needle = needle.toLowerCase();
		return imgix.getFonts().filter(function(i) { return i.toLowerCase().indexOf(needle) !== -1 });
	}

	imgix.isFontAvailable = function(font) {
		return imgix.isDef(imgix.getFontLookup()[font]);
	}

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
				'colorize': 'col',
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
			'col': '',
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
		}
	};

	imgix.getDefaultParamValue = function(param) {
		return imgix.getDefaultParamValues()[param];
	};

	imgix.getDefaultParams = function() {
		return Object.keys(imgix.getDefaultParamValues());
	};

	imgix._makeCssClass = function(url) {
		return "tmp_" + imgix.md5(url);
	};

	imgix._injectStyleSheet = function(url) {
		var ss = document.createElement("link");
		ss.type = "text/css";
		ss.rel = "stylesheet";
		ss.href = url;

		document.getElementsByTagName("head")[0].appendChild(ss);
	};

	imgix._findInjectedStyleSheet = function(url) {
		if (document.styleSheets) {
			for (var i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].href === url) {
					return true;
				}
			}
		}

		return false;
	};

	imgix._getElementImageSize = function(el) {
		var w = 0,
			h = 0;

		if (imgix._isImageElement(el)) {
			w = el.naturalWidth;
			h = el.naturalHeight;
		} else {
			w = imgix._extractInt(imgix._getCssProperty(el, "width"));
			h = imgix._extractInt(imgix._getCssProperty(el, "height"));
		}

		return {
			width: w,
			height: h
		};
	};

	imgix._extractInt = function(str) {
		if (str === undefined) {
			return 0;
		} else if (typeof str === "number") {
			return str;
		}
		return parseInt(str.replace(/\D/g, ''), 10) || 0;
	};

	imgix._getCssPropertyById = function(elmId, property) {
		var elem = document.getElementById(elmId);
		return window.getComputedStyle(elem,null).getPropertyValue(property);
	};

	imgix._getCssProperty = function(el, property) {
		return window.getComputedStyle(el, null).getPropertyValue(property);
	};

	/**
	 * Represents an imgix url
	 * @memberof imgix
	 * @constructor
	 * @class
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

	imgix.createParamString = function() {
		return new imgix.URL('');
	};

	imgix._updateVersion = {};

	var cssColorCache = {};
	/**
	 * Get an array of the colors in the image
	 * @memberof imgix
	 * @param {number} num Desired number of colors
	 * @param {colorsCallback} callback handles the response of colors
	 */
	imgix.URL.prototype.getColors = function(num, callback) {
		var clone = new imgix.URL(this.getUrl()),
			resultColors = [],
			paletteClass = imgix._makeCssClass(this.getUrl());

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

		imgix._injectStyleSheet(cssUrl);

		var lookForLoadedCss = function() {
			if (!imgix._findInjectedStyleSheet(cssUrl)) {
				setTimeout(lookForLoadedCss, 100);
			} else {
				var lastColor = null,
					whileLimit = 1000;

				setTimeout(function() {
					var promises = [],
						maxTries = 100;

					for (var i = 1; i <= num; i++) {

						(function(i) {
							var tmps = document.createElement("span");
							tmps.id = paletteClass + '-' + i;
							tmps.className = paletteClass + '-fg-' + i
							document.body.appendChild(tmps);

							promises.push(
								new ImgixPromise(function (resolve, reject) {
									var attempts = 0;
									var checkLoaded = function() {
										var c = imgix._getCssPropertyById(tmps.id, 'color');
										if (c != lastColor) {
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

					ImgixPromise.all(promises).then(function(values) {
						var resultColors = [];

						values = values.sort(function(a, b) {
							return a.num - b.num;
						});

						for (var x = 0; x < values.length; x++) {
							resultColors.push(values[x].color);
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
	 * This callback has the colors...
	 * @callback colorsCallback
	 * @param {array} colors an array of colors
	 */

	imgix.URL.prototype._handleAutoUpdate = function() {
		var self = this,
			totalImages = 0,
			loadedImages = 0,
			curSel = this._autoUpdateSel,
			imgToEls = {};

		if (!imgix.isDef(imgix._updateVersion[curSel])) {
			imgix._updateVersion[curSel] = 1;
		} else {
			imgix._updateVersion[curSel]++;
		}


		function isVersionFresh(v) {
			return curSel === self._autoUpdateSel && v === imgix._updateVersion[curSel];
		}

		function setImage(el, imgUrl) {
			if (!(imgUrl in imgToEls)) {
				imgToEls[imgUrl] = [];
				(function() {
					var img = document.createElement('img'),
						curV = imgix._updateVersion[curSel],
						startTime = (new Date()).getTime();

					img.src = imgUrl;
					img.onload = img.onerror = function() {
						if (!isVersionFresh(curV)) {
							//console.log(curV + ' is an old version -- not updating');
							return;
						}

						for (var i = 0; i < imgToEls[imgUrl].length; i++) {
							imgix._setElementImage(imgToEls[imgUrl][i], imgUrl);
							loadedImages++;

							if (typeof self._autoUpdateCallback === "function") {
								var cls = '.' + imgix._setImgixClass(imgToEls[imgUrl][i]),
									obj = {
										element: document.querySelector(cls),
										className: cls, // string class '.imgix-el-{md5}'
										isComplete: loadedImages === totalImages, // boolean
										percentComplete: (loadedImages / totalImages) * 100, // float
										totalComplete: loadedImages, // int
										loadTime: (new Date()).getTime() - startTime,
										total: totalImages // int
									};
								//self._autoUpdateCallback(cls, loadedImages === totalImages);
								self._autoUpdateCallback(obj);
							}
						}
					};
				})();
			}

			imgToEls[imgUrl].push(el);
		}

		function applyImg(el) {
			var elImg = imgix._getElementImage(el),
				elBaseUrl = elImg;

			if (elImg && elImg.indexOf('?') !== -1) {
				elBaseUrl = elImg.split('?')[0];
			}


			if (self.getBaseUrl()) {
				//console.log('set style 1');
				setImage(el, self.getUrl());
			} else if (elBaseUrl && self.getQueryString()) {
				//console.log('set style 2');
				setImage(el, elBaseUrl + '?' + self.getQueryString());
			} else {
				//console.log('no params to apply');
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
			url = imgix._getEmptyImage();
		}
		this.urlParts = this.isRj ? imgix.parseRjUrl(url) : imgix.parseUrl(url);
	};

	imgix.URL.prototype.setURL = function(url) {
		return this.setUrl(url);
	};

	imgix.URL.prototype.getURL = function() {
		return this.getUrl();
	};

	/**
	 * The generated imgix image url
	 * @memberof imgix
	 * @returns {string} the url
	 */
	imgix.URL.prototype.getUrl = function() {
		var url = this.isRj ? imgix.buildRjUrl(this.urlParts) : imgix.buildUrl(this.urlParts);
		if (this.token) {
			return this.isRj ? imgix.signRjUrl(url, this.token) : imgix.signUrl(url, this.token);
		}

		if (!url || url.length === 0) {
			return imgix._getEmptyImage();
		}

		return url;
	};

	imgix.URL.prototype.removeParam = function(param) {
		if (this.urlParts.paramValues.hasOwnProperty(param)) {
			delete this.urlParts.paramValues[param];
			this.urlParts.params = Object.keys(this.urlParts.paramValues);
		};
	};

	imgix.URL.prototype.clearThenSetParams = function(params) {
		this.clearParams(false); //do not trigger update yet
		this.setParams(params);
	};

	imgix.URL.prototype.clearParams = function(runUpdate) {
		runUpdate = !imgix.isDef(runUpdate) ? true : runUpdate;

		for (var k in this.urlParts.paramValues) {
			this.removeParam(k)
		}

		if (runUpdate) {
			this._handleAutoUpdate();
		}
	};

	imgix.URL.prototype.setParams = function(dict, doOverride) {
		for (var k in dict) {
			this.setParam(k, dict[k], doOverride, true);
		}

		this._handleAutoUpdate();
	};

	// TODO: handle public/private status of this -- won't handle aliases if set...
	// TODO: error check type...see validator TODO
	// TODO: raise error if param does not exist or can not convert type to expected type.
	imgix.URL.prototype.setParam = function(param, value, doOverride, noUpdate) {
		param = param.toLowerCase();

		doOverride = !imgix.isDef(doOverride) ? true : doOverride;
		noUpdate = !imgix.isDef(noUpdate) ? false : noUpdate;

		if (param === 'mark' || param === 'mask') {
			// if not encoded then decode...
			if (decodeURIComponent(value) === value) {
				value = encodeURIComponent(value);
			}
		} else if (param === 'col' || param === 'colorize' || param === 'blend') {
			if (value.slice(0, 3) === 'rgb') {
				value = imgix._rgbToHex(value);
			}
		}

		// console.log("setting " + param + " to " + value);
		// TODO: handle aliases -- only need on build?
		if (imgix.getDefaultParams().indexOf(param) === -1) {
			console.warn("\"" + param + "\" is an invalid imgix param");
			return;
		}

		if (!doOverride && this.urlParts.paramValues[param]) {
			// we are not overriding because they didn't want to
			return;
		}

		if (param === 'txtfont' && imgix.isDef(imgix.isFontAvailable(value))) {
			value = imgix.getFontLookup()[value];
		}

		if (imgix.getDefaultParamValue(param) === value || !imgix.isDef(value) || value.length === 0) {
			this.removeParam(param);
			return;
		}

		if (this.urlParts.params.indexOf(param) === -1) {
			this.urlParts.params.push(param);
		}

		this.urlParts.paramValues[param] = String(value);

		if (!noUpdate) {
			this._handleAutoUpdate();
		}
	};

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

	imgix.URL.prototype.getParams = function(param) {
		if (this.urlParts.paramValues) {
			return this.urlParts.paramValues;
		}

		return {};
	};

	imgix.URL.prototype.getBaseUrl = function() {
		var url = this.getUrl();
		if (url.indexOf('?') !== -1) {
			url = this.getUrl().split('?')[0];
		}

		return url != window.location.href ? url : '';
	};

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
		"col": "Colorize",
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

	// Dynamically create our param getter and setters
	for (var param in imgix.URL.theGetSetFuncs) {
		(function() {
			var tmp = param;
			imgix.URL.prototype['set' + imgix.URL.theGetSetFuncs[tmp]] = function(v, doOverride) { this.setParam(tmp, v, doOverride); };
			imgix.URL.prototype['get' + imgix.URL.theGetSetFuncs[tmp]] = function(v) { return this.getParam(tmp); };
		})();
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
		var keys = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'],
			result = {},
			// https://gist.github.com/jlong/2428561
			parser = document.createElement('a');

		parser.href = url;

		// create clean object to return
		for (var i = 0; i < keys.length; i++) {
			result[keys[i]] = parser[keys[i]];
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
		var result = parsed.protocol + '//' + parsed.host + parsed.pathname;
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
				sig = imgix.md5(token + parts.pathname + parts.search);

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
	}

	imgix.md5 = function(d) {
		return md5(d);
	};

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
	}(this));

	// start promise
	/** license MIT-promiscuous-©Ruben Verborgh*/
	(function (func, obj, root) {
		// Type checking utility function
		function is(type, item) { return (typeof item)[0] == type; }

		// Creates a promise, calling callback(resolve, reject), ignoring other parameters.
		function ImgixPromise(callback, handler) {
		// The `handler` variable points to the function that will
		// 1) handle a .then(resolved, rejected) call
		// 2) handle a resolve or reject call (if the first argument === `is`)
		// Before 2), `handler` holds a queue of callbacks.
		// After 2), `handler` is a finalized .then handler.
		handler = function pendingHandler(resolved, rejected, value, queue, then, i) {
			queue = pendingHandler.q;

			// Case 1) handle a .then(resolved, rejected) call
			if (resolved != is) {
			return ImgixPromise(function (resolve, reject) {
				queue.push({ p: this, r: resolve, j: reject, 1: resolved, 0: rejected });
			});
			}

			// Case 2) handle a resolve or reject call
			// (`resolved` === `is` acts as a sentinel)
			// The actual function signature is
			// .re[ject|solve](<is>, success, value)

			// Check if the value is a promise and try to obtain its `then` method
			if (value && (is(func, value) | is(obj, value))) {
			try { then = value.then; }
			catch (reason) { rejected = 0; value = reason; }
			}
			// If the value is a promise, take over its state
			if (is(func, then)) {
				var valueHandler = function(resolved) {
					return function (value) { then && (then = 0, pendingHandler(is, resolved, value)); };
				}
				try { then.call(value, valueHandler(1), rejected = valueHandler(0)); }
				catch (reason) { rejected(reason); }
			}
			// The value is not a promise; handle resolve/reject
			else {
			// Replace this handler with a finalized resolved/rejected handler
			handler = function (Resolved, Rejected) {
				// If the Resolved or Rejected parameter is not a function,
				// return the original promise (now stored in the `callback` variable)
				if (!is(func, (Resolved = rejected ? Resolved : Rejected)))
				return callback;
				// Otherwise, return a finalized promise, transforming the value with the function
				return ImgixPromise(function (resolve, reject) { finalize(this, resolve, reject, value, Resolved); });
			};
			// Resolve/reject pending callbacks
			i = 0;
			while (i < queue.length) {
				then = queue[i++];
				// If no callback, just resolve/reject the promise
				if (!is(func, resolved = then[rejected]))
				(rejected ? then.r : then.j)(value);
				// Otherwise, resolve/reject the promise with the result of the callback
				else
				finalize(then.p, then.r, then.j, value, resolved);
			}
			}
		};
		// The queue of pending callbacks; garbage-collected when handler is resolved/rejected
		handler.q = [];

		// Create and return the promise (reusing the callback variable)
		callback.call(callback = { then:	function (resolved, rejected) { return handler(resolved, rejected); },
									 catch: function (rejected)			{ return handler(0,			 rejected); } },
						function (value)	{ handler(is, 1,	value); },
						function (reason) { handler(is, 0, reason); });
		return callback;
		}

		// Finalizes the promise by resolving/rejecting it with the transformed value
		function finalize(promise, resolve, reject, value, transform) {
			window.setTimeout(function () {
				try {
				// Transform the value through and check whether it's a promise
				value = transform(value);
				transform = value && (is(obj, value) | is(func, value)) && value.then;
				// Return the result if it's not a promise
				if (!is(func, transform))
					resolve(value);
				// If it's a promise, make sure it's not circular
				else if (value == promise)
					reject(TypeError());
				// Take over the promise's state
				else
					transform.call(value, resolve, reject);
				}
				catch (error) { reject(error); }
			}, 0);
		}

		// Creates a resolved promise
		ImgixPromise.resolve = ResolvedImgixPromise;
		function ResolvedImgixPromise(value) { return ImgixPromise(function (resolve) { resolve(value); }); }

		// Creates a rejected promise
		ImgixPromise.reject = function (reason) { return ImgixPromise(function (resolve, reject) { reject(reason); }); };

		// Transforms an array of promises into a promise for an array
		ImgixPromise.all = function (promises) {
			return ImgixPromise(function (resolve, reject, count, values) {
				// Array of collected values
				values = [];
				// Resolve immediately if there are no promises
				count = promises.length || resolve(values);
				// Transform all elements (`map` is shorter than `forEach`)
				promises.map(function (promise, index) {
				ResolvedImgixPromise(promise).then(
					// Store the value and resolve if it was the last
					function (value) {
					values[index] = value;
					--count || resolve(values);
					},
					// Reject if one element fails
					reject);
				});
			});
		};


	if (typeof exports !== 'undefined') {
		exports.ImgixPromise = ImgixPromise;
	} else {
		window.ImgixPromise = ImgixPromise;
	}
	})('f', 'o', this);


}).call(this);
