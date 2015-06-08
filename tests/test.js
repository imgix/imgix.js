'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000; // 10 second default interval

describe('imgix-js:', function() {

  describe('The version number', function() {
    it('exists', function() {
      expect(imgix.version).toBeDefined();
    });

    it ('is a string', function() {
      expect(imgix.version).toBeString();
    });

    it ('is a proper semver', function() {
      expect(imgix.version).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+$/);
    });
  });

  describe('imgix.onready:', function() {
    var callbacks = [
      function() {},
      function() {}
    ];

    beforeEach(function(done) {
      spyOn(callbacks, 0);

      imgix.onready(function() {
        callbacks[0]();
        done();
      });
    });

    it('files callbacks when ready', function() {
      expect(callbacks[0]).toHaveBeenCalled();
    });

    it('files subsequent callbacks immediately', function() {
      spyOn(callbacks, 1);

      imgix.onready(callbacks[1]);

      expect(callbacks[1]).toHaveBeenCalled();
    });
  });

  describe('imgix.URL():', function() {
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

      it('returns the correct values via param-specific getters', function() {
        expect(ixURL.getWidth()).toEqual('500');
        expect(ixURL.getSepia()).toEqual('33');
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

      it('returns the correct values via param-specific getters', function() {
        expect(ixURL.getWidth()).toEqual('500');
        expect(ixURL.getSepia()).toEqual('33');
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

      it('returns the correct values via param-specific getters', function() {
        expect(ixURL.getWidth()).toEqual('500');
        expect(ixURL.getSepia()).toEqual('33');
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
        ixURL.setRotate(30);
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

      it('returns the new value via a param-specific getter', function() {
        expect(ixURL.getRotate()).toEqual('30');
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
        ixURL.setText(string);
      });

      it('returns the new value via .getParam()', function() {
        expect(ixURL.getParam('txt')).toEqual(encodedString);
      });

      it('returns the new value via a param-specific getter', function() {
        expect(ixURL.getText()).toEqual(encodedString);
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

      it('returns the new values via param-specific getters', function() {
        expect(ixURL.getDPR()).toEqual('2');
        expect(ixURL.getRotate()).toEqual('30');
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
        ixURL.setDPR(2).setRotate(30);
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

      it('returns the new values via param-specific getters', function() {
        expect(ixURL.getDPR()).toEqual('2');
        expect(ixURL.getRotate()).toEqual('30');
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

      it('does not return the new value via a param-specific getter', function() {
        expect(ixURL.getSepia()).not.toBeDefined();
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
        ixURL.setSepia(null);
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

      it('does not return the new value via a param-specific getter', function() {
        expect(ixURL.getSepia()).not.toBeDefined();
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

      it('does not return any values via param-specific getters', function() {
        expect(ixURL.getWidth()).not.toBeDefined();
        expect(ixURL.getSepia()).not.toBeDefined();
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

      it('does not return the intial values via param-specific getters', function() {
        expect(ixURL.getWidth()).not.toBeDefined();
        expect(ixURL.getSepia()).not.toBeDefined();
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

      it('returns the new values via param-specific getters', function() {
        expect(ixURL.getDPR()).toEqual('2');
        expect(ixURL.getRotate()).toEqual('30');
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
          ixURL.setWidth(100);
        });

        it('includes the new value in the urlParts.paramValues hash', function() {
          expect(ixURL.urlParts.paramValues['w']).toEqual('100');
        });

        it('returns the new value via .getParam()', function() {
          expect(ixURL.getParam('w')).toEqual('100');
        });

        it('returns the new value via a param-specific getter', function() {
          expect(ixURL.getWidth()).toEqual('100');
        });
      });

      describe('with an already-set parameter and `doOverride = false`', function() {
        var ixURL;

        beforeAll(function() {
          ixURL = new imgix.URL(baseUrl + '?w=200');
          ixURL.setWidth(100, false);
        });

        it('does not include the new value in the urlParts.paramValues hash', function() {
          expect(ixURL.urlParts.paramValues['w']).not.toEqual('100');
        });

        it('does not return the new value via .getParam()', function() {
          expect(ixURL.getParam('w')).not.toEqual('100');
        });

        it('does not return the new value via a param-specific getter', function() {
          expect(ixURL.getWidth()).not.toEqual('100');
        });
      });

      describe('with an unset parameter and `doOverride = false`', function() {
        var ixURL;

        beforeAll(function() {
          ixURL = new imgix.URL(baseUrl + '?w=200');
          ixURL.setHeight(100, false);
        });

        it('includes the new value in the urlParts.paramValues hash', function() {
          expect(ixURL.urlParts.paramValues['h']).toEqual('100');
        });

        it('returns the new value via .getParam()', function() {
          expect(ixURL.getParam('h')).toEqual('100');
        });

        it('returns the new value via a param-specific getter', function() {
          expect(ixURL.getHeight()).toEqual('100');
        });
      });
    });

    describe('Setting invalid parameters', function() {
      var ixURL;

      beforeAll(function() {
        ixURL = new imgix.URL(baseUrl);
      });

      it('warns in console when trying to set an invalid parameter name', function() {
        spyOn(console, 'warn');
        ixURL.setParam('jasdlkfja', 1);
        expect(console.warn).toHaveBeenCalled();
      });

      it('warns in console when trying to set an invalid parameter object', function() {
        spyOn(console, 'warn');
        ixURL.setParams(ixURL);
        expect(console.warn).toHaveBeenCalled();
      });
    });
  });

  describe('imgix.URL() color palettes:', function() {
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

  describe('Element manipulation:', function() {
    describe('Detecting an image element', function() {
      var img,
          notImg;

      beforeAll(function() {
        img = document.createElement('img');
        notImg = document.createElement('video');
      });

      it('determines which elements are images', function() {
        expect(imgix.isImageElement(img)).toBeTrue();
        expect(imgix.isImageElement(notImg)).toBeFalse();
      });
    });

    describe('Extracting an element\'s image', function() {
      var img,
          alsoImg,
          notImg,
          baseUrl = 'http://static-a.imgix.net/macaw.png';

      beforeAll(function() {
        img = document.createElement('img');
        img.src = baseUrl;

        alsoImg = document.createElement('img');
        alsoImg.setAttribute('data-src', baseUrl);

        notImg = document.createElement('div');
        notImg.style.backgroundImage = 'url(' + baseUrl + ')';
      });

      it('returns the src attribute for image elements', function() {
        expect(imgix.getElementImage(img)).toEqual(baseUrl);
      });

      it('returns nothing for image elements with only a data-src', function() {
        expect(imgix.getElementImage(alsoImg)).not.toBeTruthy();
      });

      it('returns the backgroundImage for non-image elements', function() {
        expect(imgix.getElementImage(notImg)).toMatch(baseUrl);
      });
    });

    describe('Setting an element\'s image', function() {
      var img,
          notImg,
          baseUrl = 'http://static-a.imgix.net/macaw.png';

      beforeAll(function() {
        img = document.createElement('img');
        notImg = document.createElement('div');

        imgix.setElementImage(img, baseUrl + '?w=500');
        imgix.setElementImage(notImg, baseUrl + '?w=500');
      });

      it('sets the src attribute of an image element', function() {
        expect(img.src).toMatch(baseUrl);
      });

      it('sets the backgroundImage of an image element', function() {
        expect(notImg.style.backgroundImage).toMatch(baseUrl);
      });
    });

    describe('Setting an element\'s image asynchronously', function() {
      var img,
          baseUrl = baseUrl = 'http://static-a.imgix.net/macaw.png?w=500';

      beforeEach(function(done) {
        img = document.createElement('img');

        imgix.setElementImageAfterLoad(img, baseUrl, function() {
          done();
        });
      });

      it('sets the src attribute of an image element', function() {
        expect(img.src).toEqual(baseUrl);
      });
    });

    describe('Attaching images to an element by reference', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png?w=500',
          ixURL;

      beforeEach(function(done) {
        img = document.createElement('img');

        document.body.appendChild(img);

        ixURL = new imgix.URL(baseUrl);
        ixURL.attachImageTo(img, done);
      });

      it('attaches the new URL to the image element', function() {
        expect(img.src).toEqual(ixURL.getUrl());
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    describe('Attaching images to an element by selector', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png?w=500',
          id = 'image',
          ixURL;

      beforeEach(function(done) {
        img = document.createElement('img');
        img.id = id;

        document.body.appendChild(img);

        ixURL = new imgix.URL(baseUrl);
        ixURL.attachImageTo('#' + id, done);
      });

      it('attaches the new URL to the image element', function() {
        expect(img.src).toEqual(ixURL.getUrl());
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    describe('Attaching images to elements by selector', function() {
      var img1,
          img2,
          baseUrl = 'http://static-a.imgix.net/macaw.png?w=500',
          className = 'image',
          ixURL,
          doneCount = 0;

      beforeEach(function(done) {
        img1 = document.createElement('img');
        img1.className = className;

        img2 = document.createElement('img');
        img2.className = className;

        document.body.appendChild(img1);
        document.body.appendChild(img2);

        ixURL = new imgix.URL(baseUrl);

        ixURL.attachImageTo('.' + className, function() {
          doneCount++;

          if (doneCount === 2) {
            done();
          }
        });
      });

      it('attaches the new URL to the image elements', function() {
        expect(img1.src).toEqual(ixURL.getUrl());
        expect(img2.src).toEqual(ixURL.getUrl());
      });

      afterEach(function() {
        document.body.removeChild(img1);
        document.body.removeChild(img2);
      });
    });

    describe('Attaching gradients to elements', function() {
      var el,
          baseUrl = 'http://static-a.imgix.net/macaw.png?w=500',
          ixURL;

      beforeEach(function() {
        el = document.createElement('div');
        document.body.appendChild(el);
      });

      describe('without a base color', function() {
        var ixURL,
            backgroundImage;

        beforeEach(function(done) {
          ixURL = new imgix.URL(baseUrl);
          ixURL.attachGradientTo(el, undefined, function() {
            backgroundImage = el.style.backgroundImage;
            done();
          });
        });

        it('adds a gradient to the element', function() {
          expect(backgroundImage).toBeDefined();
          expect(backgroundImage).toMatch('linear-gradient');
        });

        it('does not apply a basecolor to the gradient', function() {
          expect(backgroundImage).toMatch('transparent');
        });
      });

      describe('with a solid base color', function() {
        var ixURL,
            backgroundImage,
            knownRGB = 'rgb(251, 150, 23)',
            rgbaRegex = /rgba\(251, 150, 23, (0(?:\.\d+)?)\)/g;

        beforeEach(function(done) {
          ixURL = new imgix.URL(baseUrl);
          ixURL.attachGradientTo(el, knownRGB, function() {
            backgroundImage = el.style.backgroundImage;
            done();
          });
        });

        it('applies the basecolor to the gradient at roughly 0.5 opacity', function() {
          var lookup = rgbaRegex.exec(backgroundImage);

          expect(lookup).not.toBeNull();
          expect(lookup).toBeArrayOfSize(2);
          expect(parseFloat(lookup[1])).toBeCloseTo(0.5);
        });

        it('applies the basecolor to the gradient at 0 opacity', function() {
          var lookup = rgbaRegex.exec(backgroundImage);

          expect(lookup).not.toBeNull();
          expect(lookup).toBeArrayOfSize(2);
          expect(lookup[1]).toBeCloseTo(0);
        });
      });

      describe('with a semi-transparent base color', function() {
        var ixURL,
            backgroundImage,
            alpha = 0.8,
            knownRGBA = 'rgba(251, 150, 23, ' + alpha + ')',
            rgbaRegex = /rgba\(251, 150, 23, (0(?:\.\d+)?)\)/g;

        beforeEach(function(done) {
          ixURL = new imgix.URL(baseUrl);

          ixURL.attachGradientTo(el, knownRGBA, function() {
            backgroundImage = el.style.backgroundImage;
            done();
          });
        });

        it('adds a gradient to the element', function() {
          expect(backgroundImage).toBeDefined();
          expect(backgroundImage).toMatch('linear-gradient');
        });

        it('applies the basecolor to the gradient at roughly the supplied opacity', function() {
          var lookup = rgbaRegex.exec(backgroundImage);

          expect(lookup).not.toBeNull();
          expect(lookup).toBeArrayOfSize(2);
          expect(parseFloat(lookup[1])).toBeCloseTo(alpha);
        });

        it('applies the basecolor to the gradient at 0 opacity', function() {
          var lookup = rgbaRegex.exec(backgroundImage);

          expect(lookup).not.toBeNull();
          expect(lookup).toBeArrayOfSize(2);
          expect(lookup[1]).toBeCloseTo(0);
        });
      });

      afterEach(function() {
        document.body.removeChild(el);
      });
    });

    describe('Auto-updating an element', function() {
      var img,
          id = 'test-' + Date.now(),
          ixURL,
          baseUrl = 'http://static-a.imgix.net/macaw.png?w=500',
          updateData;

      beforeAll(function(done) {
        img = document.createElement('img');
        img.id = id;
        img.src = baseUrl;

        document.body.appendChild(img);

        ixURL = new imgix.URL(baseUrl);

        ixURL.autoUpdateImg('#' + id, function(data) {
          updateData = data;
          done();
        });

        ixURL.setRotate(30);
      });

      describe('Callback data', function() {
        it('includes the correct element', function() {
          expect(updateData.element).toBe(img);
        });

        it('is complete', function() {
          expect(updateData.isComplete).toBe(true);
        });

        it('has completion percentage', function() {
          expect(updateData.totalComplete).toBe(1);
          expect(updateData.percentComplete).toBe(100);
        });

        it('has image numbers', function() {
          expect(updateData.total).toBe(1);
          expect(updateData.totalComplete).toBe(1);
        });

        it('has load time', function() {
          expect(updateData.isComplete).toBeGreaterThan(-1);
        });
      });

      describe('Image update', function() {
        it('has the new value in its src', function() {
          expect(img.src).toContain('rot=30');
        });
      });

      afterAll(function() {
        document.body.removeChild(img);
      });
    });
  });

  describe('Font functionality', function() {
    it('finds a valid font', function() {
      expect(imgix.isFontAvailable("Verdana")).toBe(true);
    });

    it('does not find an invalid font', function() {
      expect(imgix.isFontAvailable("Blarg")).not.toBe(true);
    });

    it('finds fonts matching a valid input', function() {
      var search = imgix.searchFonts("arial");

      expect(search.length).toBeGreaterThan(0);
      expect(search).toContain('Arial Black');
    });

    it('does not find any fonts matching a invalid input', function() {
      var search = imgix.searchFonts("blah");

      expect(search.length).toEqual(0);
    });
  });

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

        ixURL.setBlend(knownRGB);
        result = ixURL.getBlend();

        expect(result).toBeString();
        expect(result).toMatch(hexRegex);
      });

      it('sets a hex color when using setParams() and passing an RGB color string', function() {
        var result;

        ixURL.setParams({mono: knownRGB});
        result = ixURL.getMonochrome();

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

  describe('XPath functionality', function() {
    var el;

    beforeAll(function() {
      el = document.createElement('img');
      document.body.appendChild(el);
    });

    it('extracts XPath correctly', function() {
      expect(imgix.getElementTreeXPath(el)).toEqual('/html/body/img');
    });

    afterAll(function() {
      document.body.removeChild(el);
    });
  });

  describe('Helper methods', function() {
    it('extracts ints correctly', function() {
      expect(imgix.helpers.extractInt("234px")).toEqual(234);
    });

    it('correctly reports zoom level', function() {
      expect(imgix.helpers.getZoom()).toEqual(1);
    });

    it('correctly rounds up to the nearest step', function() {
      expect(imgix.helpers.pixelRound(3, 5)).toEqual(5);
      expect(imgix.helpers.pixelRound(23, 5)).toEqual(25);
      expect(imgix.helpers.pixelRound(33, 10)).toEqual(40);
    });

    it('returns true for plain objects with .isReallyObject()', function() {
      expect(imgix.helpers.isReallyObject({})).toBeTrue();
    });

    it('returns false for other values with .isReallyObject()', function() {
      expect(imgix.helpers.isReallyObject(function() {})).toBeFalse();
      expect(imgix.helpers.isReallyObject('a')).toBeFalse();
      expect(imgix.helpers.isReallyObject(3)).toBeFalse();
      expect(imgix.helpers.isReallyObject(new imgix.URL())).toBeFalse();
    });

    it('returns true for FluidSet objects with .isFluidSet()', function() {
      expect(imgix.helpers.isFluidSet(new imgix.FluidSet())).toBeTrue();
    });

    it('returns false for other values with .isReallyObject()', function() {
      expect(imgix.helpers.isFluidSet({})).toBeFalse();
      expect(imgix.helpers.isFluidSet(new imgix.URL())).toBeFalse();
    });

    describe('imgix.helpers.matchesSelector()', function() {
      var el,
          className = 'imgix-fluid';

      beforeAll(function() {
        el = document.createElement('div');
        el.setAttribute('class', className);
        document.body.appendChild(el);
      });

      it('returns true for matching selectors', function() {
        expect(imgix.helpers.matchesSelector(el, '.' + className)).toBeTrue();
      });

      it('returns false for non-matching selectors', function() {
        expect(imgix.helpers.matchesSelector(el, '.foobarbaz')).toBeFalse();
      });

      afterAll(function() {
        document.body.removeChild(el);
      });
    });
  });

  describe('imgix.fluid():', function() {
    describe('Setting config keys', function() {
      beforeEach(function() {
        spyOn(console, 'warn');
      });

      it('warns in console when trying to set an invalid key', function() {
        imgix.fluid({
          obviouslyBad: true
        });

        expect(console.warn).toHaveBeenCalled();
      });

      it('warns in console when trying to set multiple invalid keys', function() {
        imgix.fluid({
          obviouslyBad: true,
          thisIsNotValid: false
        });

        expect(console.warn).toHaveBeenCalled();
      });

      it('does not warn in console when no keys are set', function() {
        imgix.fluid();

        expect(console.warn).not.toHaveBeenCalled();
      });

      it('does not warn in console when setting valid keys', function() {
        imgix.fluid({
          pixelStep: 25,
          debounce: 250
        });

        expect(console.warn).not.toHaveBeenCalled();
      });
    });

    describe('Firing onLoad callbacks', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png?w=500',
          options,
          testCount = 0,
          callbacks = [
              function() {},
              function() {}
            ];

      beforeEach(function(done) {
        var callbackCount = 0,
            fluidSet;

        img = document.createElement('img');
        img.setAttribute('data-src', baseUrl);
        img.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(img);

        spyOn(callbacks, 0);
        spyOn(callbacks, 1);

        options = {
          onLoad: function() {
              callbacks[callbackCount]();
              callbackCount++;

              img.addEventListener('load', function() {
                fluidSet.updateSrc(img);
              }, false);
              img.src = baseUrl + '&mono=ff0000';

              if (testCount === callbackCount) {
                done();
              }
            }
        };

        fluidSet = imgix.fluid(options);

        testCount++;
      });

      it('fires an onLoad callback initially', function() {
        expect(callbacks[0]).toHaveBeenCalled();
        expect(callbacks[1]).not.toHaveBeenCalled();
      });

      it('fires the onLoad callback again when the image\'s src is updated', function() {
        expect(callbacks[0]).toHaveBeenCalled();
        expect(callbacks[1]).toHaveBeenCalled();
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    describe('Marking an image with the `imgix-fluid` class as fluid', function() {
      var marked,
          notMarked,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          options;

      beforeEach(function(done) {
        marked = document.createElement('img');
        marked.setAttribute('data-src', baseUrl + '?w=500');
        marked.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(marked);

        notMarked = document.createElement('img');
        notMarked.setAttribute('data-src', baseUrl + '?w=500');
        document.body.appendChild(notMarked);

        options = {
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('sets the src attribute of an image with the `imgix-fluid` class', function() {
        expect(marked.src).toMatch(baseUrl);
      });

      it('does not set the src attribute of the image without the `imgix-fluid` class', function() {
        expect(notMarked.src).not.toMatch(baseUrl);
      });

      afterEach(function() {
        document.body.removeChild(marked);
        document.body.removeChild(notMarked);
      });
    });

    describe('Marking an image with a custom class as fluid', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          className = 'testing',
          options;

      beforeEach(function(done) {
        img = document.createElement('img');
        img.setAttribute('data-src', baseUrl + '?w=500');
        img.setAttribute('class', className);
        document.body.appendChild(img);

        options = {
          fluidClass: className,
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('sets the src attribute of the image', function() {
        expect(img.src).toMatch(baseUrl);
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    describe('Marking an image as fluid when it\'s hidden', function() {
      var hiddenImg,
          visibleImg,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          options;

      beforeEach(function(done) {
        hiddenImg = document.createElement('img');
        hiddenImg.setAttribute('data-src', baseUrl + '?w=500');
        hiddenImg.setAttribute('class', 'imgix-fluid');
        hiddenImg.style.display = 'none';
        document.body.appendChild(hiddenImg);

        visibleImg = document.createElement('img');
        visibleImg.setAttribute('data-src', baseUrl + '?w=500');
        visibleImg.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(visibleImg);

        options = {
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('doesn\'t set the src attribute of the image', function() {
        expect(hiddenImg.src).not.toMatch(baseUrl);
      });

      afterEach(function() {
        document.body.removeChild(hiddenImg);
        document.body.removeChild(visibleImg);
      });
    });

    describe('Marking an image as fluid when its container is hidden', function() {
      var parent,
          child,
          notChild,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          options;

      beforeEach(function(done) {
        parent = document.createElement('div');
        parent.style.display = 'none';
        document.body.appendChild(parent);

        child = document.createElement('img');
        child.setAttribute('data-src', baseUrl) + '?w=500';
        child.setAttribute('class', 'imgix-fluid');
        parent.appendChild(child);

        notChild = document.createElement('img');
        notChild.setAttribute('data-src', baseUrl + '?w=500');
        notChild.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(notChild);

        options = {
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('doesn\'t set the src attribute of the image', function() {
        expect(child.src).not.toMatch(baseUrl);
      });

      afterEach(function() {
        document.body.removeChild(parent);
        document.body.removeChild(notChild);
      });
    });

    describe('Marking an image as fluid, limited by a container node', function() {
      var parent,
          child,
          notChild,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          options;

      beforeEach(function(done) {
        parent = document.createElement('div');
        document.body.appendChild(parent);

        child = document.createElement('img');
        child.setAttribute('data-src', baseUrl) + '?w=500';
        child.setAttribute('class', 'imgix-fluid');
        parent.appendChild(child);

        notChild = document.createElement('img');
        notChild.setAttribute('data-src', baseUrl + '?w=500');
        notChild.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(notChild);

        options = {
          onLoad: done
        };

        imgix.fluid(parent, options);
      });

      it('sets the src attribute of the child image', function() {
        expect(child.src).toMatch(baseUrl);
      });

      it('doesn\'t set the src attribute of the non-child image', function() {
        expect(notChild.src).not.toMatch(baseUrl);
      });

      afterEach(function() {
        document.body.removeChild(parent);
        document.body.removeChild(notChild);
      });
    });

    describe('Marking an image as fluid with a custom class, limited by a container node', function() {
      var parent,
          child,
          notChild,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          className = 'testing',
          options;

      beforeEach(function(done) {
        parent = document.createElement('div');
        document.body.appendChild(parent);

        child = document.createElement('img');
        child.setAttribute('data-src', baseUrl + '?w=500');
        child.setAttribute('class', className);
        parent.appendChild(child);

        notChild = document.createElement('img');
        notChild.setAttribute('data-src', baseUrl + '?w=500');
        notChild.setAttribute('class', className);
        document.body.appendChild(notChild);

        options = {
          fluidClass: className,
          onLoad: done
        };

        imgix.fluid(parent, options);
      });

      it('sets the src attribute of the child image', function() {
        expect(child.src).toMatch(baseUrl);
      });

      it('doesn\'t set the src attribute of the non-child image', function() {
        expect(notChild.src).not.toMatch(baseUrl);
      });

      afterEach(function() {
        document.body.removeChild(parent);
        document.body.removeChild(notChild);
      });
    });

    describe('Setting `fitImgTagToContainerWidth` to true', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          parentSize,
          options;

      beforeEach(function(done) {
        img = document.createElement('img');
        img.setAttribute('data-src', baseUrl);
        img.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(img);

        parentSize = imgix.helpers.calculateElementSize(document.body);

        options = {
          fitImgTagToContainerWidth: true,
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('requests an image that matches the width of the image\'s container', function() {
        var lookup = /w=(\d+)/g.exec(img.src);

        expect(lookup).not.toBeNull();
        expect(lookup).toBeArrayOfSize(2);
        expect(parseInt(lookup[1], 10)).toEqual(parentSize.width);
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    describe('Setting `fitImgTagToContainerHeight` to true', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          parentSize,
          options;

      beforeEach(function(done) {
        img = document.createElement('img');
        img.setAttribute('data-src', baseUrl);
        img.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(img);

        parentSize = imgix.helpers.calculateElementSize(document.body);

        options = {
          fitImgTagToContainerHeight: true,
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('requests an image that matches the height of the image\'s container', function() {
        var lookup = /h=(\d+)/g.exec(img.src);

        expect(lookup).not.toBeNull();
        expect(lookup).toBeArrayOfSize(2);
        expect(parseInt(lookup[1], 10)).toEqual(parentSize.height);
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    describe('Setting a maximum width', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          max = 200,
          options;

      beforeEach(function(done) {
        img = document.createElement('img');
        img.setAttribute('data-src', baseUrl);
        img.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(img);

        options = {
          fitImgTagToContainerWidth: true,
          fitImgTagToContainerHeight: true,
          maxWidth: max,
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('requests an image that matches the maximmum width', function() {
        var lookup = /w=(\d+)/g.exec(img.src);

        expect(lookup).not.toBeNull();
        expect(lookup).toBeArrayOfSize(2);
        expect(parseInt(lookup[1], 10)).toEqual(max);
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    describe('Setting a maximum height', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          max = 200,
          options;

      beforeEach(function(done) {
        img = document.createElement('img');
        img.setAttribute('data-src', baseUrl);
        img.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(img);

        options = {
          fitImgTagToContainerWidth: true,
          fitImgTagToContainerHeight: true,
          maxHeight: max,
          onLoad: done
        };

        imgix.fluid(options);
      });

      it('requests an image that matches the maximmum height', function() {
        var lookup = /h=(\d+)/g.exec(img.src);

        expect(lookup).not.toBeNull();
        expect(lookup).toBeArrayOfSize(2);
        expect(parseInt(lookup[1], 10)).toEqual(max);
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });

    xdescribe('Lazy-loading images', function() {
      var topImg,
          bottomImg,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          top = 2000,
          options,
          delay = 8000;

      beforeEach(function(done) {
        topImg = document.createElement('img');
        topImg.setAttribute('data-src', baseUrl + '?w=500');
        topImg.setAttribute('class', 'imgix-fluid');
        document.body.appendChild(topImg);

        bottomImg = document.createElement('img');
        bottomImg.setAttribute('data-src', baseUrl + '?mono=00ff00&w=500');
        bottomImg.setAttribute('class', 'imgix-fluid');
        bottomImg.style.marginTop = top + 'px';
        document.body.appendChild(bottomImg);

        options = {
          lazyLoad: true
        };

        imgix.fluid(options);

        // Fire done on a delay instead of on load, in case one load finishes faster
        // than the other
        _.delay(done, delay);
      });

      it('loads the image at the top of the page', function() {
        expect(topImg.src).toMatch(baseUrl);
      });

      it('does not load the image at the bottom of the page', function() {
        expect(bottomImg.src).toBeFalsy();
      });

      afterEach(function() {
        document.body.removeChild(topImg);
        document.body.removeChild(bottomImg);
      });
    });

    describe('Using lazyLoadColor', function() {
      var img,
          baseUrl = 'http://static-a.imgix.net/macaw.png?w=500',
          foundColors,
          options,
          callbacks = {};

      beforeEach(function(done) {
        callbacks.lazyLoadCallback = function(elem, colors) {
          foundColors = colors;
          _.defer(done);

          return colors[0];
        };

        img = document.createElement('img');
        img.setAttribute('data-src', baseUrl);
        img.setAttribute('class', 'imgix-fluid');
        img.style.position = 'absolute';
        img.style.top = 2000 + 'px';
        document.body.appendChild(img);

        spyOn(callbacks, 'lazyLoadCallback').and.callThrough();

        options = {
          lazyLoad: true,
          lazyLoadColor: callbacks.lazyLoadCallback
        };

        imgix.fluid(options);
      });

      it('calls the lazyLoadColor callback', function() {
        expect(callbacks.lazyLoadCallback).toHaveBeenCalled();
      });

      it('returns the an array of 16 colors', function() {
        expect(foundColors).toBeArrayOfSize(16);
      });

      it('sets the image\'s background color to the first color', function() {
        expect(img.style.backgroundColor).toEqual(foundColors[0]);
      });

      afterEach(function() {
        document.body.removeChild(img);
      });
    });
  });
});
