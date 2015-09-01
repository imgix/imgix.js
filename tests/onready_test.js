'use strict';

describe('.onready:', function() {
  var callbacks = [
    function() {},
    function() {}
  ];

  beforeEach(function(done) {
    spyOn(callbacks, 0);

    imgix.onready(function() {
      callbacks[0]();
      done();
    });
  });

  it('files callbacks when ready', function() {
    expect(callbacks[0]).toHaveBeenCalled();
  });

  it('files subsequent callbacks immediately', function() {
    spyOn(callbacks, 1);

    imgix.onready(callbacks[1]);

    expect(callbacks[1]).toHaveBeenCalled();
  });
});
