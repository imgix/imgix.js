var util = require('./util.js');

var MAXIMUM_SCREEN_WIDTH = 2560 * 2;
var SCREEN_STEP = 100;

// Screen data from http://mydevice.io/devices/

// Phones
var IPHONE = { cssWidth: 320, dpr: 1 };
var IPHONE_4 = { cssWidth: 320, dpr: 2 };
var IPHONE_6 = { cssWidth: 375, dpr: 2 };
var LG_G3 = { cssWidth: 360, dpr: 4 };

// Phablets
var IPHONE_6_PLUS = { cssWidth: 414, dpr: 3 };
var IPHONE_6_PLUS_LANDSCAPE = { cssWidth: 736, dpr: 3 };
var MOTO_NEXUS_6 = { cssWidth: 412, dpr: 3.5 };
var MOTO_NEXUS_6_LANDSCAPE = { cssWidth: 690, dpr: 3.5 };
var LUMIA_1520 = { cssWidth: 432, dpr: 2.5 };
var LUMIA_1520_LANDSCAPE = { cssWidth: 768, dpr: 2.5 };
var GALAXY_NOTE_3 = { cssWidth: 360, dpr: 3 };
var GALAXY_NOTE_3_LANDSCAPE = { cssWidth: 640, dpr: 3 };
var GALAXY_NOTE_4 = { cssWidth: 360, dpr: 4 };
var GALAXY_NOTE_4_LANDSCAPE = { cssWidth: 640, dpr: 4 };

// Tablets
var IPAD = { cssWidth: 768, dpr: 1 };
var IPAD_LANDSCAPE = { cssWidth: 1024, dpr: 1 };
var IPAD_3 = { cssWidth: 768, dpr: 2 };
var IPAD_3_LANDSCAPE = { cssWidth: 1024, dpr: 2 };
var IPAD_PRO = { cssWidth: 1024, dpr: 2 };
var IPAD_PRO_LANDSCAPE = { cssWidth: 1366, dpr: 2 };

// Bootstrap breakpoints
var BOOTSTRAP_SM = { cssWidth: 576, dpr: 1 };
var BOOTSTRAP_SM_2X = { cssWidth: 576, dpr: 2 };
var BOOTSTRAP_MD = { cssWidth: 720, dpr: 1 };
var BOOTSTRAP_MD_2X = { cssWidth: 720, dpr: 2 };
var BOOTSTRAP_LG = { cssWidth: 940, dpr: 1 };
var BOOTSTRAP_LG_2X = { cssWidth: 940, dpr: 2 };
var BOOTSTRAP_XL = { cssWidth: 1140, dpr: 1 };
var BOOTSTRAP_XL_2X = { cssWidth: 1140, dpr: 2 };

var PHONES = [IPHONE, IPHONE_4, IPHONE_6, LG_G3];

var TABLETS = [
  IPAD,
  IPAD_LANDSCAPE,
  IPAD_3,
  IPAD_3_LANDSCAPE,
  IPAD_PRO,
  IPAD_PRO_LANDSCAPE
];

var PHABLETS = [
  IPHONE_6_PLUS,
  IPHONE_6_PLUS_LANDSCAPE,
  MOTO_NEXUS_6,
  MOTO_NEXUS_6_LANDSCAPE,
  LUMIA_1520,
  LUMIA_1520_LANDSCAPE,
  GALAXY_NOTE_3,
  GALAXY_NOTE_3_LANDSCAPE,
  GALAXY_NOTE_4,
  GALAXY_NOTE_4_LANDSCAPE
];

var BOOTSTRAP_BREAKS = [
  BOOTSTRAP_SM,
  BOOTSTRAP_SM_2X,
  BOOTSTRAP_MD,
  BOOTSTRAP_MD_2X,
  BOOTSTRAP_LG,
  BOOTSTRAP_LG_2X,
  BOOTSTRAP_XL,
  BOOTSTRAP_XL_2X
];

function devices() {
  return PHONES.concat(PHABLETS, TABLETS, BOOTSTRAP_BREAKS);
}

function deviceWidths() {
  var device, i, len;
  var ref = devices();
  var widths = [];

  for (i = 0, len = ref.length; i < len; i++) {
    device = ref[i];
    widths.push(device.cssWidth * device.dpr);
  }

  return widths;
}

// Generates an array of physical screen widths to represent
// the different potential viewport sizes.
//
// We step by `SCREEN_STEP` to give some sanity to the amount
// of widths we output.
//
// The upper bound is the widest known screen on the planet.
// @return {Array} An array of {Fixnum} instances
function screenWidths() {
  var widths = [];

  for (var i = SCREEN_STEP; i < MAXIMUM_SCREEN_WIDTH; i += SCREEN_STEP) {
    widths.push(i);
  }
  widths.push(MAXIMUM_SCREEN_WIDTH);

  return widths;
}

// Return the widths to generate given the input `sizes`
// attribute.
//
// @return {Array} An array of {Fixnum} instances representing the unique `srcset` URLs to generate.
function targetWidths() {
  var hasWin = typeof window !== 'undefined',
    allWidths = deviceWidths().concat(screenWidths()),
    selectedWidths = [],
    dpr = hasWin && window.devicePixelRatio ? window.devicePixelRatio : 1,
    maxPossibleWidth = hasWin
      ? Math.max(window.screen.availWidth, window.screen.availHeight)
      : MAXIMUM_SCREEN_WIDTH,
    minScreenWidthRequired = SCREEN_STEP,
    maxScreenWidthRequired = hasWin
      ? Math.floor(maxPossibleWidth * dpr)
      : MAXIMUM_SCREEN_WIDTH;

  var width, i;
  for (i = 0; i < allWidths.length; i++) {
    width = allWidths[i];

    if (width <= maxScreenWidthRequired && width >= minScreenWidthRequired) {
      selectedWidths.push(width);
    }
  }

  selectedWidths.push(maxScreenWidthRequired);

  return util.uniq(selectedWidths).sort(function(x, y) {
    return x - y;
  });
}

module.exports = targetWidths();
