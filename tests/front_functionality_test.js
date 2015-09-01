'use strict';

describe('Font functionality', function() {
  describe('.isFontAvailable', function() {
    it('finds a valid font', function() {
      expect(imgix.isFontAvailable("Verdana")).toBe(true);
    });

    it('does not find an invalid font', function() {
      expect(imgix.isFontAvailable("Blarg")).not.toBe(true);
    });
  });

  describe('.searchFonts', function() {
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
});

