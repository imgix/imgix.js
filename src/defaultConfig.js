module.exports = {
  // URL assembly
  host: null,
  useHttps: true,
  includeLibraryParam: true,
  defaultParams: {},

  // Output element attributes
  srcAttribute: 'src',
  srcsetAttribute: 'srcset',
  sizesAttribute: 'sizes',

  // Input element attributes
  srcInputAttribute: 'ix-src',
  pathInputAttribute: 'ix-path',
  paramsInputAttribute: 'ix-params',
  hostInputAttribute: 'ix-host',
  window: typeof window !== 'undefined' ? window : null,
};
