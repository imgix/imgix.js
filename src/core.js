'use strict';

// Establish the root object, `window` in the browser, or `exports` on the server.
var root = this;

/**
 * `imgix` is the root namespace for all imgix client code.
 * @namespace imgix
 */
var imgix = {
  version: '2.1.0'
};

// expose imgix to browser or node
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = imgix;
  }
  exports.imgix = imgix;
} else {
  root.imgix = imgix;
}

var IMGIX_USABLE_CLASS = 'imgix-usable';

/**
 * Reports if an element is an image tag
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {boolean} true if the element is an img tag
 */
imgix.isImageElement = function (el) {
  return (el && el.tagName && el.tagName.toLowerCase() === 'img');
};

/**
 * Intelligently sets an image on an element after the image has been cached.
 * @memberof imgix
 * @static
 * @param {Element} el the element to place the image on
 * @param {string} url the url of the image to set
 * @param {function} callback called once image has been preloaded and set
 */
imgix.setElementImageAfterLoad = function (el, imgUrl, callback) {
  var img = new Image();
  img.onload = function () {
    imgix.setElementImage(el, imgUrl);
    if (typeof callback === 'function') {
      callback(el, imgUrl);
    }
  };
  if (el.hasAttribute('crossorigin')) {
    img.setAttribute('crossorigin', el.getAttribute('crossorigin'));
  }

  img.src = imgUrl;
};

/**
 * Intelligently sets an image on an element.
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @param {string} url the url of the image to set
 * @returns {boolean} true on success
 */
imgix.setElementImage = function (el, imgUrl) {
  if (!el) {
    return false;
  }

  if (imgix.isImageElement(el)) {
    if (el.src !== imgUrl) {
      el.src = imgUrl;
    }
    return true;
  } else {
    var curBg = imgix.getBackgroundImage(el);
    if (curBg !== imgUrl) {
      if (curBg) {
        el.style.cssText = el.style.cssText.replace(curBg, imgUrl);
        return true;
      } else {
        if (document.addEventListener) {
          el.style.backgroundImage = 'url(' + imgUrl + ')';
        } else {
          el.style.cssText = 'background-image:url(' + imgUrl + ')';
        }
        return true;
      }
    }
  }

  return false;
};

/**
 * An empty 1x1 transparent image
 * @memberof imgix
 * @static
 * @returns {string} url of an empty image
 */
imgix.getEmptyImage = function () {
  return imgix.versionifyUrl('https://assets.imgix.net/pixel.gif');
};

/**
 * Intelligently returns the image on the element
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {string} url of the image on the element
 */
imgix.getElementImage = function (el) {
  if (imgix.isImageElement(el)) {
    return el.src;
  } else {
    return imgix.getBackgroundImage(el);
  }
};

/**
 * Returns the background image for an element
 * @memberof imgix
 * @static
 * @param {Element} el the element to check
 * @returns {string} url of the image on the element
 */
imgix.getBackgroundImage = function (el) {
  // This regex comes from http://stackoverflow.com/a/20054738/506330
  var regex = /\burl\s*\(\s*["']?([^"'\r\n,]+)["']?\s*\)/gi,
      style,
      matches;

  if (window.getComputedStyle) {
    style = window.getComputedStyle(el);
  } else if (document.documentElement.currentStyle) {
    style = el.currentStyle;
  }

  if (!style || !style.backgroundImage) {
    style = el.style;
  }

  matches = regex.exec(style.backgroundImage);

  if (matches && matches.length > 1) {
    return matches[1];
  } else {
    return '';
  }
};

/**
 * Gives all elements on the page that have images (or could img). Does NOT support IE8
 * @memberof imgix
 * @static
 * @returns {NodeList} html elements with images
 */
imgix.getElementsWithImages = function () {
  imgix.markElementsWithImages();

  return document.querySelectorAll('.' + IMGIX_USABLE_CLASS);
};

/**
 * Does an element have an image attached
 * @memberof imgix
 * @static
 * @param {Element} el element to check for images
 * @returns {boolean} true if passed element has an image
 */
imgix.hasImage = function (el) {
  var toCheck = el.style.cssText ? el.style.cssText.toLowerCase() : el.style.cssText;
  return el && (imgix.isImageElement(el) || toCheck.indexOf('background-image') !== -1);
};

/**
 * Helper method that attaches IMGIX_CLASS to all elements with images on a page
 * @memberof imgix
 * @private
 * @static
 */
imgix.markElementsWithImages = function () {
  var all = document.getElementsByTagName('*');
  for (var i = 0, max = all.length; i < max; i++) {
    if (imgix.hasImage(all[i])) {
      imgix.setImgixClass(all[i]);
    }
  }
};

/**
 * Checks if an element has a class applied (via jquery)
 * @memberof imgix
 * @static
 * @param {Element} elem element to check for class
 * @param {string} name class name to look for
 * @returns {boolean} true if element has the class
 */
imgix.hasClass = function (elem, name) {
  return (' ' + elem.className + ' ').indexOf(' ' + name + ' ') > -1;
};

/**
 * Helper method that 'marks' an element as 'imgix usable' by adding special classes
 * @memberof imgix
 * @static
 * @private
 * @param {Element} el the element to place the class on
 * @returns {string} auto-generated class name (via xpath)
 */
imgix.setImgixClass = function (el) {
  if (imgix.hasClass(el, IMGIX_USABLE_CLASS)) {
    return imgix.getImgixClass(el);
  }

  var cls = imgix.getXPathClass(imgix.getElementTreeXPath(el));

  el.classList.add(cls);
  el.classList.add(IMGIX_USABLE_CLASS);

  return imgix.getImgixClass(el);
};

/**
 * Helper method that returns generated (via xpath) class name for 'marked' image elements
 * @memberof imgix
 * @static
 * @private
 * @param {Element} el the element to get the class for
 * @returns {string} class name
 */
imgix.getImgixClass = function (el) {
  if (imgix.hasClass(el, IMGIX_USABLE_CLASS)) {
    return el.className.match(/imgix-el-[^\s]+/)[0];
  }
};

imgix.getXPathClass = function (xpath) {
  var suffix;

  if (xpath){
    suffix = imgix.hashCode(xpath);
  } else {
    suffix = (new Date()).getTime().toString(36);
  }

  return 'imgix-el-' + suffix;
};

imgix.getElementImageSize = function (el) {
  var w = 0,
    h = 0;

  if (imgix.isImageElement(el)) {
    w = el.naturalWidth;
    h = el.naturalHeight;
  } else {
    w = imgix.helpers.extractInt(imgix.getCssProperty(el, 'width'));
    h = imgix.helpers.extractInt(imgix.getCssProperty(el, 'height'));
  }

  return {
    width: w,
    height: h
  };
};

imgix.getCssPropertyById = function (elmId, property) {
  var elem = document.getElementById(elmId);
  return imgix.helpers.getElementCssProperty(elem, property);
};

imgix.getCssProperty = function (el, property) {
  return imgix.helpers.getElementCssProperty(el, property);
};

imgix.getCssPropertyBySelector = function (sel, property) {
  var elem = document.querySelector(sel);
  return imgix.helpers.getElementCssProperty(elem, property);
};

imgix.instanceOfImgixURL = function (x) {
  return x && x.toString() === '[object imgixURL]';
};

imgix.setGradientOnElement = function (el, colors, baseColor) {
  var baseColors = [];
  if (typeof baseColor === 'undefined') {
    // transparent base colors if not set
    baseColors = ['transparent', 'transparent'];
  } else {
    var base = imgix.hexToRGB(baseColor); // force rgb if in hex
    if (base.slice(0, 4) === 'rgba') {
      // if given an rgba then use that as the upper and force 0 for lower
      baseColors.push(base);
      baseColors.push(imgix.applyAlphaToRGB(base, 0));
    } else {
      // default to 0 to 50% transparency for passed solid base color
      baseColors.push(imgix.applyAlphaToRGB(base, 0.5));
      baseColors.push(imgix.applyAlphaToRGB(base, 0));
    }
  }

  var backgroundGradients = [
      '-ms-linear-gradient(top, ' + baseColors[0] + ' 0%, ' + baseColors[1] + ' 100%),-ms-linear-gradient(bottom left, ' + colors[2] + ' 0%,' + colors[4] + ' 25%, ' + colors[6] + ' 50%, ' + colors[8] + ' 75%,' + colors[10] + ' 100%)',
      '-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, ' + baseColors[1] + '), color-stop(100%, ' + baseColors[0] + ')),-webkit-gradient(linear, 0% 100%, 100% 0%, color-stop(0%, ' + colors[2] + '), color-stop(25%, ' + colors[4] + '), color-stop(50%, ' + colors[6] + '), color-stop(75%, ' + colors[7] + '), color-stop(100%, ' + colors[10] + '))',
      '-webkit-linear-gradient(top, ' + baseColors[0] + ', ' + baseColors[1] + ' 100%),-webkit-linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')',
      '-moz-linear-gradient(top, ' + baseColors[0] + ', ' + baseColors[1] + ' ),-moz-linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')',
      '-o-linear-gradient(top, ' + baseColors[0] + ',' + baseColors[1] + '),-o-linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')',
      'linear-gradient(top, ' + baseColors[0] + ',' + baseColors[1] + '),linear-gradient(bottom left, ' + colors[2] + ', ' + colors[4] + ', ' + colors[6] + ',' + colors[8] + ')'
    ];

  for (var x = 0; x < backgroundGradients.length; x++) {
    el.style.backgroundImage = backgroundGradients[x];
  }
};

imgix.isDef = function (obj) {
  return (typeof obj !== 'undefined');
};

// Adapted from http://stackoverflow.com/a/22429679
imgix.hashCode = function (str) {
    /*jshint bitwise:false */
    var i, l, hval = 0x811c9dc5;
    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
};

// DOCS BELOW ARE AUTO GENERATED. DO NOT EDIT BY HAND

