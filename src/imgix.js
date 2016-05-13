var ImgixTag = require('./ImgixTag.js'),
    util = require('./util.js');

var ELEMENT_QUERY = [
  'img[ix-src]',
  'source[ix-src]',
  'img[ix-path]',
  'source[ix-path]',
].join(',');

var INIT_DEFAULTS = {
  force: false
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
  config: {
    host: null,
    useHttps: true
  }
};

util.domReady(global.imgix.init);
