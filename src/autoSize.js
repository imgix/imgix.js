const WIDTH_MIN_SIZE = 40;

// If element's width is less than parent width, use the parent's. If
// resulting width is less than minimum, use the minimum. Do this to
// Avoid failing to resize when window expands and avoid setting sizes
// to 0 when el.offsetWidth == 0.
const getWidth = function ({ el, parent, width }) {
  let parentWidth = parent.offsetWidth;

  // get the fist parent that has a size over the minimum
  while (parent.parentNode && parentWidth < WIDTH_MIN_SIZE) {
    parentWidth = parent.parentNode.offsetWidth;
    parent = parent.parentNode;
  }

  if (width < parentWidth) {
    width = parentWidth;
  }
  if (width < WIDTH_MIN_SIZE) {
    width = el._ixWidth ? el._ixWidth : WIDTH_MIN_SIZE;
  }

  el.setAttribute('_ixWidth', width);

  return width;
};

// Based off of: https://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-with-jquery
// Determines if the `img` element was rendered on the page
const imageLoaded = ({ el }) => {
  // During the onload event, browser identifies any images that
  // weren’t downloaded as not complete. Some Gecko-based browsers
  // report this incorrectly. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-complete
  if (!el.complete) {
    console.error('not complete');
    return false;
  }

  // naturalWidth and naturalHeight give the intrinsic (natural),
  // density-corrected size of the image. If img failed to load,
  // both of these will be zero. More here: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-naturalheight
  if (el.naturalWidth === 0) {
    console.error('no natural width');
    return false;
  }

  // Otherwise, assume it’s ok.
  return true;
};

// Returns true if img has sizes attr and the img has loaded.
const imgCanBeSized = ({ el, existingSizes }) => {
  if (!existingSizes) {
    return false;
  }

  if (!el.hasAttributes()) {
    return false;
  }

  return imageLoaded({ el });
};

const getCurrentSize = ({ el, existingSizes }) => {
  // TODO: instead of sizes="557px" do sizes="(max-width: currentBrowserWidth + 100) 557px, 100vw"
  // browserWidth = 1000px, image width = 500px
  // sizes="(max-width: currentBrowserWidth + 100) 557px, (imageWidth / browserWidth * 100)vw" --> 50vw

  // If image loaded calc size, otherwise leave as existing
  let currentSize = imgCanBeSized({ el, existingSizes })
    ? getWidth({
        el,
        parent: el.parentNode,
        width: el.offsetWidth,
      }) + 'px'
    : existingSizes;

  return currentSize;
};

const rAF = ({ el, existingSizes, _window }) => {
  // If there's an existing rAF call, cancel it
  let currentRAF = el.getAttribute('_ixRaf');
  if (currentRAF) {
    el.setAttribute('_ixListening', false);
    el.setAttribute('_ixRaf', -1);
    _window.cancelAnimationFrame(currentRAF);
  }

  // Setup the new requestAnimationFrame()
  currentRAF = _window.requestAnimationFrame(() => {
    // Track the status of the listener
    el.setAttribute('_ixListening', true);
    // Run our resize function callback that calcs current size
    // and updates the elements `sizes` to match.
    const currentSize = getCurrentSize({ el, existingSizes });

    // Only update element attributes if changed
    if (currentSize !== existingSizes) {
      el.setAttribute('sizes', currentSize);
    }

    return currentSize;
  });
  // track the rAF id
  el.setAttribute('_ixRaf', currentRAF);
};

// Function that makes throttled rAF calls to avoid multiple calls in the same frame
const updateOnResize = ({ el, existingSizes, _window }) => {
  // Listen for resize
  _window.addEventListener(
    'resize',
    (event) => rAF({ el, existingSizes, _window }),
    false
  );
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
