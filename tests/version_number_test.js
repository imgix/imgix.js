'use strict';

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
