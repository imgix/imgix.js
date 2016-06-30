var defaultConfig = require('../src/defaultConfig.js');

describe('default configuration', function() {
  it('defaults `host` to `null`', function() {
    expect(defaultConfig.host).toEqual(null);
  });

  it('defaults `useHttps` to `true`', function() {
    expect(defaultConfig.useHttps).toEqual(true);
  });

  it('defaults `includeLibraryParam` to `true`', function() {
    expect(defaultConfig.includeLibraryParam).toEqual(true);
  });
});
