var ImgixTag = require('./ImgixTag.js'),
    util = require('./util.js'),
    defaultConfig = require('./defaultConfig');

var VERSION = '3.1.0';

function getMetaTagValue(propertyName) {
  var metaTag = document.querySelector('meta[property="ix:' + propertyName + '"]'),
      metaTagContent = metaTag ? metaTag.getAttribute('content') : null;

  if (metaTagContent === 'true') {
    return true;
  } else if (metaTagContent === 'false') {
    return false;
  } else if (metaTagContent === '' || metaTagContent === 'null') {
    return null;
  } else {
    return metaTagContent;
  }
}

global.imgix = {
  init: function(opts) {
    var settings = util.shallowClone(this.config);
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
  util.objectEach(defaultConfig, function(defaultValue, key) {
    var metaTagValue = getMetaTagValue(key);

    if (metaTagValue !== null) {
      // Only allow boolean values for boolean configs
      if (typeof defaultConfig[key] === 'boolean') {
        global.imgix.config[key] = !!metaTagValue;
      } else {
        global.imgix.config[key] = metaTagValue;
      }
    }
  });

  if (getMetaTagValue('autoInit') !== false) {
    global.imgix.init();
  }
});
