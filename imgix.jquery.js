(function($, imgix) {

	$.fn.imgix = function () {
		var jq = this;
		return {
			setParam: function(param, value){
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						i.setParam(param, value);
						imgix._setElementImageAfterLoad(e, i.getURL());
					}
				});
			},

			setParams: function(values) {
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						i.setParams(values);
						imgix._setElementImageAfterLoad(e, i.getURL());
					}
				});
			},

			getColors: function(num, callback) {
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						i.getColors(num, callback);
					}
				});
			},

			getParam: function(param) {
				var results = [];
				jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						results.push(i.getParam(param));
					}
				});

				return results.length === 1 ? results[0] : results;
			},

			getParams: function() {
				var results = [];
				jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						results.push(i.getParams());
					}
				});

				return results.length === 1 ? results[0] : results;
			}
		};
	};

}(jQuery, window.imgix));
