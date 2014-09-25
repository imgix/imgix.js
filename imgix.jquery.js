(function($, imgix) {

	if (!imgix) {
		throw "imgix.js is not loaded on this page. The imgix jQuery plugin will not work without also including imgix.js";
	}

	if (!$) {
		throw "jquery is not loaded on this page. The imgix jQuery plugin will not work without also including jquery";
	}

	$.imgix = {
		all: function() {
			var imgs = imgix.getElementsWithImages(),
				results = [];

			for (var i = 0; i < imgs.length; i++) {
				results.push(imgs[i]);
			}

			return $(results).imgix();
		},

		fluid: function(opts) {
			imgix.fluid(opts);
		}
	};


	$.fn.imgix = function () {
		var jq = this;
		var methods = {
			setParam: function(param, value){
				if (typeof param === "object") {
					return this.setParams(param);
				}
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix.getElementImage(e));
						i.setParam(param, value);
						imgix.setElementImageAfterLoad(e, i.getURL());
					}
				});
			},

			setParams: function(values) {
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix.getElementImage(e));
						i.setParams(values);
						imgix.setElementImageAfterLoad(e, i.getURL());
					}
				});
			},

			getColors: function(num, callback) {
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix.getElementImage(e));
						i.getColors(num, callback);
					}
				});
			},

			getParam: function(param) {
				var results = [];
				jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix.getElementImage(e));
						results.push(i.getParam(param));
					}
				});

				return results.length === 1 ? results[0] : results;
			},

			getParams: function() {
				var results = [];
				jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix.getElementImage(e));
						results.push(i.getParams());
					}
				});

				return results.length === 1 ? results[0] : results;
			}
		};

		// dynamically generate getters/setters for all imgix params
		// for example: $('.some-class').imgix().setSepia(50);
		for (var param in imgix.URL.theGetSetFuncs) {
			(function(tmp) {
				methods['set' + imgix.URL.theGetSetFuncs[tmp]] = function(v, doOverride) {
					return jq.each(function(idx, e) {
						if (e && imgix.hasImage(e)) {
							var i = new imgix.URL(imgix.getElementImage(e));
							i.setParam(tmp, v, doOverride);
							imgix.setElementImageAfterLoad(e, i.getURL());
						}
					});
				};

				methods['get' + imgix.URL.theGetSetFuncs[tmp]] = function() {
					var results = [];
					jq.each(function(idx, e) {
						if (e && imgix.hasImage(e)) {
							var i = new imgix.URL(imgix.getElementImage(e));
							results.push(i.getParam(tmp));
						}
					});

					return results.length === 1 ? results[0] : results;
				};

			})(param);
		}

		return methods;
	};

}(jQuery, window.imgix));
