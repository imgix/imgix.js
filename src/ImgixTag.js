var util = require('./util.js'),
  targetWidths = require('./targetWidths.js'),
  autoSize = require('./autoSize');

var ImgixTag = (function () {
  function ImgixTag(el, opts) {
    this.el = el;
    this.settings = opts || {};

    if (!this.el) {
      console.warn('ImgixTag must be passed a DOM element.');
      return;
    }

    this.window = this.settings.window ? this.settings.window : null;

    if (this.el.hasAttribute('ix-initialized') && !this.settings.force) {
      return;
    }

    this.ixPathVal = el.getAttribute(this.settings.pathInputAttribute);
    this.ixParamsVal = el.getAttribute(this.settings.paramsInputAttribute);
    this.ixSrcVal = el.getAttribute(this.settings.srcInputAttribute);
    this.ixHostVal =
      el.getAttribute(this.settings.hostInputAttribute) || this.settings.host;

    if (this.ixPathVal && !this.ixHostVal) {
      console.warn(
        'You must set a value for `imgix.config.host` or specify an `ix-host` attribute to use `ix-path` and `ix-params`.'
      );
      return;
    }

    if (typeof this.ixPathVal === 'string' && this.ixPathVal.length == 0) {
      console.warn('`ix-path` cannot accept a value of empty string ""');
      return;
    }

    if (typeof this.ixSrcVal === 'string' && this.ixSrcVal.length == 0) {
      console.warn('`ix-src` cannot accept a value of empty string ""');
      return;
    }

    this.baseParams = this._extractBaseParams();
    this.baseUrl = this._buildBaseUrl();
    this.baseUrlWithoutQuery = this.baseUrl.split('?')[0];

    if (util.isString(this.settings.sizesAttribute)) {
      this.el.setAttribute(this.settings.sizesAttribute, this.sizes());
    }

    if (util.isString(this.settings.srcsetAttribute)) {
      this.el.setAttribute(this.settings.srcsetAttribute, this.srcset());
    }

    if (
      util.isString(this.settings.srcAttribute) &&
      this.el.nodeName == 'IMG'
    ) {
      this.el.setAttribute(this.settings.srcAttribute, this.src());
    }

    this.el.setAttribute('ix-initialized', 'ix-initialized');
  }

  ImgixTag.prototype._extractBaseParams = function () {
    var params = {};

    if (
      this.settings.defaultParams &&
      typeof this.settings.defaultParams === 'object' &&
      this.settings.defaultParams !== null
    ) {
      params = Object.assign({}, this.settings.defaultParams);
    }

    if (this.ixPathVal) {
      params = Object.assign({}, params, JSON.parse(this.ixParamsVal) || {});

      // Encode any passed Base64 variant params
      for (var key in params) {
        if (key.substr(-2) === '64') {
          params[key] = util.encode64(params[key]);
        }
      }
    } else {
      // If the user used `ix-src`, we have to extract the base params
      // from that string URL.
      var lastQuestion = this.ixSrcVal.lastIndexOf('?');

      if (lastQuestion > -1) {
        var paramString = this.ixSrcVal.substr(lastQuestion + 1),
          splitParams = paramString.split('&');

        for (var i = 0, splitParam; i < splitParams.length; i++) {
          splitParam = splitParams[i].split('=');

          params[splitParam[0]] = splitParam[1];
        }
      }
    }

    if (this.settings.includeLibraryParam) {
      params.ixlib = 'imgixjs-' + imgix.VERSION;
    }

    return params;
  };

  ImgixTag.prototype._buildBaseUrl = function () {
    if (this.ixSrcVal) {
      return this.ixSrcVal;
    }

    var path = this.ixPathVal,
      protocol = this.settings.useHttps ? 'https' : 'http',
      url = protocol + '://' + this.ixHostVal,
      hostEndsWithSlash = this.ixHostVal.substr(-1) === '/',
      pathStartsWithSlash = path[0] === '/';

    // Make sure we don't end up with 2 or 0 slashes between
    // the host and path portions of the generated URL
    if (hostEndsWithSlash && pathStartsWithSlash) {
      url += path.substr(1);
    } else if (!hostEndsWithSlash && !pathStartsWithSlash) {
      url += '/' + path;
    } else {
      url += path;
    }

    url += '?';
    var params = [],
      param;
    for (var key in this.baseParams) {
      param = this.baseParams[key];
      if (param == null) {
        continue;
      }

      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(param));
    }

    url += params.join('&');

    return url;
  };

  ImgixTag.prototype._buildSrcsetPair = function (targetWidth) {
    var clonedParams = util.shallowClone(this.baseParams);
    clonedParams.w = targetWidth;

    if (this.baseParams.w != null && this.baseParams.h != null) {
      clonedParams.h = Math.round(
        targetWidth * (this.baseParams.h / this.baseParams.w)
      );
    }

    var url = this.baseUrlWithoutQuery + '?',
      val,
      params = [];
    for (var key in clonedParams) {
      val = clonedParams[key];
      params.push(key + '=' + val);
    }

    url += params.join('&');

    return url + ' ' + targetWidth + 'w';
  };

  ImgixTag.prototype.src = function () {
    return this.baseUrl;
  };

  // Returns a comma-separated list of `url widthDescriptor` pairs,
  // scaled appropriately to the same aspect ratio as the base image
  // as appropriate.
  ImgixTag.prototype.srcset = function () {
    var pairs = [];

    for (var i = 0; i < targetWidths.length; i++) {
      pairs.push(this._buildSrcsetPair(targetWidths[i]));
    }

    return pairs.join(', ');
  };

  ImgixTag.prototype.sizes = function () {
    var existingSizes = this.el.getAttribute('sizes');
    var ixSizes = this.el.getAttribute('ix-sizes');
    const el = this.el;
    const _window = this.window;

    /**
     *
     * The conditionals bellow decide when to override the value for `sizes` for
     * the given element.
     *
     * - If `sizes` set, we leave the value as is even if `ix-sizes` is `auto`
     * - If `sizes` not set and `ix-sizes` not auto, set `sizes` to `ix-sizes`
     * - If `sizes` not set and `ix-sizes` is auto, set `sizes` automatically
     * - If `sizes` and `ix-sizes` not set, set `sizes` to browser default
     */

    if (existingSizes == null && ixSizes !== 'auto') {
      return ixSizes ? ixSizes : '100vw';
    } else if (existingSizes == null && ixSizes === 'auto') {
      return autoSize.updateOnResize({ el, existingSizes, ixSizes, _window });
    } else {
      return existingSizes ? existingSizes : '100vw';
    }
  };

  return ImgixTag;
})();

module.exports = ImgixTag;
