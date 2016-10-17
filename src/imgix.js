var ImgixTag = require('./ImgixTag.js'),
    util = require('./util.js'),
    defaultConfig = require('./defaultConfig');

var VERSION = '3.0.3';

var INIT_DEFAULTS = {
  force: false,
  srcAttribute: 'src',
  srcsetAttribute: 'srcset',
  sizesAttribute: 'sizes',
  srcInputAttribute: 'ix-src',
  pathInputAttribute: 'ix-path',
  paramsInputAttribute: 'ix-params',
  hostInputAttribute: 'ix-host'
};

global.imgix = {
  init: function(opts) {
    var settings = util.shallowClone(INIT_DEFAULTS);
    util.extend(settings, opts || {});

    var elementQuery = [
      'img[' + settings.srcInputAttribute + ']',
      'source[' + settings.srcInputAttribute + ']',
      'img[' + settings.pathInputAttribute + ']',
      'source[' + settings.pathInputAttribute + ']'
    ].join(',');

    var allImgandSourceTags = document.querySelectorAll(elementQuery);

    for (var i = 0, el; i < allImgandSourceTags.length; i++) {
      new ImgixTag(allImgandSourceTags[i], settings);
    }
  },
  config: defaultConfig,
  VERSION: VERSION
};

util.domReady(function() {
  var hostMeta = document.querySelector('meta[property="ix:host"]'),
      httpsMeta = document.querySelector('meta[property="ix:useHttps"]'),
      libParamMeta = document.querySelector('meta[property="ix:includeLibraryParam"]');

  if (hostMeta) {
    global.imgix.config.host = hostMeta.getAttribute('content');
  }

  if (httpsMeta) {
    var useHttps = httpsMeta.getAttribute('content') === 'true';
    global.imgix.config.useHttps = useHttps ? true : false;
  }

  if (libParamMeta) {
    var includeLibraryParam = libParamMeta.getAttribute('content') === 'true';
    global.imgix.config.includeLibraryParam = includeLibraryParam ? true : false;
  }

  global.imgix.init();
});
