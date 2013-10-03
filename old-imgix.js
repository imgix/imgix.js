/* The root namespace for all imgix client code. */
var imgix = imgix || {};

/* Store a reference to the current device pixel ratio. */
imgix.dpr = window["devicePixelRatio"] || 1.0;

/* A basic defined function. */
imgix.isDef = function(obj) {
	return (typeof obj !== "undefined");
};

/* 
Parse arguments into an arg list.
TODO: Expand this to support more complex structures.
*/
imgix.parseArgs = function(argstr) {
	var result = {};
	var pairs = argstr.split("&");
	for (var i = 0; i < pairs.length; i++) {
    	var pair = pairs[i].split("=", 2);
		var key = pair[0];
		if (key.length !== 0) {
			var value = (pair.length > 1 ? window.decodeURIComponent(pair[1]) : true);
			if (imgix.isDef(result[key])) {
				if (!Array.isArray(result[key])) {
					result[key] = [result[key]];
				};
				result[key].push(value);
			} else {
				result[key] = value;
			};
		};
	};
	return result;
};

/* 
Parse URI into its core structure. Return a complex object with nested
arguments. Relies on creating a DOM element for parsing by default. 
*/
imgix.parseUri = function(uri) {
	var node = document.createElement("a");
		node.href = uri;
	return {
		protocol: node.protocol.replace(/:$/, ""),
		protocolDelim: ":",
		host: node.host,
		hostname: node.hostname,
		hostnameDelim: "//",
		port: node.port || undefined,
		portDelim: ":",
		path: node.pathname,
		query: node.search,
		queryDelim: "?",
		queryArgs: imgix.parseArgs(node.search.replace(/^\?/, "")),
		hash: node.hash,
		hashDelim: "#",
		hashArgs: imgix.parseArgs(node.hash.replace(/^#/, ""))
	};
};

/*
Build a URI.
*/
imgix.buildUri = function(parts) {
	var loc = document.location;
	var defaults = {
		protocol: loc.protocol.replace(/:$/, ""),
		protocolDelim: ":",
		host: loc.host,
		hostname: loc.hostname,
		hostnameDelim: "//",
		port: loc.port || undefined,
		portDelim: ":",
		path: loc.pathname,
		queryDelim: "?",
		hashDelim: "#"
	};
	var buffer = "";
	buffer += (parts.protocol || defaults.protocol);
	buffer += (parts.protocolDelim || defaults.protocolDelim);
	buffer += (parts.hostnameDelim || defaults.hostnameDelim);
	buffer += (parts.hostname || defaults.hostname);
	buffer += (parts.path || defaults.path);

	if (parts.queryArgs && parts.queryArgs !== {}) {
		buffer += (parts.queryDelim || defaults.queryDelim);
		var pairs = [];
		for (var key in parts.queryArgs) {
        	var value = parts.queryArgs[key];
			if (value) {
				pairs.push(key + "=" + window.encodeURIComponent(value));
			};
		};
		buffer += pairs.join("&");
	};

	if (parts.hashArgs && parts.hashArgs !== {}) {
		buffer += (parts.hashDelim || defaults.hashDelim);
		var pairs = [];
		for (var key in parts.hashArgs) {
        	var value = parts.hashArgs[key];
			if (value) {
				pairs.push(key + "=" + window.encodeURIComponent(value));
			};
		};
		buffer += pairs.join("&");
	};

	return buffer;
};

window.addEventListener("load", function(e) {
	var images = document.getElementsByTagName("img");
	for (var i = 0; i < images.length; i++) {
		var image = images[i];
		var imageParts = imgix.parseUri(image.src);
		var currentDpr = window.parseFloat(imageParts.queryArgs.dpr || 1.0);
		if (imgix.dpr > currentDpr) {
        	imageParts.queryArgs.dpr = imgix.dpr;
			image.src = imgix.buildUri(imageParts);
		};
	};
}, false);

