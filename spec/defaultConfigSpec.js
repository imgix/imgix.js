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

  it('defaults `srcAttribute` to `src`', function() {
    expect(defaultConfig.srcAttribute).toEqual('src');
  });

  it('defaults `srcsetAttribute` to `srcset`', function() {
    expect(defaultConfig.srcsetAttribute).toEqual('srcset');
  });

  it('defaults `sizesAttribute` to `sizes`', function() {
    expect(defaultConfig.sizesAttribute).toEqual('sizes');
  });

  it('defaults `srcInputAttribute` to `ix-src`', function() {
    expect(defaultConfig.srcInputAttribute).toEqual('ix-src');
  });

  it('defaults `pathInputAttribute` to `ix-path`', function() {
    expect(defaultConfig.pathInputAttribute).toEqual('ix-path');
  });

  it('defaults `paramsInputAttribute` to `ix-params`', function() {
    expect(defaultConfig.paramsInputAttribute).toEqual('ix-params');
  });

  it('defaults `hostInputAttribute` to `ix-host`', function() {
    expect(defaultConfig.hostInputAttribute).toEqual('ix-host');
  });
});
