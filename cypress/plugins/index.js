module.exports = (on) => {
  require('cypress-terminal-report/src/installLogsPrinter')(on, {
    printLogsToConsole: 'onFail',
  });
};
