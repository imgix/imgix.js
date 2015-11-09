'use strict';

describe('.helpers', function() {

  describe('.extractInt', function() {
    it('extracts ints correctly', function() {
      expect(imgix.helpers.extractInt("234px")).toEqual(234);
    });
  });

  describe('.pixelRound', function() {
    it('correctly rounds up to the nearest step', function() {
      expect(imgix.helpers.pixelRound(3, 5)).toEqual(5);
      expect(imgix.helpers.pixelRound(23, 5)).toEqual(25);
      expect(imgix.helpers.pixelRound(33, 10)).toEqual(40);
    });
  });

  describe('.isReallyObject', function() {
    it('returns true for plain objects with .isReallyObject()', function() {
      expect(imgix.helpers.isReallyObject({})).toBeTrue();
    });

    it('returns false for other values with .isReallyObject()', function() {
      expect(imgix.helpers.isReallyObject(function() {})).toBeFalse();
      expect(imgix.helpers.isReallyObject('a')).toBeFalse();
      expect(imgix.helpers.isReallyObject(3)).toBeFalse();
      expect(imgix.helpers.isReallyObject(new imgix.URL())).toBeFalse();
    });
  });

  describe('.isFluidSet', function() {
    it('returns true for FluidSet objects with .isFluidSet()', function() {
      expect(imgix.helpers.isFluidSet(new imgix.FluidSet())).toBeTrue();
    });

    it('returns false for other values with .isFluidSet()', function() {
      expect(imgix.helpers.isFluidSet({})).toBeFalse();
      expect(imgix.helpers.isFluidSet(new imgix.URL())).toBeFalse();
    });
  });

  describe('.matchesSelector', function() {
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
