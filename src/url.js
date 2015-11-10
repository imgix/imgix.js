'use strict';

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
      imgix.helpers.warn('not enough colors to create a gradient');
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
  var DEFAULT_COLOR_COUNT = 10,
      paletteUrlObj = new imgix.URL(this.getUrl()),
      jsonUrl;

  function processPaletteData(data) {
    var colors = [],
        i,
        rgb;

    if (!data || !data.colors) {
      return undefined;
    }

    for (i = 0; i < data.colors.length; i++) {
      rgb = [
        Math.round(data.colors[i].red * 255),
        Math.round(data.colors[i].green * 255),
        Math.round(data.colors[i].blue * 255),
      ];

      colors.push('rgb(' + rgb.join(', ') + ')');
    }

    return colors;
  }

  function requestPaletteData() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      var data;

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          data = JSON.parse(xhr.response);
        } else {
          data = {
              colors: [{
                  red: 1,
                  green: 1,
                  blue: 1
                }]
              };
        }

        cssColorCache[jsonUrl] = processPaletteData(data);

        callback(cssColorCache[jsonUrl]);
      }
    };

    xhr.open('get', jsonUrl, true);
    xhr.send();
  }

  // Wrangle the arguments, if only one is provided
  if (typeof num === 'function') {
    if (typeof callback === 'number') {
      var tmpNum = callback;
      callback = num;
      num = tmpNum;
    } else {
      callback = num;
      num = DEFAULT_COLOR_COUNT;
    }
  }

  // Set parameters, then get a URL for an AJAX request
  paletteUrlObj.setParams({
    palette: 'json',
    colors: num
  });
  jsonUrl = paletteUrlObj.getUrl();

  // Return the cached colors, if available
  if (cssColorCache.hasOwnProperty(jsonUrl)) {
    if (callback) {
      callback(cssColorCache[jsonUrl]);
    }

  // If no cache is available, do it the hard way
  } else {
    requestPaletteData();
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
        var img = new Image(),
          curV = imgix.updateVersion[curSel],
          startTime = (new Date()).getTime();

        img.onload = img.onerror = function () {
          if (!isVersionFresh(curV)) {
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
        if (el.hasAttribute('crossorigin')) {
          img.setAttribute('crossorigin', el.getAttribute('crossorigin'));
        }

        img.src = imgUrl;
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
    imgix.helpers.warn('setParams warning: dictionary of imgix params expectd. imgix URL instance passed instead');
    return;
  }
  for (var k in dict) {
    if (dict.hasOwnProperty(k)) {
      this.setParam(k, dict[k], doOverride, true);
    }
  }

  this._handleAutoUpdate();
};

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

  if (!doOverride && this.urlParts.paramValues[param]) {
    // we are not overriding because they didn't want to
    return this;
  }

  if (!imgix.isDef(value) || value === null || value.length === 0) {
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
  var result = parsed.protocol + '://' + parsed.host;

  if (parsed.port !== null && parsed.port !== '80' && parsed.port !== '443') {
    result += ':' + parsed.port;
  }
  result += parsed.pathname;

  // Add version string to this URL
  imgix.versionifyUrl(parsed);

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

imgix.versionifyUrl = function (target) {
  var versionParam = 'ixjsv',
      splitUrl,
      result;

  if (typeof target === 'string') {
    return imgix.versionifyStringUrl(target);
  } else {
    return imgix.versionifyParsedUrl(target);
  }
};

imgix.versionifyStringUrl = function (url) {
  var versionParam = 'ixjsv',
      splitUrl,
      result;

  splitUrl = url.split('?');
  result = splitUrl[0] + '?' + versionParam + '=' + imgix.version;

  if (!!splitUrl[1]) {
    result += '&' + splitUrl[1];
  }

  return result;
}

imgix.versionifyParsedUrl = function (parsed) {
  var versionParam = 'ixjsv';

  if (!parsed.paramValues[versionParam]) {
    parsed.params.push(versionParam);
  }
  parsed.paramValues[versionParam] = imgix.version;

  return parsed;
};
