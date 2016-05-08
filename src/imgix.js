var ImgixTag = require('./ImgixTag.js'),
    elementQuery = [
      'img[ix-src]',
      'source[ix-src]',
      'img[ix-path]',
      'source[ix-path]',
    ].join(',');

global.imgix = {
  init: function() {
    // find all the `img` and `source` tags that need processing
    // ix-src or ix-path + ix-params

    var allImgandSourceTags = document.querySelectorAll(elementQuery);

    for (var i = 0, el; i < allImgandSourceTags.length; i++) {
      el = allImgandSourceTags[i];
      console.log('hi', allImgandSourceTags[i]);

      new ImgixTag(el);
    }

    // In Coffee, this would be something along the lines of…
    // `new ImgixTag(el) for el in allImgAndSourceTags`
  },
  config: {
    host: null,
    useHttps: true
  }
};
