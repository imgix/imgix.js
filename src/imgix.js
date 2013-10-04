
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

	// TODO: paramGroups here too..
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

	/* 
		constructor for our imgix url object
		Usage:
		var i = new imgix.URL("http://static-a.imgix.net/macaw.png"); // if token is passed as second param then will auto-sign
		i.setSepia(50); // or any param
		i.getUrl();
	*/
	imgix.URL = function(url, token, isRj) {
		this.token = token || '';
		this.autoUpdateSel = null;
		this.isRj = !imgix.isDef(isRj) ? false : isRj;
		this.urlParts = this.isRj ? imgix.parseRjUrl(url) : imgix.parseUrl(url);
		// this.options = {
		// 	isRJ: false
		// };

		this.paramAliases = {};
	};

	imgix.createParamString = function() {
		return new imgix.URL('');
	}

	imgix.URL.prototype._handleAutoUpdate = function() {
		var self = this;
		function applyImg(el) {
			var elImg = el.src,
				elBaseUrl = elImg;

			if (elImg && elImg.indexOf('?') !== -1) {
				elBaseUrl = elImg.split('?')[0];
			}

			console.log([self.getBaseUrl(), elBaseUrl]);

			if (elBaseUrl && self.getQueryString()) {
				el.src = elBaseUrl + '?' + self.getQueryString();
			} else if (self.getBaseUrl()) {
				el.src = self.getUrl();
			} else {
				console.log('no params to apply');
			}
		}

		if (this.autoUpdateSel !== null) {
			var el = document.querySelectorAll(this.autoUpdateSel);
			if (el && el.length === 1) {
				applyImg(el[0]);
			} else {
				for (var i = 0; i < el.length; i++) {
					applyImg(el[i]);
				}
			}
		}
	};

	// takes css selector for an <img> element on the page
	// if url changes then it will auto re-set the src of the <img> element
	imgix.URL.prototype.autoUpdateImg = function(sel) {
		this.autoUpdateSel = sel;
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

	// TODO: handle public/private status of this -- won't handle aliases if set...
	// TODO: error check type...see validator TODO
	// TODO: raise error if param does not exist or can not convert type to expected type.
	imgix.URL.prototype.setParam = function(param, value, doOverride) {
		param = param.toLowerCase();

		if (typeof doOverride === "undefined") {
			doOverride = true;
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

		if (imgix.getDefaultParamValue(param) === value || !imgix.isDef(value) || value.length === 0) {
			this.removeParam(param);
			return;
		}

		if (this.urlParts.params.indexOf(param) === -1) {
			this.urlParts.params.push(param);
		}

		this.urlParts.paramValues[param] = String(value);

		this._handleAutoUpdate();
	};

	imgix.URL.prototype.getParam = function(param) {
		return this.urlParts.paramValues[param];
	};

	imgix.URL.prototype.getBaseUrl = function() {
		var url = this.getUrl();
		if (url.indexOf('?') !== -1) {
			return this.getUrl().split('?')[0];
		}
		return url;
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

	imgix.safe_btoa_decode =	function (str) {
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
