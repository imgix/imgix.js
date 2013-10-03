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
		expect(i.getRotate, 30);
		expect(i.getUrl()).toContain("rot=30");
	});

	it('overrides url params', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?blur=40');

		expect(i.urlParts.paramValues["blur"], 40);
		expect(i.getBlur(), 40);

		i.setBlur(50); // now override

		expect(i.urlParts.paramValues["blur"], 50);
		expect(i.getBlur(), 50);
	});

	// it('is defined', function() {
	// 	expect(imgix.isDef(undefined)).toBe(false);
	// 	expect(imgix.isDef(null)).toBe(true);
	// 	expect(imgix.isDef(0)).toBe(true);
	// 	expect(imgix.isDef(-1)).toBe(true);
	// 	expect(imgix.isDef("imgix")).toBe(true);
	// });

	// it('parses uri', function() {
	// 	var uri = 'https://static.imgix.net/treefrog.jpg?sepia=100&rot=83&w=770&htn=28&px=17';
	// 	var result = imgix.parseUri(uri);
	// 	expect(result.protocol).toBe('https');
	// 	expect(result.host).toBe('static.imgix.net');
	// 	expect(result.port).toBe(undefined);
	// 	expect(result.query).toBe('?sepia=100&rot=83&w=770&htn=28&px=17');
	// 	expect(result.hashArgs).toEqual({});
	// 	expect(result.queryArgs).toEqual({ sepia: '100', rot: '83', w: '770', htn: '28', px: '17'});
	// });

	// it('has a dpr', function() {
	// 	var result = imgix.dpr;
	// 	expect(result).toBe(1);
	// });

});
