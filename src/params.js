'use strict';

/**
 * Returns a font lookup. Pretty Name => name to use with imgix
 * Example: 'American Typewriter Bold' => 'American Typewriter,bold',
 * @memberof imgix
 * @static
 * @returns {object} pretty font name to imgix font param value
 */
imgix.getFontLookup = function () {
  return {
    'American Typewriter': 'American Typewriter',
    'American Typewriter Bold': 'American Typewriter,bold',
    'American Typewriter Condensed': 'American Typewriter Condensed',
    'American Typewriter Condensed Bold': 'American Typewriter Condensed,bold',
    'American Typewriter Condensed Light': 'American Typewriter Condensed Light',
    'American Typewriter Light': 'American Typewriter Light',
    'Andale Mono': 'Andale Mono',
    'Arial': 'Arial',
    'Arial Black': 'Arial Black',
    'Arial Bold': 'Arial,bold',
    'Arial Bold Italic': 'Arial,bold,italic',
    'Arial Italic': 'Arial,italic',
    'Baskerville': 'Baskerville',
    'Big Caslon': 'Big Caslon',
    'Brush Script MT': 'Brush Script MT',
    'Cochin': 'Cochin',
    'Copperplate': 'Copperplate',
    'Courier': 'Courier',
    'Courier Bold': 'Courier,bold',
    'Courier Oblique': 'Courier Oblique',
    'Didot': 'Didot',
    'Futura': 'Futura',
    'Futura Condensed': 'Futura Condensed Medium',
    'Futura Italic': 'Futura Medium,italic',
    'Georgia': 'Georgia',
    'Georgia Bold': 'Georgia,bold',
    'Georgia Bold Italic': 'Georgia,bold,italic',
    'Georgia Italic': 'Georgia,italic',
    'Gill Sans': 'Gill Sans',
    'Gill Sans Bold': 'Gill Sans,bold',
    'Gill Sans Bold Italic': 'Gill Sans,bold,italic',
    'Gill Sans Italic': 'Gill Sans,italic',
    'Gill Sans Light': 'Gill Sans Light',
    'Gill Sans Light Italic': 'Gill Sans Light,italic',
    'Helvetica': 'Helvetica',
    'Helvetica Bold': 'Helvetica,bold',
    'Helvetica Light': 'Helvetica Light',
    'Helvetica Light Oblique': 'Helvetica Light Oblique',
    'Helvetica Neue': 'Helvetica Neue',
    'Helvetica Neue Bold': 'Helvetica Neue,bold',
    'Helvetica Neue Bold Italic': 'Helvetica Neue,bold,italic',
    'Helvetica Neue Condensed Black': 'Helvetica Neue Condensed Black',
    'Helvetica Neue Condensed Bold': 'Helvetica Neue Condensed,bold',
    'Helvetica Neue Light': 'Helvetica Neue Light',
    'Helvetica Neue Light Italic': 'Helvetica Neue Light,italic',
    'Helvetica Neue Medium': 'Helvetica Neue Medium',
    'Helvetica Neue UltraLight': 'Helvetica Neue UltraLight',
    'Helvetica Neue UltraLight Italic': 'Helvetica Neue UltraLight,italic',
    'Helvetica Oblique': 'Helvetica Oblique',
    'Herculanum': 'Herculanum',
    'Impact': 'Impact',
    'Marker Felt Thin': 'Marker Felt Thin',
    'Marker Felt Wide': 'Marker Felt Wide',
    'Optima': 'Optima',
    'Optima Bold': 'Optima,bold',
    'Optima Bold Italic': 'Optima,bold,italic',
    'Optima ExtraBlack': 'Optima ExtraBlack',
    'Optima Italic': 'Optima,italic',
    'Papyrus': 'Papyrus',
    'Papyrus Condensed': 'Papyrus Condensed',
    'Times': 'Times',
    'Times Bold': 'Times,bold',
    'Times Bold Italic': 'Times,bold,italic',
    'Times Italic': 'Times,italic',
    'Times New Roman': 'Times New Roman',
    'Times New Roman Bold': 'Times New Roman,bold',
    'Times New Roman Bold Italic': 'Times New Roman,bold,italic',
    'Times New Roman Italic': 'Times New Roman,italic',
    'Trebuchet MS': 'Trebuchet MS',
    'Trebuchet MS Bold': 'Trebuchet MS,bold',
    'Trebuchet MS Bold Italic': 'Trebuchet MS,bold,italic',
    'Trebuchet MS Italic': 'Trebuchet MS,italic',
    'Verdana': 'Verdana',
    'Verdana Bold': 'Verdana,bold',
    'Verdana Bold Italic': 'Verdana,bold,italic',
    'Verdana Italic': 'Verdana,italic',
    'Zapfino': 'Zapfino'
  };
};

/**
 * Get a list of all the fonts supported by imgix
 * @memberof imgix
 * @static
 * @returns {array} An array of strings of the supported font names
 */
imgix.getFonts = function () {
  return Object.keys(imgix.getFontLookup());
};

imgix.searchFonts = function (needle) {
  needle = needle.toLowerCase();
  return imgix.getFonts().filter(function (i) { return i.toLowerCase().indexOf(needle) !== -1; });
};

imgix.isFontAvailable = function (font) {
  return imgix.isDef(imgix.getFontLookup()[font]);
};

imgix.getAllParams = function () {
  return [
    // Adjustment
    'bri',
    'con',
    'exp',
    'gam',
    'high',
    'hue',
    'invert',
    'int', // Deprecated
    'sat',
    'shad',
    'sharp',
    'usm',
    'usmrad',
    'vib',

    // Automatic
    'auto',

    // Background
    'bg',

    // Blend
    'ba',
    'balph',
    'bc',
    'bf',
    'bh',
    'blend',
    'bm',
    'bp',
    'bs',
    'bw',

    // Border & padding
    'border',
    'pad',

    // Format
    'dl',
    'fm',
    'q',

    // Mask
    'mask',

    // Noise
    'nr',
    'nrs',

    // Palette
    'class', // Deprecated
    'colors',
    'prefix',
    'palette',

    // PDF
    'page',

    // Pixel Density
    'dpr',

    // Rotation
    'flip',
    'or',
    'rot',

    // Size
    'crop',
    'fit',
    'h',
    'rect',
    'w',

    // Stylize
    'blur',
    'htn',
    'mono',
    'px',
    'sepia',

    // Text
    'txt',
    'txtalign',
    'txtclip',
    'txtclr',
    'txtfit',
    'txtfont',
    'txtline',
    'txtlineclr',
    'txtpad',
    'txtshad',
    'txtsize',

    // Trim
    'trim',
    'trimcolor',
    'trimmd',

    // Watermark
    'mark',
    'markalign',
    'markalpha',
    'markfit',
    'markh',
    'markpad',
    'markscale',
    'markw'
  ];
};

imgix.getParamAliases = function () {
  return {
    t: 'txt',
    tf: 'txtfont',
    tsz: 'txtsize',
    tl: 'txtline',
    tsh: 'txtshad',
    tp: 'txtpad',
    txtlinecolor: 'txtlineclr',
    ta: 'txtalign',
    intensity: 'int',
    monochrome: 'mono',
    f: 'fit',
    orient: 'or',
    m: 'watermark',
    mf: 'markfit',
    ms: 'markscale',
    ma: 'markalign',
    mp: 'markpad'
  };
};

imgix.getDefaultParamValues = function () {
  return {
    // Adjustment
    bri: 0,
    con: 0,
    exp: 0,
    gam: 0,
    high: 0,
    hue: 0,
    sat: 0,
    shad: 0,
    sharp: 0,
    usm: 0,
    usmrad: 2.5,
    vib: 0,

    // Blend
    ba: 'middle,center',
    balph: 100,
    bf: 'clip',
    bp: 0,

    // Border & padding
    pad: 0,

    // Format
    q: 75,

    // Noise
    nr: 20,
    nrs: 20,

    // Palette
    colors: 6,
    prefix: 'image',
    palette: '',

    // PDF
    page: 1,

    // Pixel Density
    dpr: 1,

    // Rotation
    rot: 0,

    // Size
    fit: 'clip',

    // Stylize
    blur: 0,
    htn: 0,
    px: 0,
    sepia: 0,

    // Text
    txtalign: 'bottom,right',
    txtclip: 'end',
    txtclr: '000',
    txtfont: 'Helvetica',
    txtline: 0,
    txtlineclr: 'FFF',
    txtpad: 10,
    txtsize: 12,

    // Trim
    trimmd: 11,

    // Watermark
    markalign: 'bottom,right',
    markalpha: 100,
    markfit: 'clip',
    markpad: 10
  };
};

imgix.getDefaultParamValue = function (param) {
  return imgix.getDefaultParamValues()[param];
};

imgix.getDefaultParams = function () {
  return Object.keys(imgix.getDefaultParamValues());
};
