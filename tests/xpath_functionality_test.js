'use strict';

describe('XPath functionality', function() {
  var el;

  beforeAll(function() {
    el = document.createElement('img');
    document.body.appendChild(el);
  });

  it('extracts XPath correctly', function() {
    expect(imgix.getElementTreeXPath(el)).toEqual('/html/body/img');
  });

  afterAll(function() {
    document.body.removeChild(el);
  });
});
