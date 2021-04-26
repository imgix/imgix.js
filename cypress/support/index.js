require('cypress-terminal-report/src/installLogsCollector')();

// Cypress.on('window:before:load', (win) => {
//   cy.stub(win.console, 'error', (msg) => {
//     cy.now('task', 'error', msg);
//   });

//   cy.stub(win.console, 'warn', (msg) => {
//     cy.now('task', 'warn', msg);
//   });
// });
