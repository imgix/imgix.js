var ImgixTag = require('../src/ImgixTag.js'),
    btoa = require('btoa');

describe('ImgixTag', function() {
  beforeEach(function() {
    global.btoa = btoa;

    global.imgix = {
      config: {
        host: 'assets.imgix.net',
        useHttps: true
      }
    };

    global.mockElement = {
      setAttribute: function(attr, val) {
        return this.attr = val;
      },
      getAttribute: function(attr) {
        return this[attr] != null ? this[attr] : null;
      },
      hasAttribute: function(attr) {
        return this[attr] != null;
      },
      nodeName: 'IMG',
      'ix-src': 'https://assets.imgix.net/presskit/imgix-presskit.pdf?page=3&w=600'
    }
  });

  describe('#initialize', function() {
    it('errors if initialized without a DOM element', function() {
      expect(function() {
        new ImgixTag();
      }).toThrow();
    });

    it('does not error if initialized with a DOM element', function() {
      expect(function() {
        new ImgixTag(global.mockElement);
      }).not.toThrow();
    });
  });

  describe('#_extractBaseParams', function() {
    it('correctly extracts baseParams specified in `ix-src`', function() {
      var tag = new ImgixTag(global.mockElement);
      expect(tag._extractBaseParams()).toEqual({
        page: '3',
        w: '600'
      });
    });

    it('correctly extracts baseParams specified in `ix-params`', function() {
      delete global.mockElement['ix-src'];
      global.mockElement['ix-path'] = 'presskit/imgix-presskit.pdf';
      global.mockElement['ix-params'] = '{"page": 4, "w": 450}';

      var tag = new ImgixTag(global.mockElement);
      expect(tag._extractBaseParams()).toEqual({
        page: 4,
        w: 450
      });
    });

    it('correctly encodes Base64 variant parameters specified in `ix-params`', function() {
      delete global.mockElement['ix-src'];
      global.mockElement['ix-path'] = '~text';
      global.mockElement['ix-params'] = '{"txt64": "I cannøt belîév∑ it wors! 😱"}';

      var tag = new ImgixTag(global.mockElement);

      expect(tag._extractBaseParams()).toEqual({
        txt64: 'SSBjYW5uw7h0IGJlbMOuw6l24oiRIGl0IHdvcu-jv3MhIPCfmLE'
      });
    });
  });

  describe('#_buildBaseUrl', function() {
    it('uses `ix-src` directly when specified', function() {
      var tag = new ImgixTag(global.mockElement);

      expect(tag._buildBaseUrl()).toEqual(global.mockElement['ix-src']);
    });

    it('uses `ix-path` and `ix-params` when specified', function() {
      delete global.mockElement['ix-src'];
      global.mockElement['ix-path'] = 'presskit/imgix-presskit.pdf';
      global.mockElement['ix-params'] = '{"page": 4, "w": 450}';

      var tag = new ImgixTag(global.mockElement);

      expect(tag._buildBaseUrl()).toEqual('https://assets.imgix.net/presskit/imgix-presskit.pdf?page=4&w=450');
    });
  });

  describe('#src', function() {
    it('returns the `baseUrl` property', function() {
      var tag = new ImgixTag(global.mockElement);

      expect(tag.src()).toEqual(tag.baseUrl);
    });
  });

  describe('#srcset', function() {
    it('returns the expected number of `url widthDescriptor` pairs');
    it('correctly calculates `h` to maintain aspect ratio, when specified');
  });

  describe('#sizes', function() {
    it('returns a default value of `100vw`', function() {
      var tag = new ImgixTag(global.mockElement);

      expect(tag.sizes()).toEqual('100vw');
    });

    it('respects an existing value', function() {
      global.mockElement.sizes = 'some gibberish!';

      var tag = new ImgixTag(global.mockElement);

      expect(tag.sizes()).toEqual('some gibberish!');
    });
  });
});
