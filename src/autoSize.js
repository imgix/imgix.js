const WIDTH_MIN_SIZE = 40;
const PICTURE_REGEX = /^picture$/i;
const IMG_REGEX = /^img$/i;

/*
 *
 *
 * - `rAF` requestAnimationFrame implementation that queues up calls to rAF
 *
 * - `getElementSize` function that given an html element,
 *    determines its rendered size
 *
 * - `imgCanBeSized` Verify that the img has attributes. If it does, check
 *    that one of those is`sizes` and that its value is set to "auto".
 *
 * - `imgCanBeSized` function that determines if the `img` tag: 1) is an
 *    `img`, has finished loading, and if it has attributes that can be
 *     reassigned. This function is also exported.
 *
 * - `imageLoaded` function that determines if the `img` in question
 *    was rendered on the page
 *
 * - `getWidth` function checks if the element has a width. If it does,
 *    is it less than the minimum? If it is, get it's parent node's
 *    width instead.
 *
 * - `setElementSize` function that sets the element's size attribute if:
 *    1) it has a parent node and 2) the attr has changed.
 *
 * - `resizeElement` function that uses rAF enqueuer to set an element's
 *    `size` attr and store the previous size on the element as `ixImgSize`
 *
 *
 * - `setImgSize` function that sets an elements `size` attribute if
 *    `imgCanBeSized` by calling the `setElementSize` function.
 *    This function is exported.
 *
 */

// requestAnimationFrame implementation that queues up calls to rAF
const rAF = (function () {
  let running, waiting;
  let queue = [];

  const run = function () {
    running = true;
    waiting = false;
    // debugger;

    while (queue.length) {
      queue.shift()();
      // debugger;
    }

    running = false;
  };

  // helper that either adds to the fns queue or run the raf call
  const rafBatch = function (fn) {
    queue.push(fn);
    // debugger;

    // if not running a current batch and document is visible, run the rafBatch
    if (!running && !waiting) {
      waiting = true;
      // if browser does not support rAF, use setTimeout, otherwise use rAF
      // TODO(luis): this will break on SRR. Fix this.
      (document.hidden ? setTimeout : requestAnimationFrame)(run);
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
      canBeSized = true;
    } else {
      console.warn('\nDid not find image with attributes, ');
      console.warn(img.hasAttributes());
      console.warn('\n');
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
  // true if the img is an `<img>` tag, has loaded, and has attributes.
  let canBeSized = false;

  const loaded = imageLoaded({ img });
  const hasAttr = imgHasAttributes({ img });

  if (IMG_REGEX.test(img.nodeName || '') && loaded && hasAttr) {
    canBeSized = true;
  } else {
    if (!IMG_REGEX.test(img.nodeName || '')) {
      console.warn('Img did not match REGEX');
    }
    if (!loaded) {
      console.warn('\n Img has not loaded');
    }
    if (!hasAttr) {
      console.warn('\n Image does not have attributes');
    }
  }

  return canBeSized;
};

// Checks if the element has a width. If it does, is it less than the minimum?
// If it is, get it's parent node's width instead.
const getWidth = function ({ img, parent, width }) {
  let elementWidth = width !== undefined ? width : img.offsetWidth;

  while (elementWidth < WIDTH_MIN_SIZE && parent && !img._ixWidth) {
    elementWidth = parent.offsetWidth;
    parent = parent.parentNode;
  }

  if (elementWidth < WIDTH_MIN_SIZE) {
    elementWidth = WIDTH_MIN_SIZE;
  }

  console.log(elementWidth);

  return elementWidth;
};

// Set the element's size attribute if: 1) it has a parent node, 2) the attr has changed.
const setElementSize = ({ img, existingSizes }) => {
  let result = existingSizes ? existingSizes : WIDTH_MIN_SIZE;
  let width = img.offsetWidth;
  const parent = img.parentNode;

  if (parent) {
    width = getWidth({ img, parent, width });

    if (!!width && width !== img._ixWidth) {
      result = resizeElement({ img, parent, width });
    }
  }
  return result;
};

const resizeElement = ({ img, parent, width }) => {
  // use the rAFIt helper to avoid incurring performance hit
  debugger;
  return rAF(function () {
    let result;
    let sources, i;
    // store the value of width before it's stringified so it can be compared later
    img.setAttribute('_ixSizesWidth', width);

    width += 'px';

    img.setAttribute('sizes', width);

    result = width;

    // parent node is a <picture> element, so set sizes for each `<source>`
    if (PICTURE_REGEX.test(parent.nodeName || '')) {
      sources = parent.getElementsByTagName('source');
      for (i = 0; i < sources.length; i++) {
        sources[i].setAttribute('sizes', width);
      }
    }

    return result;
  });
};

const setImageSize = ({ img, existingSizes }) => {
  let result = existingSizes;
  const canBeSized = imgCanBeSized({ img });

  if (canBeSized) {
    result = setElementSize({ img, existingSizes });
  } else {
    console.warn('Image could not be resized.');
  }

  return result;
};

const autoSize = {
  setImageSize: setImageSize,
  imgCanBeSized: imgCanBeSized,
};

module.exports = autoSize;
