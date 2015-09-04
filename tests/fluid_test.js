'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000; // 10 second default interval

describe('.fluid', function() {
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

          if (testCount === callbackCount) {
            done();
          } else {
            // Pass in pinchzoom = 2 here to trigger a request for a new size of image
            fluidSet.updateSrc(img, 2);
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
        baseUrl = 'http://static-a.imgix.net/macaw.png?fit=crop',
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
        pixelStep: 1,
        onLoad: done,
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
        baseUrl = 'http://static-a.imgix.net/macaw.png?fit=crop',
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
        pixelStep: 1,
        onLoad: done,
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

  // Since PhantomJS doesn't properly handle viewport things like window.innerHeight and scrolling,
  // testing lazyLoad features on Phantom is useless.
  if (!/PhantomJS/.test(window.navigator.userAgent)) {
    describe('Lazy-loading images', function() {
      var topImg,
          bottomImg,
          baseUrl = 'http://static-a.imgix.net/macaw.png',
          height = 4000,
          options,
          delay = 2 * 1000;

      beforeAll(function() {
        document.body.style.position = 'relative';
        document.body.style.height = height + 'px';
      });

      beforeEach(function() {
        document.body.style.position = 'relative';
        document.body.style.height = height + 'px';

        topImg = document.createElement('img');
        topImg.setAttribute('data-src', baseUrl);
        topImg.setAttribute('class', 'imgix-fluid');
        topImg.style.position = 'absolute';
        topImg.style.top = 0;
        topImg.style.width = '500px';
        document.body.appendChild(topImg);

        bottomImg = document.createElement('img');
        bottomImg.setAttribute('data-src', baseUrl + '?mono=00ff00');
        bottomImg.setAttribute('class', 'imgix-fluid');
        bottomImg.style.position = 'absolute';
        bottomImg.style.bottom = 0;
        bottomImg.style.width = '500px';
        document.body.appendChild(bottomImg);

        options = {
          lazyLoad: true,
          fitImgTagToContainerWidth: false
        };

        imgix.fluid(options);
      });

      it('loads the image at the top of the page', function(done) {
        // Wait a few seconds for the images to get a chance to load
        _.delay(function() {
          expect(topImg.src).toMatch(baseUrl);
          done();
        }, delay);
      });

      it('does not load the image at the bottom of the page', function(done) {
        // Wait a few seconds for the images to get a chance to load
        _.delay(function() {
          expect(bottomImg.src).toBeFalsy();
          done();
        }, delay);
      });

      it('loads the image at the bottom of the page after scrolling to it', function(done) {
        window.scrollBy(0, height);

        _.delay(function() {
          expect(bottomImg.src).toMatch(baseUrl);
          done();
        }, delay);
      });

      afterEach(function() {
        document.body.removeChild(topImg);
        document.body.removeChild(bottomImg);
        document.body.style.position = 'static';
        document.body.style.height = 'auto';

        window.scrollTo(0, 0);
      });
    });
  }

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
        lazyLoadColor: callbacks.lazyLoadCallback,
        fitImgTagToContainerWidth: false // This is just so we can load images faster
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

