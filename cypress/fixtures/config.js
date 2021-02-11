/**
 * TODO(luis):
 * Ideally in future this file can just import the /src/defaultConfig.
 * The issue is that cypress doesn't support certain .js characters atm,
 * so module imports are quiet limited for fixtures.
 *
 * context:
 * ```console
 * 'defaultConfig.js' is not a valid JavaScript object.SyntaxError: Unexpected token ';'
 * ```
 */
module.exports = {
  config: {
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
  },
}
