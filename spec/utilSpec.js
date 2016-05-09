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

  describe('encode64', function() {
    it('correctly encodes multibyte characters', function() {
      expect(util.encode64('Hello, world! 👌💞')).toEqual('SGVsbG8sIHdvcmxkISDwn5GM8J-Sng');
    });
  });

  describe('decode64', function() {
    it('correctly decodes multibyte characters', function() {
      expect(util.decode64('SGVsbG8sIHdvcmxkISDwn5GM8J-Sng')).toEqual('Hello, world! 👌💞');
    });
  })
});
