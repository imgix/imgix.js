"use strict";
// TODO: UNIT TESTS
// TODO: handle options...
// TODO: handle encoding...
// TODO: handle rentjuice-style signing too
// TODO: param validator/ranges...
// TODO:function setOption(option, value)

(function() {

	// Establish the root object, `window` in the browser, or `exports` on the server.
	var root = this;

	// The root namespace for all imgix client code. 
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

	imgix._setImgixClass = function(el) {
		var cls = imgix._getXPathClass(imgix._getElementTreeXPath(el));
		el.classList.add(cls);
		return cls;
	};

	imgix._getXPathClass = function(xpath) {
		xpath = !!xpath ? xpath: (new Date().getTime().toString());
		return 'imgix-el-' + imgix.md5(xpath);
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
			'markpad': 5
		}
	};

	imgix.getDefaultParamValue = function(param) {
		return imgix.getDefaultParamValues()[param];
	};

	imgix.getDefaultParams = function() {
		return Object.keys(imgix.getDefaultParamValues());
	};

	imgix.URL = function(url, imgParams, token, isRj) {
		this.token = token || '';
		this._autoUpdateSel = null;
		this._autoUpdateCallback = null;
		this.isRj = !imgix.isDef(isRj) ? false : isRj;
		this.urlParts = this.isRj ? imgix.parseRjUrl(url) : imgix.parseUrl(url);
		if (typeof imgParams === "object") {
			this.setParams(imgParams);
		}
		// this.options = {
		// 	isRJ: false
		// };

		this.paramAliases = {};
	};

	imgix.createParamString = function() {
		return new imgix.URL('');
	}

	imgix._updateVersion = {};

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

		function isImgEl(el) {
			return (el.tagName.toLowerCase() === 'img');
		}

		function isVersionFresh(v) {
			return curSel === self._autoUpdateSel && v === imgix._updateVersion[curSel];
		}

		function setImage(el, imgUrl) {
			if (!(imgUrl in imgToEls)) {
				imgToEls[imgUrl] = [];
				(function() {
					var img = document.createElement('img'),
						curV = imgix._updateVersion[curSel];

					img.src = imgUrl;
					img.onload = img.onerror = function() {
						if (!isVersionFresh(curV)) {
							console.log(curV + ' is an old version -- not updating');
							return;
						}

						for (var i = 0; i < imgToEls[imgUrl].length; i++) {
							_setImage(imgToEls[imgUrl][i], imgUrl);
							loadedImages++;

							if (typeof self._autoUpdateCallback === "function") {
								var cls = '.' + imgix._setImgixClass(imgToEls[imgUrl][i]);
								self._autoUpdateCallback(cls, loadedImages === totalImages);
							}
						}
					};
				})();
			}

			imgToEls[imgUrl].push(el);
		}

		function _setImage(el, imgUrl) {
			if (isImgEl(el)) {
				el.src = imgUrl;
			} else {
				var curBg = getBackgroundImg(el);
				if (curBg) {
					el.style.cssText = el.style.cssText.replace(curBg, imgUrl);
				} else {
					el.style.backgroundImage = 'url(' + imgUrl + ')';
				}
			}
		}

		function getRawBackgroundImg(el) {
			return el.style.cssText.match(/url\(([^\)]+)/);
		}

		function hasBackgroundImg(el) {
			return !!getRawBackgroundImg(el);
		}

		function getBackgroundImg(el) {
			var raw = getRawBackgroundImg(el);
			if (!raw) {
				return '';
			} else {
				return raw.length === 2 ? raw[1] : '';
			}
		}

		function getImageUrl(el) {
			if (isImgEl(el)) {
				return el.src;
			} else {
				return getBackgroundImg(el);
			}
		}

		function applyImg(el) {
			var elImg = getImageUrl(el),
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

	// takes css selector for an <img> element on the page
	// if url changes then it will auto re-set the src of the <img> element
	imgix.URL.prototype.autoUpdateImg = function(sel, callback) {
		this._autoUpdateSel = sel;
		this._autoUpdateCallback = callback;
		this._handleAutoUpdate();
	};

	imgix.URL.prototype.setUrl = function(url) {
		this.urlParts = this.isRj ? imgix.parseRjUrl(url) : imgix.parseUrl(url);
	};

	imgix.URL.prototype.getUrl = function() {
		var url = this.isRj ? imgix.buildRjUrl(this.urlParts) : imgix.buildUrl(this.urlParts);
		if (this.token) {
			return this.isRj ? imgix.signRjUrl(url, this.token) : imgix.signUrl(url, this.token);
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
		return this.urlParts.paramValues[param];
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
		'mark': '',
		'markw': '',
		'markh': '',
		'markfit': 'clip',
		'markscale': '',
		'markalign': 'bottom,right',
		'markalpha': 100,
		'markpad': 5
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
					result.params.push(tmp[0]);
				}
			}
		}

		return result;
	};

	imgix.buildUrl = function(parsed) {
		var result = parsed.protocol + '//' + parsed.host + parsed.pathname;
		if (parsed.params.length > 0) {
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
		return MD5_hexhash(d);
	};

	// MD5 stuff
	// Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
	// http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt
	var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db,
				  0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
				  0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1,
				  0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e,
				  0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51,
				  0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681,
				  0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87,
				  0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9,
				  0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
				  0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60,
				  0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085,
				  0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8,
				  0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7,
				  0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d,
				  0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314,
				  0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
				  0xeb86d391);

	var MD5_round1 = new Array(new Array( 0, 7, 1), new Array( 1,12, 2),
				   new Array( 2,17, 3), new Array( 3,22, 4),
				   new Array( 4, 7, 5), new Array( 5,12, 6),
				   new Array( 6,17, 7), new Array( 7,22, 8),
				   new Array( 8, 7, 9), new Array( 9,12,10),
				   new Array(10,17,11), new Array(11,22,12),
				   new Array(12, 7,13), new Array(13,12,14),
				   new Array(14,17,15), new Array(15,22,16));

	var MD5_round2 = new Array(new Array( 1, 5,17), new Array( 6, 9,18),
				   new Array(11,14,19), new Array( 0,20,20),
				   new Array( 5, 5,21), new Array(10, 9,22),
				   new Array(15,14,23), new Array( 4,20,24),
				   new Array( 9, 5,25), new Array(14, 9,26),
				   new Array( 3,14,27), new Array( 8,20,28),
				   new Array(13, 5,29), new Array( 2, 9,30),
				   new Array( 7,14,31), new Array(12,20,32));

	var MD5_round3 = new Array(new Array( 5, 4,33), new Array( 8,11,34),
				   new Array(11,16,35), new Array(14,23,36),
				   new Array( 1, 4,37), new Array( 4,11,38),
				   new Array( 7,16,39), new Array(10,23,40),
				   new Array(13, 4,41), new Array( 0,11,42),
				   new Array( 3,16,43), new Array( 6,23,44),
				   new Array( 9, 4,45), new Array(12,11,46),
				   new Array(15,16,47), new Array( 2,23,48));

	var MD5_round4 = new Array(new Array( 0, 6,49), new Array( 7,10,50),
				   new Array(14,15,51), new Array( 5,21,52),
				   new Array(12, 6,53), new Array( 3,10,54),
				   new Array(10,15,55), new Array( 1,21,56),
				   new Array( 8, 6,57), new Array(15,10,58),
				   new Array( 6,15,59), new Array(13,21,60),
				   new Array( 4, 6,61), new Array(11,10,62),
				   new Array( 2,15,63), new Array( 9,21,64));

	function MD5_F(x, y, z) { return (x & y) | (~x & z); }
	function MD5_G(x, y, z) { return (x & z) | (y & ~z); }
	function MD5_H(x, y, z) { return x ^ y ^ z;			 }
	function MD5_I(x, y, z) { return y ^ (x | ~z);		 }

	var MD5_round = new Array(new Array(MD5_F, MD5_round1),
				  new Array(MD5_G, MD5_round2),
				  new Array(MD5_H, MD5_round3),
				  new Array(MD5_I, MD5_round4));

	function MD5_pack(n32) {
	  return String.fromCharCode(n32 & 0xff) +
		 String.fromCharCode((n32 >>> 8) & 0xff) +
		 String.fromCharCode((n32 >>> 16) & 0xff) +
		 String.fromCharCode((n32 >>> 24) & 0xff);
	}

	function MD5_unpack(s4) {
		return  s4.charCodeAt(0)  |
		 (s4.charCodeAt(1) <<  8) |
		 (s4.charCodeAt(2) << 16) |
		 (s4.charCodeAt(3) << 24);
	}

	function MD5_number(n) {
	  while (n < 0)
		n += 4294967296;
	  while (n > 4294967295)
		n -= 4294967296;
	  return n;
	}

	function MD5_apply_round(x, s, f, abcd, r) {
	  var a, b, c, d;
	  var kk, ss, ii;
	  var t, u;

	  a = abcd[0];
	  b = abcd[1];
	  c = abcd[2];
	  d = abcd[3];
	  kk = r[0];
	  ss = r[1];
	  ii = r[2];

	  u = f(s[b], s[c], s[d]);
	  t = s[a] + u + x[kk] + MD5_T[ii];
	  t = MD5_number(t);
	  t = ((t<<ss) | (t>>>(32-ss)));
	  t += s[b];
	  s[a] = MD5_number(t);
	}

	function MD5_hash(data) {
	  var abcd, x, state, s;
	  var len, index, padLen, f, r;
	  var i, j, k;
	  var tmp;

	  state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
	  len = data.length;
	  index = len & 0x3f;
	  padLen = (index < 56) ? (56 - index) : (120 - index);
	  if(padLen > 0) {
		data += "\x80";
		for(i = 0; i < padLen - 1; i++)
		  data += "\x00";
	  }
	  data += MD5_pack(len * 8);
	  data += MD5_pack(0);
	  len  += padLen + 8;
	  abcd = new Array(0, 1, 2, 3);
	  x	   = new Array(16);
	  s	   = new Array(4);

	  for(k = 0; k < len; k += 64) {
		for(i = 0, j = k; i < 16; i++, j += 4) {
		  x[i] = data.charCodeAt(j) |
			(data.charCodeAt(j + 1) <<	8) |
			(data.charCodeAt(j + 2) << 16) |
			(data.charCodeAt(j + 3) << 24);
		}
		for(i = 0; i < 4; i++)
		  s[i] = state[i];
		for(i = 0; i < 4; i++) {
		  f = MD5_round[i][0];
		  r = MD5_round[i][1];
		  for(j = 0; j < 16; j++) {
		MD5_apply_round(x, s, f, abcd, r[j]);
		tmp = abcd[0];
		abcd[0] = abcd[3];
		abcd[3] = abcd[2];
		abcd[2] = abcd[1];
		abcd[1] = tmp;
		  }
		}

		for(i = 0; i < 4; i++) {
		  state[i] += s[i];
		  state[i] = MD5_number(state[i]);
		}
	  }

	  return MD5_pack(state[0]) +
		 MD5_pack(state[1]) +
		 MD5_pack(state[2]) +
		 MD5_pack(state[3]);
	}

	function MD5_hexhash(data) {
		var i, out, c;
		var bit128;

		bit128 = MD5_hash(data);
		out = "";
		for(i = 0; i < 16; i++) {
		c = bit128.charCodeAt(i);
		out += "0123456789abcdef".charAt((c>>4) & 0xf);
		out += "0123456789abcdef".charAt(c & 0xf);
		}
		return out;
	}

}).call(this);
