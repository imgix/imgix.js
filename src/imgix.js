var ImgixTag = require('./ImgixTag.js'),
  util = require('./util.js'),
  defaultConfig = require('./defaultConfig');

var VERSION = '3.3.2';

function getMetaTagValue(propertyName) {
  var metaTag = document.querySelector(
      'meta[property="ix:' + propertyName + '"]'
    ),
    metaTagContent;

  if (!metaTag) {
    return;
  }

  metaTagContent = metaTag.getAttribute('content');

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

    if (typeof metaTagValue !== 'undefined') {
      const defaultConfigType = typeof defaultConfig[key];
      // Only allow boolean values for boolean configs
      if (defaultConfigType === 'boolean') {
        global.imgix.config[key] = !!metaTagValue;
      } else if (defaultConfigType === 'object' && defaultConfig[key] != null) {
        global.imgix.config[key] = JSON.parse(metaTagValue) || {};
      } else {
        global.imgix.config[key] = metaTagValue;
      }
    }
  });

  if (getMetaTagValue('autoInit') !== false) {
    global.imgix.init();
  }
});
