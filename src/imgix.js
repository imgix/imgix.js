(function(context) {
  var targetWidths = require('./targetWidths.js');

  var imgix = (function() {
    function imgix(whatever) {
      this.whatever = whatever;
    }

    imgix.prototype.init = function() {
      return console.log('hi');
    };

    return imgix;
  }());

  context.imgix = imgix;
}(this));
