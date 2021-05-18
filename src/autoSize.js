const util = require('./util');

const WIDTH_MIN_SIZE = 40;
const DEBOUNCE_TIMEOUT = 200;

const getParentColumnCount = ({ _window, parent }) => {
  /**
   *
   * In order to avoid always setting `size` to the same value as the view-width,
   * we need to check that the parent node is not itself divided into columns.
   * We can use the `getComputedStyle` to get the parent's CSS `columnCount` &
   * gridTemplateColumns values.
   *
   * For flex-box, grid, and other layout types, these property will be populated and
   * describe the ideal number of columns into which the content of the element
   * will be flowed.
   *
   * If the value is numeric, ie not the strings `auto`, `null`, etc, we can use
   * it to calculate the desired width:
   *
   * (elementWidth / parentColumnCount) -> newWidth
   *
   * Read more on column-count property here:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
   *
   */

  let parentColumnCount = 1;
  const alpha = /^[A-Za-z]+$/;

  const parentStyles = _window.getComputedStyle(parent);
  const { columnCount, gridTemplateColumns, ...rest } = { ...parentStyles };

  if (columnCount && !columnCount.match(alpha)) {
    parentColumnCount = columnCount;
  } else if (gridTemplateColumns && !gridTemplateColumns.match(alpha)) {
    if (gridTemplateColumns > parentColumnCount) {
      parentColumnCount = gridTemplateColumns;
    }
  }
  return parentColumnCount;
};

// If element's width is less than parent width, use the parent's. If
// resulting width is less than minimum, use the minimum. Do this to
// Avoid failing to resize when window expands and avoid setting sizes
// to 0 when el.offsetWidth == 0.
const getWidth = function ({ parent, width, _window }) {
  // TODO: add check and test for parent == null
  let parentWidth = parent.offsetWidth;

  // get the fist parent that has a size over the minimum
  let parentNode = parent.parentNode;
  while (parentNode && parentWidth < WIDTH_MIN_SIZE) {
    parentWidth = parentNode.offsetWidth;

    // set for next loop
    parentNode = parentNode.parentNode;
  }

  if (width < parentWidth) {
    width = parentWidth;
  }

  if (width < WIDTH_MIN_SIZE) {
    width = WIDTH_MIN_SIZE;
  }

  const parentColumnCount = getParentColumnCount({ _window, parent });

  return width / parentColumnCount;
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
const imgCanBeSized = ({ el, existingSizes, elHasAttributes }) => {
  if (!existingSizes) {
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

const getCurrentSize = ({ el, existingSizes, elHasAttributes, _window }) => {
  // TODO: instead of sizes="557px" do sizes="(max-width: currentBrowserWidth + 100) 557px, 100vw"
  // browserWidth = 1000px, image width = 500px
  // sizes="(max-width: currentBrowserWidth + 100) 557px, (imageWidth / browserWidth * 100)vw" --> 50vw

  // If image loaded calc size, otherwise leave as existing
  let currentSize = imgCanBeSized({
    el,
    existingSizes,
    elHasAttributes,
    _window,
  })
    ? getWidth({
        el,
        parent: el.parentNode,
        width: el.offsetWidth,
        _window,
      }) + 'px'
    : existingSizes;

  return currentSize;
};

const resizeElement = ({ el, existingSizes, _window, elHasAttributes }) => {
  // Run our resize function callback that calcs current size
  // and updates the elements `sizes` to match.
  const currentSize = getCurrentSize({
    el,
    existingSizes,
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
const updateOnResize = ({ el, existingSizes, _window }) => {
  // debounce fn
  const elHasAttributes = el.hasAttributes();

  const requestIdleCallback = util.rICShim(_window);
  const runDebounce = util.debounce(() => {
    requestIdleCallback(() =>
      resizeElement({ el, existingSizes, _window, elHasAttributes })
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
      _window,
    }) + 'px'
  );
};

const autoSize = {
  getElementWidth: getWidth,
  imgCanBeSized,
  updateOnResize,
};

module.exports = autoSize;
