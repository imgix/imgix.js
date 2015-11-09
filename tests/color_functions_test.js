'use strict';


describe('Color functions:', function() {
  var knownRGB = 'rgb(251, 150, 23)',
      knownRGBA = 'rgba(251, 150, 23, 0.5)',
      knownHex = 'fb9617',
      hexRegex = /^(?:[A-Fa-f0-9]{3}){1,2}$/,
      rgbRegex = /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/,
      rgbaRegex = /^rgba\((?:\d{1,3}, ){3}(?:0|(?:1(?:\.0+)?)|(?:0?\.\d+))\)$/;

  describe('Converting from RGB to hex', function() {
    var randomValues = [
            _.random(0, 255),
            _.random(0, 255),
            _.random(0, 255)
          ],
        randomRGB = 'rgb(' + randomValues.join(', ') + ')',
        randomRGBWithoutSpaces = 'rgb(' + randomValues.join(',') + ')';

    it('returns a 6-character hexidecimal color string', function() {
      var result = imgix.rgbToHex(randomRGB);

      expect(result).toBeString();
      expect(result).toMatch(hexRegex);
    });

    it('works regardless of whether the input contains spaces', function() {
      var withSpaces = imgix.rgbToHex(randomRGB),
          withoutSpaces = imgix.rgbToHex(randomRGBWithoutSpaces);

      expect(withSpaces).toMatch(hexRegex);
      expect(withoutSpaces).toMatch(hexRegex);
    });

    it('returns the expected hex color', function() {
      var result = imgix.rgbToHex(knownRGB);

      expect(result).toMatch(new RegExp(knownHex, 'i'));
    });
  });

  describe('Converting from hex to RGB', function() {
    var randomHex = _.pad(_.random(0, (255*255*255)).toString(16), 6, '0');

    it('returns a proper RGB color when passed a 6-digit hex string', function() {
      var result = imgix.hexToRGB(randomHex);

      expect(result).toBeString();
      expect(result).toMatch(rgbRegex);
    });

    it('returns a proper RGB color when passed a 6-digit hex string with a leading #', function() {
      var result = imgix.hexToRGB('#' + randomHex);

      expect(result).toBeString();
      expect(result).toMatch(rgbRegex);
    });

    it('returns a proper RGB color when passed a 3-digit hex string', function() {
      var result = imgix.hexToRGB(randomHex.substr(3));

      expect(result).toBeString();
      expect(result).toMatch(rgbRegex);
    });

    it('returns a proper RGB color when passed a 3-digit hex string with a leading #', function() {
      var result = imgix.hexToRGB('#' + randomHex.substr(3));

      expect(result).toBeString();
      expect(result).toMatch(rgbRegex);
    });

    it('returns the expected RGB color', function() {
      var result = imgix.hexToRGB(knownHex);

      expect(result).toEqual(knownRGB);
    });

    it('is reflexive when mistakenly passed an RGB value', function() {
      var result = imgix.hexToRGB(knownRGB);

      expect(result).toEqual(knownRGB);
    });

    it('is reflexive when mistakenly passed an RGBA value', function() {
      var result = imgix.hexToRGB(knownRGBA);

      expect(result).toEqual(knownRGBA);
    });
  });

  describe('Applying an alpha value to RGB', function() {
    it('returns a properly-formatted RGBA color string', function() {
      var result = imgix.applyAlphaToRGB(knownRGB, 0.5);

      expect(result).toBeString();
      expect(result).toMatch(rgbaRegex);
    });

    it('returns the expected RGBA color when passed an RGB color string', function() {
      var result = imgix.applyAlphaToRGB(knownRGB, 0.5);

      expect(result).toEqual(knownRGBA);
    });

    it('returns the expected RGBA color when passed an RGBA color string', function() {
      var result = imgix.applyAlphaToRGB(knownRGBA, 0.3);

      expect(result).toEqual('rgba(251, 150, 23, 0.3)');
    });
  });

  describe('Setting URL params to RGB colors', function() {
    var ixURL;

    beforeEach(function() {
      ixURL = new imgix.URL('https://assets.imgix.net/pixel.gif');
    });

    it('sets a hex color when using a getter and passing an RGB color string', function() {
      var result;

      ixURL.setParam('blend', knownRGB);
      result = ixURL.getParam('blend');

      expect(result).toBeString();
      expect(result).toMatch(hexRegex);
    });

    it('sets a hex color when using setParam() and passing an RGB color string', function() {
      var result;

      ixURL.setParam('mono', knownRGB);
      result = ixURL.getParam('mono');

      expect(result).toBeString();
      expect(result).toMatch(hexRegex);
    });
  });

  describe('Retrieving a color\'s brightness score', function() {
    var knownRGB = 'rgb(204, 204, 204)',
        knownHex = 'cccccc',
        knownBrightness = 204;

    it('returns the expected number when passed a 6-digit hex string with a leading #', function() {
      var result = imgix.getColorBrightness('#' + knownHex);

      expect(result).toBeWholeNumber();
      expect(result).toEqual(knownBrightness);
    });

    it('returns the expected number when passed a 3-digit hex string with a leading #', function() {
      var result = imgix.getColorBrightness('#' + knownHex.substr(3));

      expect(result).toBeWholeNumber();
      expect(result).toEqual(knownBrightness);
    });

    it('returns the expected number when passed an RGB string', function() {
      var result = imgix.getColorBrightness(knownRGB);

      expect(result).toBeWholeNumber();
      expect(result).toEqual(knownBrightness);
    });
  });
});
