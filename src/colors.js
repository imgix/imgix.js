'use strict';

/**
 * Helper method to turn rgb(255, 255, 255) style colors to hex (ffffff)
 * @memberof imgix
 * @static
 * @param {string} color in rgb(255, 255, 255) format
 * @returns {string} passed color converted to hex
 */
imgix.rgbToHex = function (value) {
  var parts = value.split(',');

  parts = parts.map(function (a) {
    return imgix.componentToHex(parseInt(a.replace(/\D/g, '')));
  });

  return parts.join('');
};

imgix.componentToHex = function (c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

/**
 * Gives a brightness score for a given color (higher is brighter)
 * @memberof imgix
 * @static
 * @param {string} color a color in rgb(r, g, b) format
 * @returns {Number} brightness score for the passed color
 */
imgix.getColorBrightness = function (c) {
  if (c) {
    if (c.slice(0, 1) === '#') {
      c = imgix.hexToRGB(c);
    }
  } else {
    return 0;
  }

  var parts = c.replace(/[^0-9,]+/g, '').split(','),
    r = parseInt(parts[0], 10),
    g = parseInt(parts[1], 10),
    b = parseInt(parts[2], 10);

  return Math.sqrt((r * r * 0.241) + (g * g * 0.691) + (b * b * 0.068));
};

/**
 * Apply alpha to a RGB color string
 * @memberof imgix
 * @static
 * @param {string} color a color in rgb(r, g, b) format
 * @param {number} alpha aplpha amount 1=opaque 0=transparent
 * @returns {string} color in rgba format rgb(255, 0, 255, 0.5)
 */
imgix.applyAlphaToRGB = function (rgb, alpha) {

  var pushAlpha = rgb.slice(0, 4) !== 'rgba',
    parts = rgb.split(',');

  parts = parts.map(function (a) {
    return parseInt(a.replace(/\D/g, ''), 10);
  });

  if (pushAlpha) {
    parts.push(alpha);
  } else if (parts.length === 4) {
    parts[3] = alpha;
  }

  return 'rgba(' + parts.join(', ') + ')';
};

/**
 * Converts a hex color to rgb (#ff00ff -> rgb(255, 0, 255)
 * @memberof imgix
 * @static
 * @param {string} color a color in hex format (#ff00ff)
 * @returns {string} color in rgb format rgb(255, 0, 255)
 */
imgix.hexToRGB = function (hex) {

  if (hex) {
    if (hex.slice(0, 1) === '#') {
      hex = hex.slice(1, hex.length);
    } else if (hex.slice(0, 3) === 'rgb') {
      return hex;
    }
  }

  var r = 0,
    g = 0,
    b = 0;

  function dupe(x) {
    return (x + x).toString();
  }

  if (hex.length === 3) {
    r = parseInt(dupe(hex.slice(0, 1)), 16);
    g = parseInt(dupe(hex.slice(1, 2)), 16);
    b = parseInt(dupe(hex.slice(2, 3)), 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    imgix.helpers.warn('invalid hex color:', hex);
  }

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};
