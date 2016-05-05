(function(context) {
  var targetWidths = require('./targetWidths.js'),
      ImageTag = require('./ImageTag.js');

  context.imgix = {
    init: function() {
      // find all the `img` and `source` tags that need processing
      // ix-src or ix-path + ix-params

      // In Coffee, this would be something along the lines of…
      // `new ImageTag(el) for el in allImgAndSourceTags`
    },
    config: {
      host: null,
      useHttps: true
    }
  };
}(this));
