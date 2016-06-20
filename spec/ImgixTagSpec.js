var ImgixTag = require('../src/ImgixTag.js'),
    btoa = require('btoa'),
    targetWidths = require('../src/targetWidths');

describe('ImgixTag', function() {
  beforeEach(function() {
    global.btoa = btoa;

    global.imgix = {
      config: {
        host: 'assets.imgix.net',
        useHttps: true
      }
    };

    global.imgixTagDefaultConfig = {
      force: false,
      srcAttribute: 'src',
      srcsetAttribute: 'srcset',
      sizesAttribute: 'sizes'
    }

    global.mockElement = {
      setAttribute: function(attr, val) {
        return this[attr] = val;
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

    it('sets custom `srcAttribute` value', function() {
      global.imgixTagDefaultConfig.srcAttribute = 'src-attribute-test'
      new ImgixTag(global.mockElement, global.imgixTagDefaultConfig);
      expect(global.mockElement['src-attribute-test']).toBeDefined();
    });

    it('sets custom `srcsetAttribute` value', function() {
      global.imgixTagDefaultConfig.srcsetAttribute = 'srcset-attribute-test'
      new ImgixTag(global.mockElement, global.imgixTagDefaultConfig);
      expect(global.mockElement['srcset-attribute-test']).toBeDefined();
    });

    it('sets custom `sizesAttribute` value', function() {
      global.imgixTagDefaultConfig.sizesAttribute = 'sizes-attribute-test'
      new ImgixTag(global.mockElement, global.imgixTagDefaultConfig);
      expect(global.mockElement['sizes-attribute-test']).toBeDefined();
    });

    it('errors if neither `imgix.host` or `ix-host` are specified, but the passed element has `ix-path`', function() {
      delete global.imgix.config.host;
      global.mockElement['ix-path'] = 'dogs.jpg';

      expect(function() {
        new ImgixTag(global.mockElement);
      }).toThrow();
    });

    it('does not error if `imgix.host` is specified and the passed element has `ix-path`', function() {
      global.imgix.config.host = 'my-source.imgix.net';
      global.mockElement['ix-path'] = 'dogs.jpg';

      expect(function() {
        new ImgixTag(global.mockElement);
      }).not.toThrow();
    });

    it('does not error if `ix-host` is specified and the passed element has `ix-path`', function() {
      delete global.imgix.config.host;
      global.mockElement['ix-host'] = 'my-source.imgix.net';
      global.mockElement['ix-path'] = 'dogs.jpg';

      expect(function() {
        new ImgixTag(global.mockElement);
      }).not.toThrow();
    });

    it('prefers the `ix-host` attribute over `imgix.host` config', function() {
      global.mockElement['ix-host'] = 'my-source.imgix.net';
      global.mockElement['ix-path'] = 'dogs.jpg';

      var tag = new ImgixTag(global.mockElement);

      expect(tag.ixHostVal).toEqual('my-source.imgix.net');
    });

    it('does not re-run initialization if passed element has `ix-initialized`', function() {
      global.mockElement['ix-initialized'] = 'ix-initialized';

      var tag = new ImgixTag(global.mockElement);
      expect(tag.baseUrl).not.toBeDefined();
    });

    it('re-runs initialization if passed element has `ix-initialized` and `force: true` option is passed', function() {
      global.mockElement['ix-initialized'] = 'ix-initialized';

      var tag = new ImgixTag(global.mockElement, {force: true});
      expect(tag.baseUrl).toBeDefined();
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
    it('returns the expected number of `url widthDescriptor` pairs', function() {
      var tag = new ImgixTag(global.mockElement);

      expect(tag.srcset().split(',').length).toEqual(targetWidths.length);
    });

    it('correctly calculates `h` to maintain aspect ratio, when specified', function() {
      global.mockElement['ix-src'] ='https://assets.imgix.net/presskit/imgix-presskit.pdf?page=3&w=600&h=300';
      var tag = new ImgixTag(global.mockElement),
          srcsetPairs = tag.srcset().split(',');

      for (var i = 0, srcsetPair, w, h; i < srcsetPairs.length; i++) {
        srcsetPair = srcsetPairs[i];
        w = parseInt(srcsetPair.match(/w=(\d+)/)[1], 10);
        h = parseInt(srcsetPair.match(/h=(\d+)/)[1], 10);

        expect(Math.round(w / 2)).toEqual(h);
      }
    });
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
