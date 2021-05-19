const util = require('./util');

const WIDTH_MIN_SIZE = 40;
const DEBOUNCE_TIMEOUT = 200;

/**
 * Function that returns an element width that's equal to or greater than
 * WIDTH_MIN_SIZE.
 *
 * If the element width is less than the minimum, it will recursively
 * look for first parent element with width greater than WIDTH_MIN_SIZE.
 *
 * As a fallback, if the resulting width is still less than minimum, width
 * is set to WIDTH_MIN_SIZE.
 *
 * We do this to avoid failing to resize when window expands and avoid
 * setting sizes to 0 when el.offsetWidth == 0.
 */
const getWidth = function ({ parent, width }) {
  if (width < WIDTH_MIN_SIZE) {
    width = WIDTH_MIN_SIZE;

    // TODO: add check and test for parent == null
    let parentWidth = parent.offsetWidth;
    let parentNode = parent.parentNode;

    // get the fist parent that has a size over the minimum
    while (parentNode && parentWidth < width) {
      parentWidth = parentNode.offsetWidth;

      // set for next loop
      parentNode = parentNode.parentNode;
    }

    if (parentWidth > width) {
      width = parentWidth;
    }
  }
  return width;
};

// Based off of: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
// Determines if the `img` element was rendered on the page
const imageLoaded = ({ el }) => {
  // During the onload event, browser identifies any images that
  // weren’t downloaded as not complete. Some Gecko-based browsers
  // report this incorrectly. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-complete
  if (!el.complete) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element with complete evaluating to false'
    );
    return false;
  }

  // naturalWidth and naturalHeight give the intrinsic (natural),
  // density-corrected size of the image. If img failed to load,
  // both of these will be zero. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-naturalheight
  if (el.naturalWidth === 0) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element with no naturalWidth'
    );
    return false;
  }

  // Otherwise, assume it’s ok.
  return true;
};

// Returns true if img has sizes attr and the img has loaded.
const imgCanBeSized = ({ el, existingSizes, ixSizes, elHasAttributes }) => {
  if (!existingSizes && !ixSizes) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element without existing sizes attribute value'
    );
    return false;
  }

  if (!elHasAttributes) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element with no attributes'
    );
    return false;
  }

  return imageLoaded({ el });
};

const getCurrentSize = ({
  el,
  existingSizes,
  ixSizes,
  elHasAttributes,
  _window,
}) => {
  // TODO: instead of sizes="557px" do sizes="(max-width: currentBrowserWidth + 100) 557px, 100vw"
  // browserWidth = 1000px, image width = 500px
  // sizes="(max-width: currentBrowserWidth + 100) 557px, (imageWidth / browserWidth * 100)vw" --> 50vw

  // If image loaded calc size, otherwise leave as existing
  let currentSize = imgCanBeSized({
    el,
    existingSizes,
    ixSizes,
    elHasAttributes,
    _window,
  })
    ? getWidth({
        el,
        parent: el.parentNode,
        width: el.offsetWidth,
      }) + 'px'
    : existingSizes;

  return currentSize;
};

const resizeElement = ({
  el,
  existingSizes,
  ixSizes,
  _window,
  elHasAttributes,
}) => {
  // Run our resize function callback that calcs current size
  // and updates the elements `sizes` to match.
  const currentSize = getCurrentSize({
    el,
    existingSizes,
    ixSizes,
    elHasAttributes,
    _window,
  });

  // Only update element attributes if changed
  if (currentSize !== existingSizes) {
    _window.requestAnimationFrame(() => {
      el.setAttribute('sizes', currentSize);
    });
  }
};

// Function that makes throttled rAF calls to avoid multiple calls in the same frame
const updateOnResize = ({ el, existingSizes, ixSizes, _window }) => {
  // debounce fn
  const elHasAttributes = el.hasAttributes();

  const requestIdleCallback = util.rICShim(_window);
  const runDebounce = util.debounce(() => {
    requestIdleCallback(() =>
      resizeElement({ el, existingSizes, ixSizes, _window, elHasAttributes })
    );
  }, DEBOUNCE_TIMEOUT);
  // Listen for resize
  _window.addEventListener('resize', runDebounce, false);
  // Return the current size
  return (
    getWidth({
      el,
      parent: el.parentNode,
      width: el.offsetWidth,
    }) + 'px'
  );
};

const autoSize = {
  getElementWidth: getWidth,
  imgCanBeSized,
  updateOnResize,
};

module.exports = autoSize;
