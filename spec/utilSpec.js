var util = require('../src/util.js'),
  btoa = require('btoa'),
  atob = require('atob');

describe('utility methods', function() {
  beforeEach(function() {
    global.btoa = btoa;
    global.atob = atob;
  });

  describe('compact', function() {
    it('removes `false` from the passed array', function() {
      expect(util.compact([false])).toEqual([]);
    });

    it('removes `0` from the passed array', function() {
      expect(util.compact([0])).toEqual([]);
    });

    it('removes `null` from the passed array', function() {
      expect(util.compact([null])).toEqual([]);
    });
  });

  describe('uniq', function() {
    it('removes duplicate numbers', function() {
      expect(util.uniq([1, 1])).toEqual([1]);
    });

    it('removes duplicate strings', function() {
      expect(util.uniq(['a', 'a'])).toEqual(['a']);
    });

    it('removes duplicate boolean values', function() {
      expect(util.uniq([true, true, false, false])).toEqual([true, false]);
    });
  });

  describe('objectEach', function() {
    it('calls the given iterator function once for each property of the given object', function() {
      var iterator = jasmine.createSpy('iterator'),
        object = {
          a: 1,
          b: 2,
          c: 3
        };

      util.objectEach(object, iterator);

      expect(iterator).toHaveBeenCalledWith(object.a, 'a');
      expect(iterator).toHaveBeenCalledWith(object.b, 'b');
      expect(iterator).toHaveBeenCalledWith(object.c, 'c');
    });
  });

  describe('isString', function() {
    it('returns true when given a string value', function() {
      expect(util.isString('Hello, world!')).toEqual(true);
    });

    it('returns false when given a number value', function() {
      expect(util.isString(10)).toEqual(false);
    });

    it('returns false when given a boolean value', function() {
      expect(util.isString(true)).toEqual(false);
    });

    it('returns false when given a null value', function() {
      expect(util.isString(null)).toEqual(false);
    });

    it('returns false when given an object value', function() {
      expect(util.isString({ hello: 'world' })).toEqual(false);
    });

    it('returns false when given an array value', function() {
      expect(util.isString(['Hello world!'])).toEqual(false);
    });

    it('returns false when given no value', function() {
      expect(util.isString()).toEqual(false);
    });
  });

  describe('encode64', function() {
    it('correctly encodes multibyte characters', function() {
      expect(util.encode64('Hello, world! 👌💞')).toEqual(
        'SGVsbG8sIHdvcmxkISDwn5GM8J-Sng'
      );
    });
  });

  describe('decode64', function() {
    it('correctly decodes multibyte characters', function() {
      expect(util.decode64('SGVsbG8sIHdvcmxkISDwn5GM8J-Sng')).toEqual(
        'Hello, world! 👌💞'
      );
    });
  });
});
