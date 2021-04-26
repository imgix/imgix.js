var setImageSize = require('../src/autoSize');

describe('autoSize.js', function () {
  describe('setImageSize', function () {
    it('exists', function () {
      const i = setImageSize;
      expect([i]).toEqual([setImageSize]);
    });

    it('sets the sizes attribute of an img node', function () {
      const parent = {
        attributes: [{ name: 'offsetWidth', value: '100px' }],
        nodeName: 'div',
        hasAttributes: () => ({
          attributes: [{ name: 'offsetWidth', value: '100px' }],
        }),
      };

      const attributes = { name: 'sizes', value: 'auto' };

      const img = {
        parentNode: parent,
        attributes: [attributes],
        nodeName: 'img',
        complete: true,
        hasAttributes: () => ({
          attributes: [attributes],
        }),
        setAttribute: (attr, value) => (attributes[attr] = value),
      };

      const res = setImageSize({ img });
      expect(res).toEqual(true);
    });
  });
});
