'use strict';

describe('imgix-javascript unit tests', function() {

	beforeEach(function() {
		// nothing for now
	});

	it('parses url', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?w=500&sepia=33');
		expect(i.params, ["w", "sepia"]);

		expect(i.urlParts.paramValues["w"], 500);
		expect(i.urlParts.paramValues["sepia"], 33);
	});

	it('sets url params', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png');
		i.setRotate(30);

		expect(i.urlParts.paramValues["rot"], 30);
		expect(i.getParam('rot'), 30);
		expect(i.getRotate(), 30);
		expect(i.getUrl()).toContain("rot=30");
	});

	it('sets params in constructor', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png', {w: 200, sepia: 50});

		expect(i.urlParts.paramValues["w"], 200);
		expect(i.getParam('w'), 200);
		expect(i.getWidth(), 200);
		expect(i.getUrl()).toContain("w=200");

		expect(i.urlParts.paramValues["sepia"], 50);
		expect(i.getParam('sepia'), 50);
		expect(i.getSepia(), 50);
		expect(i.getUrl()).toContain("sepia=50");
	});

	it('sets multiple url params', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png');

		i.setParams({rot: 30, w: 100});

		expect(i.urlParts.paramValues["rot"], 30);
		expect(i.getParam('rot'), 30);
		expect(i.getRotate(), 30);
		expect(i.getUrl()).toContain("rot=30");

		expect(i.urlParts.paramValues["w"], 100);
		expect(i.getParam('w'), 100);
		expect(i.getWidth(), 100);
		expect(i.getUrl()).toContain("w=100");
	});

	it('clear params', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?w=500&sepia=50');

		i.clearParams();
		expect(i.params, []);
	});

	it('clearThenSetParams', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?w=500&sepia=50');

		i.clearThenSetParams({h: 100, blur: 50});
		expect(i.params, ["h", "blur"]);
	});

	it('overrides url params', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?blur=40');

		expect(i.urlParts.paramValues["blur"], 40);
		expect(i.getBlur(), 40);

		i.setBlur(50); // now override

		expect(i.urlParts.paramValues["blur"], 50);
		expect(i.getBlur(), 50);
	});

	it('has fonts', function() {
		expect(imgix.isFontAvailable("Verdana"), true);
		expect(imgix.isFontAvailable("Blarg"), false);

		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?blur=40');
		i.setTextFont("American Typewriter Condensed Bold");
		expect(i.getTextFont(), "American Typewriter Condensed,bold");

		// search fonts
		expect(imgix.searchFonts('arial'), ["Arial", "Arial Black", "Arial Bold", "Arial Bold Italic", "Arial Italic"]);

		expect(imgix.searchFonts('blah'), []);
	});

	it('overrides url params', function() {
		var i2 = new imgix.URL('http://static-a.imgix.net/macaw.png');
		i2.setRotate(33, false); // should override since does not exist
		expect(i2.urlParts.paramValues["rot"], 33);
		expect(i2.getRotate(), 33);

		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?blur=40');
		expect(i.urlParts.paramValues["blur"], 40);
		expect(i.getBlur(), 40);

		i.setBlur(50, false); // should NOT override since does exist

		expect(i.urlParts.paramValues["blur"], 40);
	});
});
