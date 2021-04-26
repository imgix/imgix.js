describe('On a page with meta tag imgix paramaters', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
  });

  context('The images on the page', () => {
    beforeEach(() => {
      cy.fixture('config.js').as('config');
      // expect the number of image elements on the page to equal fixture's
      cy.get('img').should('have.length', 3);
    });

    it('Have meta tag paramters correctly applied', () => {
      cy.get('@config').then((config) => {
        // applpy the config params from the meta tags
        cy.get('meta')
          .each(($el) => {
            const property = $el.attr('property');
            const content = $el.attr('content');
            if (!!property && property.includes('ix')) {
              config[property.split('ix:')[1]] = content;
            }
          })
          .then(() => {
            cy.get('#sizes-test').each(($el) => {
              const imgSize = $el.attr('sizes');
              console.info($el, imgSize);
              expect(imgSize).to.equal('984px');
            });
          });
      });
    });
  });
});
