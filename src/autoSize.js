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

  console.log(el.offsetWidth, parentWidth, width);
  return width;
};

const autoSize = {
  getElementWidth: getWidth,
};

module.exports = autoSize;
