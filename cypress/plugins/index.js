const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');

module.exports = (on, config) => {
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
};
