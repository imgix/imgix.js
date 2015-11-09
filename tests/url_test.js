'use strict';

describe('.URL:', function() {
  var baseUrl = 'http://static-a.imgix.net/macaw.png',
      paramString = 'w=500&sepia=33';

  describe('Parsing a URL string passed into the constructor', function() {
    var ixURL,
        parts;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl + '?' + paramString);
      parts = ixURL.urlParts;
    });

    it('returns the correct baseUrl', function() {
      expect(parts.baseUrl).toEqual(baseUrl);
    });

    it('returns the correct protocol', function() {
      expect(parts.protocol).toEqual('http');
    });

    it('returns the correct host and hostname', function() {
      expect(parts.hostname).toEqual('static-a.imgix.net');
      expect(parts.host).toEqual('static-a.imgix.net');
    });

    it('returns the correct port', function() {
      expect(parts.port).toEqual('80');
    });

    it('returns the correct pathname', function() {
      expect(parts.pathname).toEqual('/macaw.png');
    });

    it('returns the correct search string', function() {
      expect(parts.search).toEqual(paramString);
    });
  });

  describe('Parsing params from a URL string passed into the constructor', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl + '?' + paramString);
    });

    it('reports all given parameters in the params list', function() {
      expect(ixURL.urlParts.params).toContain('w');
      expect(ixURL.urlParts.params).toContain('sepia');
    });

    it('returns all given params in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['w']).toEqual('500');
      expect(ixURL.urlParts.paramValues['sepia']).toEqual('33');
    });

    it('returns the correct values via .getParam()', function() {
      expect(ixURL.getParam('w')).toEqual('500');
      expect(ixURL.getParam('sepia')).toEqual('33');
    });
  });

  describe('Parsing a params-only string passed into the constructor', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL('?w=500&sepia=33');
    });

    it('reports all given parameters in the params list', function() {
      expect(ixURL.urlParts.params).toContain('w');
      expect(ixURL.urlParts.params).toContain('sepia');
    });

    it('returns all given params in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['w']).toEqual('500');
      expect(ixURL.urlParts.paramValues['sepia']).toEqual('33');
    });

    it('returns the correct values via .getParam()', function() {
      expect(ixURL.getParam('w')).toEqual('500');
      expect(ixURL.getParam('sepia')).toEqual('33');
    });
  });

  describe('Setting params via the constructor', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl, {
        w: 500,
        sepia: 33
      });
    });

    it('reports all given parameters in the params list', function() {
      expect(ixURL.urlParts.params).toContain('w');
      expect(ixURL.urlParts.params).toContain('sepia');
    });

    it('returns all given params in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['w']).toEqual('500');
      expect(ixURL.urlParts.paramValues['sepia']).toEqual('33');
    });

    it('returns the correct values via .getParam()', function() {
      expect(ixURL.getParam('w')).toEqual('500');
      expect(ixURL.getParam('sepia')).toEqual('33');
    });
  });

  describe('Getting the full URL', function() {
    var ixURL,
        params = {
            w: 500,
            sepia: 33
          },
        fullUrl;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl, params);
      fullUrl = ixURL.getUrl();
    });

    it('reports the same value for .getUrl() and .getURL()', function() {
      expect(ixURL.getURL()).toEqual(ixURL.getUrl());
    });

    it('contains the correct baseUrl', function() {
      expect(fullUrl).toMatch(baseUrl);
    });

    it('contains the given parameters', function() {
      _.each(params, function(value, key) {
        expect(fullUrl).toMatch(key + '=' + value);
      });
    });

    it('contains the imgix.js version', function() {
      expect(fullUrl).toMatch('ixjsv=' + imgix.version);
    });
  });

  describe('Getting the full URL when nothing is set', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL();
    });

    it('returns the URL for an empty image', function() {
      expect(ixURL.getURL()).toEqual(imgix.getEmptyImage());
    });
  });

  describe('Setting a new parameter', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl);
      ixURL.setParam('rot', 30);
    });

    it('shows up in the params list', function() {
      expect(ixURL.urlParts.params).toContain('rot');
    });

    it('shows up in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['rot']).toEqual('30');
    });

    it('returns the new value via .getParam()', function() {
      expect(ixURL.getParam('rot')).toEqual('30');
    });

    it('contains the new value in the full URL', function() {
      expect(ixURL.getUrl()).toMatch('rot=30');
    });
  });

  describe('Setting a new parameter with URL encoding', function() {
    var ixURL,
        string = 'Hello world',
        encodedString = window.encodeURIComponent(string);

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl);
      ixURL.setParam('txt', string);
    });

    it('returns the new value via .getParam()', function() {
      expect(ixURL.getParam('txt')).toEqual(encodedString);
    });

    it('contains the new value in the full URL', function() {
      expect(ixURL.getUrl()).toMatch('txt=' + encodedString);
    });
  });

  describe('Setting multiple new parameters', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl);
      ixURL.setParams({
        dpr: 2,
        rot: 30
      });
    });

    it('reports all new parameters in the params list', function() {
      expect(ixURL.urlParts.params).toContain('dpr');
      expect(ixURL.urlParts.params).toContain('rot');
    });

    it('returns all new params in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['dpr']).toEqual('2');
      expect(ixURL.urlParts.paramValues['rot']).toEqual('30');
    });

    it('returns the new values via .getParam()', function() {
      expect(ixURL.getParam('dpr')).toEqual('2');
      expect(ixURL.getParam('rot')).toEqual('30');
    });

    it('contains the new values in the full URL', function() {
      var fullUrl = ixURL.getUrl();

      expect(fullUrl).toMatch('dpr=2');
      expect(fullUrl).toMatch('rot=30');
    });
  });

  describe('Setting a new parameters by chaining setters', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl);
      ixURL.setParams({
        dpr: 2,
        rot: 30
      });
    });

    it('reports all new parameters in the params list', function() {
      expect(ixURL.urlParts.params).toContain('dpr');
      expect(ixURL.urlParts.params).toContain('rot');
    });

    it('returns all new params in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['dpr']).toEqual('2');
      expect(ixURL.urlParts.paramValues['rot']).toEqual('30');
    });

    it('returns the new values via .getParam()', function() {
      expect(ixURL.getParam('dpr')).toEqual('2');
      expect(ixURL.getParam('rot')).toEqual('30');
    });

    it('contains the new values in the full URL', function() {
      var fullUrl = ixURL.getUrl();

      expect(fullUrl).toMatch('dpr=2');
      expect(fullUrl).toMatch('rot=30');
    });
  });

  describe('Removing an existing parameter', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl, {
        w: 500,
        sepia: 33
      });
      ixURL.removeParam('sepia');
    });

    it('does not show up in the params list', function() {
      expect(ixURL.urlParts.params).not.toContain('sepia');
    });

    it('does not show up in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['sepia']).not.toBeDefined();
    });

    it('does not return the new value via .getParam()', function() {
      expect(ixURL.getParam('sepia')).not.toBeDefined();
    });

    it('does not contain the new value in the full URL', function() {
      expect(ixURL.getUrl()).not.toMatch('sepia=33');
    });

    it('retains other parameters', function() {
      expect(ixURL.urlParts.params).toContain('w');
    });
  });

  describe('Setting an existing parameter to null', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl, {
        sepia: 33
      });
      ixURL.setParam('sepia', null);
    });

    it('does not show up in the params list', function() {
      expect(ixURL.urlParts.params).not.toContain('sepia');
    });

    it('does not show up in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['sepia']).not.toBeDefined();
    });

    it('does not return the new value via .getParam()', function() {
      expect(ixURL.getParam('sepia')).not.toBeDefined();
    });

    it('does not contain the new value in the full URL', function() {
      expect(ixURL.getUrl()).not.toMatch('sepia=33');
    });
  });

  describe('Clearing parameters', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl, {
        w: 500,
        sepia: 33
      });
      ixURL.clearParams();
    });

    it('has an empty params list', function() {
      expect(ixURL.urlParts.params).toBeEmptyArray();
    });

    it('has an empty urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['w']).not.toBeDefined();
      expect(ixURL.urlParts.paramValues['sepia']).not.toBeDefined();
    });

    it('does not return any values via .getParam()', function() {
      expect(ixURL.getParam('w')).not.toBeDefined();
      expect(ixURL.getParam('sepia')).not.toBeDefined();
    });

    it('does not any values in the full URL', function() {
      var fullUrl = ixURL.getUrl();

      expect(fullUrl).not.toContain("w=500");
      expect(fullUrl).not.toContain("sepia=33");
    });
  });

  describe('Clearing and then setting parameters', function() {
    var ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl, {
        w: 500,
        sepia: 33
      });
      ixURL.clearThenSetParams({
        dpr: 2,
        rot: 30
      });
    });

    it('does not contain initial params in the params list', function() {
      expect(ixURL.urlParts.params).not.toContain('w');
      expect(ixURL.urlParts.params).not.toContain('sepia');
    });

    it('does not contain initial params in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['w']).not.toBeDefined();
      expect(ixURL.urlParts.paramValues['sepia']).not.toBeDefined();
    });

    it('does not return the intial values via .getParam()', function() {
      expect(ixURL.getParam('w')).not.toBeDefined();
      expect(ixURL.getParam('sepia')).not.toBeDefined();
    });

    it('does not include initial values in the full URL', function() {
      var fullUrl = ixURL.getUrl();

      expect(fullUrl).not.toContain("w=500");
      expect(fullUrl).not.toContain("sepia=33");
    });

    it('reports all new parameters in the params list', function() {
      expect(ixURL.urlParts.params).toContain('dpr');
      expect(ixURL.urlParts.params).toContain('rot');
    });

    it('returns all new params in the urlParts.paramValues hash', function() {
      expect(ixURL.urlParts.paramValues['dpr']).toEqual('2');
      expect(ixURL.urlParts.paramValues['rot']).toEqual('30');
    });

    it('returns the new values via .getParam()', function() {
      expect(ixURL.getParam('dpr')).toEqual('2');
      expect(ixURL.getParam('rot')).toEqual('30');
    });

    it('contains the new values in the full URL', function() {
      var fullUrl = ixURL.getUrl();

      expect(fullUrl).toContain("dpr=2");
      expect(fullUrl).toContain("rot=30");
    });
  });

  describe('Overriding URL parameters', function() {
    describe('with standard behavior', function() {
      var ixURL;

      beforeAll(function() {
        ixURL = new imgix.URL(baseUrl + '?w=200');
        ixURL.setParam('w', 100);
      });

      it('includes the new value in the urlParts.paramValues hash', function() {
        expect(ixURL.urlParts.paramValues['w']).toEqual('100');
      });

      it('returns the new value via .getParam()', function() {
        expect(ixURL.getParam('w')).toEqual('100');
      });
    });

    describe('with an already-set parameter and `doOverride = false`', function() {
      var ixURL;

      beforeAll(function() {
        ixURL = new imgix.URL(baseUrl + '?w=200');
        ixURL.setParam('w', 100, false);
      });

      it('does not include the new value in the urlParts.paramValues hash', function() {
        expect(ixURL.urlParts.paramValues['w']).not.toEqual('100');
      });

      it('does not return the new value via .getParam()', function() {
        expect(ixURL.getParam('w')).not.toEqual('100');
      });
    });

    describe('with an unset parameter and `doOverride = false`', function() {
      var ixURL;

      beforeAll(function() {
        ixURL = new imgix.URL(baseUrl + '?w=200');
        ixURL.setParam('h', 100, false);
      });

      it('includes the new value in the urlParts.paramValues hash', function() {
        expect(ixURL.urlParts.paramValues['h']).toEqual('100');
      });

      it('returns the new value via .getParam()', function() {
        expect(ixURL.getParam('h')).toEqual('100');
      });
    });
  });

  describe('color palettes:', function() {
    var baseUrl = 'http://static-a.imgix.net/macaw.png',
        ixURL;

    beforeAll(function() {
      ixURL = new imgix.URL(baseUrl);
    });

    describe('Fetching without a count argument', function() {
      var colors;

      beforeAll(function(done) {
        ixURL.getColors(function(aColors) {
          colors = aColors;
          done();
        });
      });

      it('returns color strings', function() {
        expect(colors).toBeArrayOfStrings();
      });

      it('returns colors in rgb() format', function() {
        _.each(colors, function(color) {
          expect(color).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
        });
      });

      it('returns only unique colors', function() {
        var uniqueColors = _.uniq(colors);

        expect(colors).toBeArrayOfSize(uniqueColors.length);
      });

      it('returns the right number of colors', function() {
        expect(colors).toBeArrayOfSize(10);
      });
    });

    describe('Fetching with a count argument', function() {
      var colors,
          num = 3;

      beforeAll(function(done) {
        ixURL.getColors(num, function(aColors) {
          colors = aColors;
          done();
        });
      });

      it('returns the right number of colors', function() {
        expect(colors).toBeArrayOfSize(num);
      });
    });
  });
});
