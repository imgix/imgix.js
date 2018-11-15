var ImgixTag = require('../src/ImgixTag.js'),
  btoa = require('btoa'),
  targetWidths = require('../src/targetWidths');

describe('ImgixTag', function() {
  beforeEach(function() {
    global.btoa = btoa;

    global.imgix = {
      config: {
        host: 'assets.imgix.net',
        useHttps: true,
        includeLibraryParam: false,
        srcAttribute: 'src',
        srcsetAttribute: 'srcset',
        sizesAttribute: 'sizes',
        srcInputAttribute: 'ix-src',
        pathInputAttribute: 'ix-path',
        paramsInputAttribute: 'ix-params',
        hostInputAttribute: 'ix-host'
      }
    };

    global.MockElement = function() {
      this.nodeName = 'IMG';
      return this;
    };

    global.MockElement.prototype.setAttribute = function(attr, val) {
      return (this[attr] = val);
    };

    global.MockElement.prototype.getAttribute = function(attr) {
      return this[attr] != null ? this[attr] : null;
    };

    global.MockElement.prototype.hasAttribute = function(attr) {
      return this[attr] != null;
    };

    global.mockElement = new global.MockElement();
    global.mockElement['ix-src'] =
      'https://assets.imgix.net/presskit/imgix-presskit.pdf?page=3&w=600';
  });

  describe('#initialize', function() {
    it('errors if initialized without a DOM element', function() {
      expect(function() {
        new ImgixTag();
      }).toThrow();
    });

    it('does not error if initialized with a DOM element', function() {
      expect(function() {
        new ImgixTag(global.mockElement, global.imgix.config);
      }).not.toThrow();
    });

    it('sets custom `srcAttribute` value', function() {
      global.imgix.config.srcAttribute = 'src-attribute-test';
      new ImgixTag(global.mockElement, global.imgix.config);
      expect(global.mockElement['src-attribute-test']).toBeDefined();
    });

    it('sets custom `srcsetAttribute` value', function() {
      global.imgix.config.srcsetAttribute = 'srcset-attribute-test';

      new ImgixTag(global.mockElement, global.imgix.config);
      expect(global.mockElement['srcset-attribute-test']).toBeDefined();
    });

    it('sets custom `sizesAttribute` value', function() {
      global.imgix.config.sizesAttribute = 'sizes-attribute-test';

      new ImgixTag(global.mockElement, global.imgix.config);
      expect(global.mockElement['sizes-attribute-test']).toBeDefined();
    });

    it('does not set custom `sizesAttribute` value if config.sizesAttribute is falsy', function() {
      spyOn(global.mockElement, 'setAttribute').and.callThrough();

      global.imgix.config.sizesAttribute = null;
      new ImgixTag(global.mockElement, global.imgix.config);

      expect(global.mockElement.setAttribute.calls.count()).toEqual(3);
      expect(global.mockElement.setAttribute).not.toHaveBeenCalledWith('sizes');
    });

    it('does not set custom `srcAttribute` value if config.srcAttribute is falsy', function() {
      spyOn(global.mockElement, 'setAttribute').and.callThrough();

      global.imgix.config.srcAttribute = null;
      new ImgixTag(global.mockElement, global.imgix.config);

      expect(global.mockElement.setAttribute.calls.count()).toEqual(3);
      expect(global.mockElement.setAttribute).not.toHaveBeenCalledWith('src');
    });

    it('does not set custom `srcsetAttribute` value if config.srcsetAttribute is falsy', function() {
      spyOn(global.mockElement, 'setAttribute').and.callThrough();

      global.imgix.config.srcsetAttribute = null;
      new ImgixTag(global.mockElement, global.imgix.config);

      expect(global.mockElement.setAttribute.calls.count()).toEqual(3);
      expect(global.mockElement.setAttribute).not.toHaveBeenCalledWith(
        'srcset'
      );
    });

    it('pulls from specified `srcInputAttribute` value', function() {
      global.imgix.config.srcInputAttribute = 'data-src-input-test';

      global.mockElement.setAttribute(
        'data-src-input-test',
        'https://fake.com/image.png'
      );

      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.ixSrcVal).toEqual('https://fake.com/image.png');
    });

    it('pulls from specified `pathInputAttribute` value', function() {
      global.imgix.config.pathInputAttribute = 'data-path-input-test';

      global.mockElement.setAttribute(
        'data-path-input-test',
        'stuff/things.jpg'
      );

      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.ixPathVal).toEqual('stuff/things.jpg');
    });

    it('pulls from specified `paramsInputAttribute` value', function() {
      global.imgix.config.paramsInputAttribute = 'data-params-input-test';

      global.mockElement.setAttribute(
        'data-params-input-test',
        '{"cat": "dog"}'
      );
      global.mockElement.setAttribute('ix-path', 'lorem.jpg');
      delete global.mockElement['ix-src'];

      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.ixParamsVal).toEqual('{"cat": "dog"}');
    });

    it('pulls from specified `hostInputAttribute` value', function() {
      global.imgix.config.hostInputAttribute = 'data-host-input-test';

      global.mockElement.setAttribute(
        'data-host-input-test',
        'different-source.imgix.net'
      );

      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.ixHostVal).toEqual('different-source.imgix.net');
    });

    it('errors if neither `imgix.host` or `ix-host` are specified, but the passed element has `ix-path`', function() {
      delete global.imgix.config.host;
      global.mockElement['ix-path'] = 'dogs.jpg';

      expect(function() {
        new ImgixTag(global.mockElement, global.imgix.config);
      }).toThrow();
    });

    it('does not error if `imgix.host` is specified and the passed element has `ix-path`', function() {
      global.imgix.config.host = 'my-source.imgix.net';
      global.mockElement['ix-path'] = 'dogs.jpg';

      expect(function() {
        new ImgixTag(global.mockElement, global.imgix.config);
      }).not.toThrow();
    });

    it('does not error if `ix-host` is specified and the passed element has `ix-path`', function() {
      delete global.imgix.config.host;
      global.mockElement['ix-host'] = 'my-source.imgix.net';
      global.mockElement['ix-path'] = 'dogs.jpg';

      expect(function() {
        new ImgixTag(global.mockElement, global.imgix.config);
      }).not.toThrow();
    });

    it('prefers the `ix-host` attribute over `imgix.host` config', function() {
      global.imgix.config.host = 'assets.imgix.net';

      global.mockElement['ix-host'] = 'my-source.imgix.net';
      global.mockElement['ix-path'] = 'dogs.jpg';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.ixHostVal).toEqual('my-source.imgix.net');
    });

    it('does not re-run initialization if passed element has `ix-initialized`', function() {
      global.mockElement['ix-initialized'] = 'ix-initialized';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);
      expect(tag.baseUrl).not.toBeDefined();
    });

    it('re-runs initialization if passed element has `ix-initialized` and `force: true` option is passed', function() {
      global.mockElement['ix-initialized'] = 'ix-initialized';
      global.imgix.config.force = true;

      var tag = new ImgixTag(global.mockElement, global.imgix.config);
      expect(tag.baseUrl).toBeDefined();
    });

    it(`uses http if 'useHttps' is set to false`, function() {
      global.imgix.config.useHttps = false;
      delete global.mockElement['ix-src'];
      global.mockElement['ix-host'] = 'my-source.imgix.net/';
      global.mockElement['ix-path'] = 'dogs.jpg';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);
      expect(tag.el.src.startsWith('http://')).toBe(true);
    });

    it(`uses https if 'useHttps' is set to true`, function() {
      global.imgix.config.useHttps = true;
      delete global.mockElement['ix-src'];
      global.mockElement['ix-host'] = 'my-source.imgix.net/';
      global.mockElement['ix-path'] = 'dogs.jpg';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);
      expect(tag.el.src.startsWith('https://'));
  });

    it(`handles hosts with a trailing slash, and paths with a starting slash`, function() {
      global.mockElement['ix-host'] = 'my-source.imgix.net/';
      global.mockElement['ix-path'] = '/dogs.jpg';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);
      expect(tag.el.src.includes('my-source.imgix.net/dogs.jpg'));
    });

    it(`handles hosts with no trailing slash, and paths with no starting slash`, function() {
      global.mockElement['ix-host'] = 'my-source.imgix.net';
      global.mockElement['ix-path'] = 'dogs.jpg';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);
      expect(tag.el.src.includes('my-source.imgix.net/dogs.jpg'));
    });
  });

  describe('#_extractBaseParams', function() {
    it('correctly extracts baseParams specified in `ix-src`', function() {
      var tag = new ImgixTag(global.mockElement, global.imgix.config);
      expect(tag._extractBaseParams()).toEqual({
        page: '3',
        w: '600'
      });
    });

    it('correctly extracts baseParams specified in `ix-params`', function() {
      var mock = new global.MockElement();
      mock['ix-path'] = 'presskit/imgix-presskit.pdf';
      mock['ix-params'] = '{"page": 4, "w": 450}';

      var tag = new ImgixTag(mock, global.imgix.config);
      expect(tag._extractBaseParams()).toEqual({
        page: 4,
        w: 450
      });
    });

    it('correctly encodes Base64 variant parameters specified in `ix-params`', function() {
      var mock = new global.MockElement();
      mock['ix-path'] = '~text';
      mock['ix-params'] = '{"txt64": "I cannøt belîév∑ it wors! 😱"}';

      var tag = new ImgixTag(mock, global.imgix.config);

      expect(tag._extractBaseParams()).toEqual({
        txt64: 'SSBjYW5uw7h0IGJlbMOuw6l24oiRIGl0IHdvcu-jv3MhIPCfmLE'
      });
    });
  });

  it('includes the `ixlib` parameter when `imgix.config.includeLibraryParam` is `true`', function() {
    global.imgix.VERSION = '3test';
    global.imgix.config.includeLibraryParam = true;

    var tag = new ImgixTag(global.mockElement, global.imgix.config);

    expect(tag._extractBaseParams()).toEqual({
      page: '3',
      w: '600',
      ixlib: 'imgixjs-3test'
    });
  });

  it('does not encode base64 variant parameters specified in `ix-src`', function() {
    var mock = new global.MockElement();
    mock['ix-src'] =
      'https://assets.imgix.net/presskit/imgix-presskit.pdf?page=3&w=600&txt64=gibberish';

    var tag = new ImgixTag(mock, global.imgix.config);

    expect(tag._extractBaseParams()).toEqual({
      page: '3',
      w: '600',
      txt64: 'gibberish'
    });
  });

  it('returns an empty object when the path given in the ix-src attribute has no query params', function() {
    var mock = new global.MockElement();
    mock['ix-src'] = 'https://assets.imgix.net/presskit/imgix-presskit.pdf';

    var tag = new ImgixTag(mock, global.imgix.config);

    expect(tag._extractBaseParams()).toEqual({});
  });

  describe('#_buildBaseUrl', function() {
    it('uses `ix-src` directly when specified', function() {
      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag._buildBaseUrl()).toEqual(global.mockElement['ix-src']);
    });

    it('uses `ix-path` and `ix-params` when specified', function() {
      delete global.mockElement['ix-src'];
      global.mockElement['ix-path'] = 'presskit/imgix-presskit.pdf';
      global.mockElement['ix-params'] = '{"page": 4, "w": 450}';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag._buildBaseUrl()).toEqual(
        'https://assets.imgix.net/presskit/imgix-presskit.pdf?page=4&w=450'
      );
    });
  });

  describe('#src', function() {
    it('returns the `baseUrl` property', function() {
      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.src()).toEqual(tag.baseUrl);
    });
  });

  describe('#srcset', function() {
    it('returns the expected number of `url widthDescriptor` pairs', function() {
      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.srcset().split(',').length).toEqual(targetWidths.length);
    });

    it('correctly calculates `h` to maintain aspect ratio, when specified', function() {
      global.mockElement['ix-src'] =
        'https://assets.imgix.net/presskit/imgix-presskit.pdf?page=3&w=600&h=300';
      var tag = new ImgixTag(global.mockElement, global.imgix.config),
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
      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.sizes()).toEqual('100vw');
    });

    it('respects an existing value', function() {
      global.mockElement.sizes = 'some gibberish!';

      var tag = new ImgixTag(global.mockElement, global.imgix.config);

      expect(tag.sizes()).toEqual('some gibberish!');
    });
  });
});
