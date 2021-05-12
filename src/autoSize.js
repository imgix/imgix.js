const util = require('./util');

const WIDTH_MIN_SIZE = 40;
const MAX_TIMEOUT = 200;
const MAX_RUNTIME = 1;

// If element's width is less than parent width, use the parent's. If
// resulting width is less than minimum, use the minimum. Do this to
// Avoid failing to resize when window expands and avoid setting sizes
// to 0 when el.offsetWidth == 0.
const getWidth = function ({ parent, width }) {
  // TODO: add check and test for parent == null

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
    width = WIDTH_MIN_SIZE;
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
const imgCanBeSized = ({ el, existingSizes }) => {
  if (!existingSizes) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element without existing sizes attribute value'
    );
    return false;
  }

  if (!el.hasAttributes()) {
    console.warn(
      'Imgix.js: attempted to set sizes attribute on element with no attributes'
    );
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

const resizeElement = ({ el, existingSizes, _window }) => {
  // Run our resize function callback that calcs current size
  // and updates the elements `sizes` to match.
  const currentSize = getCurrentSize({ el, existingSizes });

  // Only update element attributes if changed
  if (currentSize !== existingSizes) {
    _window.requestAnimationFrame(() => {
      el.setAttribute('sizes', currentSize);
    });
  }
};

const enqueuePendingTasks = ({ state, _window }) => {
  // Only schedule the rIC if one has not already been set.
  if (state.isRequestIdleCallbackScheduled) return;

  state.isRequestIdleCallbackScheduled = true;

  // Wait at most 200 milliseconds before processing cbs.
  _window.requestIdleCallback(processPendingIdleCallbacks, {
    timeout: MAX_TIMEOUT,
  });
};

const processPendingIdleCallbacks = ({ deadline, state, _window }) => {
  // Reset the boolean so future rICs can be set.
  state.isRequestIdleCallbackScheduled = false;

  // If there is no deadline, just run as long as necessary.
  // This will be the case if requestIdleCallback had to be shimmed.
  if (typeof deadline === 'undefined') {
    deadline = {
      timeRemaining: function () {
        return MAX_RUNTIME;
      },
    };
  }

  // Run for as long as there is time remaining and tasks in queue.
  while (deadline.timeRemaining() > 0 && state.queue.length > 0) {
    // remove task from queue
    let task = state.queue.pop();
    // run the task
    task();
  }

  // Check if there are more tasks still to enqueue
  if (state.queue.length > 0) enqueuePendingTasks({ state, _window });
};

// Function that makes throttled rAF calls to avoid multiple calls in the same frame
const updateOnResize = ({ el, existingSizes, _window }) => {
  // ensure rIC is defined on _window
  _window.requestIdleCallback = util.rICShim(_window);
  _window.cancelIdleCallback = util.cICShim(_window);

  // Listen for resize
  _window.addEventListener(
    'resize',
    () => {
      // store and or create the rIC queue
      _window.requestIdleCallbackQueue = _window.requestIdleCallbackQueue
        ? _window.requestIdleCallbackQueue
        : [];

      const queue = _window.requestIdleCallbackQueue;
      queue.push(() => resizeElement({ el, existingSizes, _window }));
      // when there's a lull in computation during render, add this callback to event loop
      _window.requestIdleCallback(
        (deadline) => {
          const state = {
            isRequestIdleCallbackScheduled: true,
            queue,
          };
          processPendingIdleCallbacks({ deadline, state });
        },
        // otherwise, wait max milliseconds before adding cb to event loop
        { timeout: MAX_TIMEOUT }
      );
    },
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
