const WIDTH_MIN_SIZE = 40;
const PICTURE_REGEX = /^picture$/i;
const IMG_REGEX = /^img$/i;

/*
 *
 * - `getElementSize` function that given an html element,
 *    determines its rendered size
 *
 * - `imgCanBeSized` function that determines if the `img` tag has
 *    necessary attributes(`src-set`, `src`) to have its`siz``es`
 *    automatically set
 *
 * - `imageLoaded` function that determines if the `img` in question
 *    was rendered on the page
 *
 * - `setImgSize` function that updates an `img` tag’s `sizes`
 *    attribute to the best size for the given screen size
 *
 */

// requestAnimationFrame implementation that queues up calls to rAF
const rAF = (function () {
  let running, waiting;
  let firstFns = [];
  let secondFns = [];
  let fns = firstFns;

  const run = function () {
    const runFns = fns;

    // fun fns in FILO fashion
    fns = firstFns.length ? secondFns : firstFns;

    running = true;
    waiting = false;

    while (runFns.length) {
      runFns.shift()();
    }

    running = false;
  };

  // helper that either adds to the fns queue or run the raf call
  const rafBatch = function (fn, queue) {
    // if not queued, just invoke the function
    if (running && !queue) {
      fn.apply(this, arguments);
      // otherwise add the fn to the batch
    } else {
      fns.push(fn);

      // if not running a current batch and document is visible, run the rafBatch
      if (!waiting) {
        waiting = true;
        // if browser does not support rAF, use setTimeout, otherwise use rAF
        (document.hidden ? setTimeout : requestAnimationFrame)(run);
      }
    }
  };

  return rafBatch;
})();

const imgHasAttributes = ({ img }) => {
  // Verify that the img has attributes. If it does, check that one of those
  // is`sizes` and that its value is set to "auto".

  let canBeSized = false;

  try {
    if (img.hasAttributes()) {
      const attrs = img.attributes;
      for (let i = attrs.length - 1; i >= 0; i--) {
        if (attrs[i].name === 'sizes' && attrs[i].value == 'auto') {
          canBeSized = true;
          break;
        }
      }
    } else {
      console.info('\nDid not find image with attributes, ');
      console.info(img.hasAttributes());
      console.info('\n');
    }
  } catch (error) {
    console.error(error.message);
  }
  return canBeSized;
};

// Based off of: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
// Determines if the `img` element was rendered on the page
const imageLoaded = ({ img }) => {
  let loaded = false;
  // During the onload event, browser identifies any images that
  // weren’t downloaded as not complete. Some Gecko-based
  // browsers report this incorrectly.
  // More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-complete
  if (!img.complete) {
    console.warn('\nImage did not load. `img.complete was`' + img.complete);
  }

  // naturalWidth and naturalHeight give the true size of the image.
  // If it failed to load, both of these will be zero.
  // More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-naturalheight
  if (img.naturalWidth === 0) {
    console.warn(
      '\nImage did not load. `img.naturalWidth was`' + img.naturalWidth
    );
  }

  // Otherwise, assume it’s ok.
  loaded = true;
  return loaded;
};

const imgCanBeSized = ({ img }) => {
  // if the img is an `<img>` tag, has loaded, and has the sizes=auto attribute,
  // then its size can be set
  let canBeSized = false;

  if (
    IMG_REGEX.test(img.nodeName || '') &&
    imageLoaded({ img }) &&
    imgHasAttributes({ img })
  ) {
    canBeSized = true;
  } else {
    if (!IMG_REGEX.test(img.nodeName || '')) {
      console.warn('Img did not match REGEX');
    }
    if (!imageLoaded({ img })) {
      console.warn('\n Img has not loaded');
    }
    if (!imgHasAttributes({ img })) {
      console.warn('\n Image does not have attributes');
    }
  }

  return canBeSized;
};

const getWidth = function ({ img, parent, width }) {
  let elementWidth = width || img.offsetWidth;

  while (elementWidth < WIDTH_MIN_SIZE && parent && !img._ixWidth) {
    elementWidth = parent.offsetWidth;
    parent = parent.parentNode;
  }

  return elementWidth;
};

const setElementSize = ({ img }) => {
  const parent = img.parentNode;

  if (parent) {
    let width = img.offsetWidth;
    width = getWidth({ img, parent, width });

    if (width && width !== img._ixWidth) {
      resizeElement({ img, parent, width });
    }
  }
};

const resizeElement = ({ img, parent, width }) => {
  // use the rAFIt helper to avoid incurring performance hit
  return rAF(function () {
    let sources, i;
    // store the value of width before it's stringified so it can be compared later
    img._ixSizesWidth = width;
    width += 'px';

    img.setAttribute('sizes', width);

    // parent node is a <picture> element, so set sizes for each `<source>`
    if (PICTURE_REGEX.test(parent.nodeName || '')) {
      sources = parent.getElementsByTagName('source');
      for (i = 0; i < sources.length; i++) {
        sources[i].setAttribute('sizes', width);
      }
    }
  });
};

const setImgSize = ({ img }) => {
  let result = false;
  const canBeSized = imgCanBeSized({ img });

  if (canBeSized) {
    console.info('\n---------  *  -----------');
    console.info('Image can be sized!');
    console.info(img);
    console.info('\n---------  *  -----------');
    setElementSize({ img });
    result = true;
  } else {
    console.info('\n---------  *  -----------');
    console.info('Image could not be resized.');
    console.info('\n---------  *  -----------');
  }

  return result;
};

module.exports = setImgSize;
