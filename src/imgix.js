var ImgixTag = require('./ImgixTag.js'),
    util = require('./util.js'),
    defaultConfig = require('./defaultConfig');

var VERSION = '3.0.3';

var ELEMENT_QUERY = [
  'img[ix-src]',
  'source[ix-src]',
  'img[ix-path]',
  'source[ix-path]',
].join(',');

var INIT_DEFAULTS = {
  force: false,
  srcAttribute: 'src',
  srcsetAttribute: 'srcset',
  sizesAttribute: 'sizes'
};

global.imgix = {
  init: function(opts) {
    var allImgandSourceTags = document.querySelectorAll(ELEMENT_QUERY),
        settings = util.shallowClone(INIT_DEFAULTS);

    util.extend(settings, opts || {});

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
