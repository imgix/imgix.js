var ImgixTag = require('./ImgixTag.js'),
    util = require('./util.js'),
    elementQuery = [
      'img[ix-src]',
      'source[ix-src]',
      'img[ix-path]',
      'source[ix-path]',
    ].join(',');

global.imgix = {
  init: function() {
    var allImgandSourceTags = document.querySelectorAll(elementQuery);

    for (var i = 0, el; i < allImgandSourceTags.length; i++) {
      new ImgixTag(allImgandSourceTags[i]);
    }
  },
  config: {
    host: null,
    useHttps: true
  }
};

util.domReady(global.imgix.init);
