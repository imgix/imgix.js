'use strict';

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function extractWidth(url) {
	var matches = url.match('w=([0-9]+)');

	if (matches && matches.length === 2) {
		return parseInt(matches[1], 10);
	}

	return 0;
}

function extractHeight(url) {
	var matches = url.match('h=([0-9]+)');

	if (matches && matches.length === 2) {
		return +matches[1];
	}

	return 0;
}

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


	var flag, objVal;
	it('test auto update...', function() {

		if (!window.addEventListener) {
			console.log("Skipped test due to old browser");
			return;
		}

		// create and inject and element to test with
		var img = document.createElement('img'),
			tmpId = 'test' + parseInt((Math.random() * 100000), 10);
		img.id = tmpId;
		img.src = 'http://static-a.imgix.net/macaw.png';
		document.body.appendChild(img);

		var flag = false;
		// ensure it exists
		expect(document.querySelector('#' + tmpId)).toBeDefined();

		// run our test
		runs(function() {
			var i = new imgix.URL('http://static-a.imgix.net/macaw.png?w=200');
			i.autoUpdateImg('#' + tmpId, function(obj) {
				objVal = obj;
				flag = true;
			});

			i.setRotate(30);
		});

		waitsFor(function() {
			return flag;
		}, "Waiting for autoUpdateImg...", 5000);

		runs(function() {
			expect(objVal.className, '.imgix-el-02345d7e9857180083e75a8bd32f125b');
			expect(objVal.percentComplete).toEqual(100);
			expect(objVal.totalComplete).toEqual(1);
			expect(objVal.isComplete).toEqual(true);
			expect(!!objVal.element).toEqual(true);
			expect(objVal.loadTime).toBeGreaterThan(-1);

			expect(img.src).toContain('rot=30');

			document.body.removeChild(img);
		});
	});

	it('sets url params', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png');
		i.setRotate(30);

		expect(i.urlParts.paramValues["rot"], 30);
		expect(i.getParam('rot'), 30);
		expect(i.getRotate(), 30);
		expect(i.getUrl()).toContain("rot=30");
	});

	it('should remove params correctly', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png?w=200&sepia=20');
		expect(i.getURL()).toEqual('http://static-a.imgix.net/macaw.png?sepia=20&w=200'); //normalized 

		i.removeParam('sepia');
		expect(i.getURL()).toEqual('http://static-a.imgix.net/macaw.png?w=200');
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
		expect(i.getURL()).toEqual('http://static-a.imgix.net/macaw.png');
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

	it('returns the proper palette colors for no param', function() {
		var returnColors;

		runs(function() {
			var i = new imgix.URL('http://static-a.imgix.net/macaw.png');

			i.getColors(function(colors) {
				returnColors = colors;
			});
		});

		waitsFor(function() {
			return returnColors;
		}, "Waiting for autoUpdateImg...", 5000);

		runs(function() {
			//expect(returnColors).toEqual(['rgb(251, 150, 23)', 'rgb(243, 133, 17)', 'rgb(224, 62, 5)', 'rgb(213, 84, 17)', 'rgb(119, 145, 198)', 'rgb(149, 150, 166)', 'rgb(72, 91, 134)', 'rgb(57, 72, 102)', 'rgb(47, 56, 78)', 'rgb(50, 52, 50)'].reverse());
			expect(returnColors.length).toEqual(10);
			expect(returnColors[0]).toContain('rgb(');
		});
	});

	it('returns unique palette colors', function() {
		var returnColors,
			desiredColors = 10,
			randBlur = parseInt(Math.random() * 3000, 10);

		runs(function() {
			var i = new imgix.URL('http://static-a.imgix.net/macaw.png?blur=' + randBlur);

			i.getColors(desiredColors, function(colors) {
				returnColors = colors;
			});
		});

		waitsFor(function() {
			return returnColors;
		}, "Waiting for autoUpdateImg...", 5000);

		runs(function() {
			var unique = returnColors.filter(onlyUnique);
			//expect(returnColors.length).toEqual(unique.length);
			expect(desiredColors).toEqual(unique.length);
		});
	});

	it('returns the proper palette colors for 3', function() {
		var returnColors;

		runs(function() {
			var i = new imgix.URL('http://static-a.imgix.net/macaw.png');

			i.getColors(3, function(colors) {
				returnColors = colors;
			});
		});

		waitsFor(function() {
			return returnColors;
		}, "Waiting for autoUpdateImg...", 2000);

		runs(function() {
			expect(returnColors.length).toEqual(3);
			expect(returnColors[0]).toContain('rgb(');
			//expect(returnColors[0]).toEqual('rgb(57, 72, 102)');
			//expect(returnColors).toEqual( [  'rgb(251, 150, 23)', 'rgb(207, 169, 183)', 'rgb(57, 72, 102)'].reverse());
			//expect(returnColors).toEqual( [  'rgb(251, 150, 23)', 'rgb(208, 86, 13)', 'rgb(57, 72, 102)'].reverse());
		});
		
	});

	it('md5s strings correctly', function() {
		expect(imgix.md5("imgix")).toEqual("f12c7c39333410c10c2930b57116a943");
	});

	it('re-signs correctly', function() {


		var su = "http://visor.imgix.net/http://a.abcnews.com/assets/images/navigation/abc-logo.png?rot=10&s=blah";

		var i = new imgix.URL(su, {}, config.visorToken)
		i.setRotate(15);

		expect(i.getUrl()).toEqual("http://visor.imgix.net/http://a.abcnews.com/assets/images/navigation/abc-logo.png?rot=15&s=623966184d550b3bcb6a973040f8aa5d");
	});

	it('converts rgb to hex colors correctly', function() {
		expect(imgix.rgbToHex('rgb(251, 150, 23)').toLowerCase()).toEqual('fb9617');
	});

	it('converts rgb to hex colors correctly on setBlend', function() {
		var i = new imgix.URL('https://assets.imgix.net/pixel.gif');
		i.setBlend('rgb(255, 0, 0)');
		expect(i.getBlend()).toEqual('ff0000');
	});

	it('extracts xpath correctly', function() {

		if (!window.addEventListener) {
			console.log("Skipped test due to old browser");
			return;
		}

		var img = document.createElement('img'),
			tmpId = 'test' + parseInt((Math.random() * 100000), 10);
		img.id = tmpId;
		img.src = 'http://static-a.imgix.net/macaw.png';
		document.body.appendChild(img);

		var flag = false;
		var el = document.querySelector('#' + tmpId);

		expect(el).toBeDefined();
		expect(imgix.isImageElement(el)).toEqual(true);
		expect(imgix.getElementTreeXPath(el)).toEqual('/html/body/img');
		expect(imgix.getElementImage(el)).toEqual('http://static-a.imgix.net/macaw.png');

		document.body.removeChild(img);
	});

	it('extracts ints correctly', function() {
		expect(imgix.helpers.extractInt("234px")).toEqual(234);
	});

	it('puts a dummy transparent image when nothing set', function() {
		var i = new imgix.URL('');

		var img = document.createElement('img'),
			tmpId = 'test' + parseInt((Math.random() * 100000), 10);
		img.id = tmpId;
		img.src = i.getUrl();
		document.body.appendChild(img);

		var flag = false;
		var el = document.querySelector('#' + tmpId);


		expect(el).toBeDefined();
		expect(imgix.isImageElement(el)).toEqual(true);
		expect(el.src).toEqual(imgix.getEmptyImage());

		document.body.removeChild(img);
	});

	it('correctly sets the image after the load', function() {
		var img, el, newUrl, loadedFlag = false;
		runs(function() {
			img = document.createElement('img');
			var tmpId = 'test' + parseInt((Math.random() * 100000), 10);
			img.id = tmpId;
			img.src = '';
			img.src = 'http://static-a.imgix.net/macaw.png';
			document.body.appendChild(img);

			el = document.querySelector('#' + tmpId);
			expect(el).toBeDefined();

			newUrl = 'http://static-a.imgix.net/macaw.png?blur=' + parseInt((Math.random() * 1000), 10);
			imgix.setElementImageAfterLoad(el, newUrl, function() {
				loadedFlag = true;
			});
		});

		waitsFor(function() {
			return loadedFlag;
		}, "Waiting for image to load..", 10000);

		runs(function() {
			// ensure it actually loaded...
			expect(imgix.getElementImage(el)).toEqual(newUrl);
			document.body.removeChild(img);
		});
	});

	it('should attachImageTo with element', function() {
		var img, el, newUrl, loadedFlag = false;
		runs(function() {
			img = document.createElement('img');
			var tmpId = 'test' + parseInt((Math.random() * 100000), 10);
			img.id = tmpId;
			img.src = '';
			img.src = 'http://static-a.imgix.net/macaw.png';
			document.body.appendChild(img);

			el = document.querySelector('#' + tmpId);
			expect(el).toBeDefined();

			newUrl = 'http://static-a.imgix.net/macaw.png?blur=' + parseInt((Math.random() * 1000), 10);

			var ix = new imgix.URL(newUrl);
			ix.attachImageTo(el, function() {
				loadedFlag = true;
			});
		});

		waitsFor(function() {
			return loadedFlag;
		}, "Waiting for image to load..", 10000);

		runs(function() {
			// ensure it actually loaded...
			expect(imgix.getElementImage(el)).toEqual(newUrl);
			document.body.removeChild(img);
		});
	});

	it('should attachImageTo with element selector', function() {
		var img, el, newUrl, loadedFlag = false;
		runs(function() {
			img = document.createElement('img');
			var tmpId = 'test' + parseInt((Math.random() * 100000), 10);
			img.id = tmpId;
			img.src = '';
			img.src = 'http://static-a.imgix.net/macaw.png';
			document.body.appendChild(img);

			el = document.querySelector('#' + tmpId);
			expect(el).toBeDefined();

			newUrl = 'http://static-a.imgix.net/macaw.png?blur=' + parseInt((Math.random() * 1000), 10);

			var ix = new imgix.URL(newUrl);
			ix.attachImageTo('#' + tmpId, function() {
				loadedFlag = true;
			});
		});

		waitsFor(function() {
			return loadedFlag;
		}, "Waiting for image to load..", 10000);

		runs(function() {
			// ensure it actually loaded...
			expect(imgix.getElementImage(el)).toEqual(newUrl);
			document.body.removeChild(img);
		});
	});

	it('should attachImageTo with element selector multiple', function() {
		var img, img2, el, el2, newUrl, loadedCount = 0;
		runs(function() {
			img = document.createElement('img');
			var tmpId = 'test' + parseInt((Math.random() * 100000), 10);

			img.id = tmpId;
			img.className = 'tester';
			img.src = 'http://static-a.imgix.net/macaw.png';
			document.body.appendChild(img);

			el = document.querySelector('#' + tmpId);
			expect(el).toBeDefined();

			img2 = document.createElement('img');
			var tmpId2 = 'test' + parseInt((Math.random() * 100000), 10);

			img2.id = tmpId2;
			img2.className = 'tester';
			img2.src = 'http://static-a.img2ix.net/macaw.png';
			document.body.appendChild(img2);

			el2 = document.querySelector('#' + tmpId2);
			expect(el2).toBeDefined();


			newUrl = 'http://static-a.imgix.net/macaw.png?blur=' + parseInt((Math.random() * 1000), 10);

			var ix = new imgix.URL(newUrl);
			ix.attachImageTo('.tester', function() {
				loadedCount++;
			});
		});

		waitsFor(function() {
			return loadedCount === 2;
		}, "Waiting for images to load..", 10000);


		runs(function() {
			// ensure it actually loaded on both images...
			expect(imgix.getElementImage(el)).toEqual(newUrl);
			expect(imgix.getElementImage(el2)).toEqual(newUrl);

			document.body.removeChild(img);
			document.body.removeChild(img2);
		});
	});

	it('should handle only qs in constructor', function() {
		var i = new imgix.URL('?auto=format&fit=crop&h=360&q=80&w=940');
		i.setDPR(1.3);
		expect(i.getQueryString()).toEqual('auto=format&dpr=1.3&fit=crop&h=360&q=80&w=940');
	});

	it('should remove the param from the url if null is set', function() {
		var i = new imgix.URL('?auto=format&fit=crop&h=360&q=80&w=940');
		i.setWidth(null);
		expect(i.getQueryString()).toEqual('auto=format&fit=crop&h=360&q=80');
	});

	it('should warn when trying to set an invalid imgix.fluid config key', function() {
		spyOn(console, 'warn');
		imgix.fluid({obviouslyBad: true});
		expect(console.warn).toHaveBeenCalled();
	});

	it('should warn when trying to set MULTIPLE invalid imgix.fluid config keys', function() {
		spyOn(console, 'warn');
		imgix.fluid({obviouslyBad: true, thisIsNotValid: false});
		expect(console.warn).toHaveBeenCalled();
	});

	it('should NOT warn when setting NO imgix.fluid config keys', function() {
		spyOn(console, 'warn');
		imgix.fluid();
		expect(console.warn).not.toHaveBeenCalled();
	});

	it('should NOT warn when setting MULTIPLE valid imgix.fluid config keys', function() {
		spyOn(console, 'warn');
		imgix.fluid({pixelStep: 25, token: "asdf"});
		expect(console.warn).not.toHaveBeenCalled();
	});

	it('should warn when trying to set an imgix url instance as a param object', function() {
		spyOn(console, 'warn');
		var i = new imgix.URL();
		i.setParams(i);
		expect(console.warn).toHaveBeenCalled();
	});

	it('should warn when trying to set an invalid param', function() {
		spyOn(console, 'warn');
		var i = new imgix.URL();
		i.setParams({"jasdlkfja": 1}); // that's an invalid param name
		expect(console.warn).toHaveBeenCalled();
	});

	it('should auto encode params', function() {
		var i = new imgix.URL();
		i.setParams({"txt": "this has spaces!"}); // should be encoded...
		expect(i.getText()).toEqual("this%20has%20spaces!");
		expect(i.getURL()).toEqual("https://assets.imgix.net/pixel.gif?txt=this%20has%20spaces!");
	});

	it('should auto hexify rgb colors', function() {
		var i = new imgix.URL();
		i.setParams({"mono": "rgb(150, 150, 220)"});
		expect(i.getMonochrome()).toEqual("9696dc");
	});

	it('should round pixels correctly', function() {
		expect(imgix.helpers.pixelRound(3, 5)).toEqual(5);
		expect(imgix.helpers.pixelRound(23, 5)).toEqual(25);
		expect(imgix.helpers.pixelRound(33, 10)).toEqual(40);
	});

	it('should detect plain objects', function() {
		expect(imgix.helpers.isReallyObject({})).toEqual(true);
		expect(imgix.helpers.isReallyObject(function() {})).toEqual(false);
		expect(imgix.helpers.isReallyObject("a")).toEqual(false);
		expect(imgix.helpers.isReallyObject(3)).toEqual(false);
		expect(imgix.helpers.isReallyObject(new imgix.URL())).toEqual(false);
	});

	it('should detect FluidSet objects', function() {
		expect(imgix.helpers.isFluidSet({})).toEqual(false);
		expect(imgix.helpers.isFluidSet(new imgix.FluidSet())).toEqual(true);
		expect(imgix.helpers.isFluidSet(new imgix.URL())).toEqual(false);
	});

	it('should convert between hex and rgb', function() {
		expect(imgix.hexToRGB('#ffffff')).toEqual('rgb(255, 255, 255)');
		expect(imgix.hexToRGB('#fff')).toEqual('rgb(255, 255, 255)');
		expect(imgix.rgbToHex('rgb(255, 255, 255)')).toEqual('ffffff');

		expect(imgix.hexToRGB('#1b64c8')).toEqual('rgb(27, 100, 200)');
		expect(imgix.rgbToHex('rgb(27, 100, 200)')).toEqual('1b64c8');
	});

	it('should get a brightness score', function() {
		expect(imgix.getColorBrightness('#ffffff')).toEqual(255);
		expect(imgix.getColorBrightness('#ccc')).toEqual(204);

		expect(imgix.getColorBrightness('#ccc')).toEqual(imgix.getColorBrightness('#cccccc'));

		expect(imgix.getColorBrightness('#fcc')).toEqual(imgix.getColorBrightness('rgb(255, 204, 204'));
	});

	it('imgix.onready should be called', function() {
		var loadedFlag = false;
		runs(function() {
			imgix.onready(function() {
				loadedFlag = true;
			});
		});

		waitsFor(function() {
			return loadedFlag;
		}, "Waiting for image to load..", 3000);

		runs(function() {
			expect(loadedFlag).toEqual(true);
		});
	});

	it('should support blend params', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png');
		i.setBlend('fff');
		expect(i.getBlend()).toEqual('fff');
		expect(i.getURL()).toContain('blend=fff');

		i.setBlendWidth('50');
		expect(i.getBlendWidth()).toEqual('50');
		expect(i.getURL()).toContain('bw=50');

		i.setBlendHeight('50');
		expect(i.getBlendHeight()).toEqual('50');
		expect(i.getURL()).toContain('bh=50');
	});

	it('should chain imgix.URL setX calls', function() {
		var i = new imgix.URL('http://static-a.imgix.net/macaw.png');
		i.setSepia(50).setWidth(50).setHeight(100);
		expect(i.getURL()).toEqual('http://static-a.imgix.net/macaw.png?h=100&sepia=50&w=50');
	});

	it('defaults to a zoom level of 1', function() {
		expect(imgix.helpers.getZoom()).toEqual(1);
	});

	it('imgix.fluid img test', function() {

		var pixelStep = 10;
		var el, fl, elemSize;
		runs(function() {
			el = document.createElement('img');
			el.setAttribute('data-src', 'http://jackangers.imgix.net/chester.png');
			el.setAttribute('class', 'imgix-fluid');

			document.body.appendChild(el);
			elemSize = imgix.helpers.calculateElementSize(imgix.isImageElement(el) ? el.parentNode : el);

			var opts = {
				fitImgTagToContainerWidth: true,
				fitImgTagToContainerHeight: true,
				pixelStep: 10
			};

			fl = imgix.fluid(opts);
		});

		waitsFor(function() {
			return el.src !== '';
		}, "Waiting for imgix.fluid", 5000);

		runs(function() {
			var	expectedH = imgix.helpers.pixelRound(elemSize.height, pixelStep),
				expectedW = imgix.helpers.pixelRound(elemSize.width, pixelStep)

			var setUrl = el.src,
				setW = extractWidth(setUrl),
				setH = extractHeight(setUrl);

			expect(setW).toEqual(expectedW);
			expect(setH).toEqual(expectedH);
			document.body.removeChild(el);
		});
	});

	it('imgix.fluid img test max test', function() {

		var pixelStep = 10,
			maxHeight = 200,
			maxWidth = 300;
		var el, fl, elemSize;
		runs(function() {
			el = document.createElement('img');
			el.setAttribute('data-src', 'http://jackangers.imgix.net/chester.png');
			el.setAttribute('class', 'imgix-fluid');

			document.body.appendChild(el);
			elemSize = imgix.helpers.calculateElementSize(imgix.isImageElement(el) ? el.parentNode : el);

			var opts = {
				fitImgTagToContainerWidth: true,
				fitImgTagToContainerHeight: true,
				maxHeight: maxHeight,
				maxWidth: maxWidth
			};

			fl = imgix.fluid(opts);
		});

		waitsFor(function() {
			return el.src !== '';
		}, "Waiting for imgix.fluid", 5000);

		runs(function() {
			var setUrl = el.src,
				setW = extractWidth(setUrl),
				setH = extractHeight(setUrl);

			expect(setW).toEqual(maxWidth);
			expect(setH).toEqual(maxHeight);

			document.body.removeChild(el);
		});
	});

});
