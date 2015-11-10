'use strict';


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

      ixURL.setParam('rot', 30);
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

