var util = require('./util.js'),
    targetWidths = require('./targetWidths.js');

var ImgixTag = (function() {
  function ImgixTag(el, opts) {
    this.el = el;
    this.settings = opts || {};

    if (!this.el) {
      throw new Error('ImgixTag must be passed a DOM element.');
    }

    if (this.el.hasAttribute('ix-initialized') && !this.settings.force) {
      return;
    }

    this.ixPathVal = el.getAttribute('ix-path');
    this.ixParamsVal = el.getAttribute('ix-params');
    this.ixSrcVal = el.getAttribute('ix-src');
    this.ixHostVal = el.getAttribute('ix-host') || imgix.config.host;

    if (this.ixPathVal && !this.ixHostVal) {
      throw new Error('You must set a value for `imgix.config.host` or specify an `ix-host` attribute to use `ix-path` and `ix-params`.');
    }

    this.baseParams = this._extractBaseParams();
    this.baseUrl = this._buildBaseUrl();
    this.baseUrlWithoutQuery = this.baseUrl.split('?')[0];

    this.el.setAttribute('sizes', this.sizes());
    this.el.setAttribute('srcset', this.srcset());

    if (this.el.nodeName == 'IMG') {
      this.el.setAttribute('src', this.src());
    }

    this.el.setAttribute('ix-initialized', 'ix-initialized');
  }

  ImgixTag.prototype._extractBaseParams = function() {
    var params;

    if (this.ixPathVal) {
      params = JSON.parse(this.ixParamsVal) || {};
    } else {
      // If the user used `ix-src`, we have to extract the base params
      // from that string URL.
      var lastQuestion = this.ixSrcVal.lastIndexOf('?'),
          paramString = this.ixSrcVal.substr(lastQuestion + 1),
          splitParams = paramString.split('&');

      params = {};
      for (var i = 0, splitParam; i < splitParams.length; i++) {
        splitParam = splitParams[i].split('=');

        params[splitParam[0]] = splitParam[1];
      }

      // Encode any passed Base64 variant params
      for (var key in params) {
        if (key.substr(-2) === '64') {
          params[key] = util.encode64(params[key]);
        }
      }
    }

    return params;
  };

  ImgixTag.prototype._buildBaseUrl = function() {
    if (this.ixSrcVal) {
      return this.ixSrcVal;
    } else {
      var path = this.ixPathVal,
          protocol = 'http';
      if (imgix.config.useHttps) {
        protocol += 's';
      }

      var url = protocol + '://' + this.ixHostVal,
          hostEndsWithSlash = imgix.config.host.substr(-1) === '/',
          pathStartsWithSlash = path[0] === '/'

      // Make sure we don't end up with 2 or 0 slashes between
      // the host and path portions of the generated URL
      if (hostEndsWithSlash && pathStartsWithSlash) {
        url += path.substr(1);
      } else if (!hostEndsWithSlash && !pathStartsWithSlash) {
        url += '/' + path;
      } else {
        url += path;
      }

      url += '?'
      var params = [],
          param;
      for (var key in this.baseParams) {
        param = this.baseParams[key];
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(param));
      }

      url += params.join('&');

      return url;
    }
  };

  ImgixTag.prototype.src = function() {
    return this.baseUrl;
  };

  // Returns a comma-separated list of `url widthDescriptor` pairs,
  // scaled appropriately to the same aspect ratio as the base image
  // as appropriate.
  ImgixTag.prototype.srcset = function() {
    var pairs = [];

    for (var i = 0, targetWidth, clonedParams, url; i < targetWidths.length; i++) {
      targetWidth = targetWidths[i];
      clonedParams = util.shallowClone(this.baseParams);

      clonedParams.w = targetWidth

      if (this.baseParams.w != null && this.baseParams.h != null) {
        clonedParams.h = Math.round(targetWidth * (this.baseParams.h / this.baseParams.w));
      }

      url = this.baseUrlWithoutQuery + '?';
      var val,
          params = [];
      for (var key in clonedParams) {
        val = clonedParams[key];
        params.push(key + '=' + val);
      }

      url += params.join('&');

      pairs.push(url + ' ' + targetWidth + 'w');
    }

    return pairs.join(', ');
  };

  ImgixTag.prototype.sizes = function() {
    var existingSizes = this.el.getAttribute('sizes');

    if (existingSizes) {
      return existingSizes;
    } else {
      return '100vw';
    }
  };

  return ImgixTag;
}());

module.exports = ImgixTag;
