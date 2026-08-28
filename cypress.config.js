const { defineConfig } = require('cypress');
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');

module.exports = defineConfig({
  video: false,
  viewportWidth: 500,
  viewportHeight: 984,
  e2e: {
    specPattern: 'cypress/integration/**/*.js',
    supportFile: 'cypress/support/index.js',
    testIsolation: false,
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        printLogsToConsole: 'onFail',
      });
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on('task', {
        lighthouse: lighthouse(),
        pa11y: pa11y(),
      });
      return config;
    },
  },
});
