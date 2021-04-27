describe('On a page with meta tag imgix paramaters', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
  });

  context('For images with sizes=auto', () => {
    beforeEach(() => {
      cy.fixture('config.js').as('config');
      // expect the number of image elements on the page to equal fixture's
      cy.get('img').should('have.length', 3);
      cy.viewport(500, 984);
    });

    it('Sizes attribute is correctly set', () => {
      cy.get('#sizes-test').each(($el) => {
        const imgSize = $el.attr('sizes');
        expect(imgSize).to.equal('984px');
      });
    });

    it('Sizes attribute is updated if window is resized', () => {
      function waitedForResize($window) {
        return new Cypress.Promise((resolve) => {
          // Cypress will wait for this Promise to resolve
          const onResizeEnd = (e) => {
            $window.removeEventListener(e.type, onResizeEnd); // cleanup
            resolve(); // resolve and allow Cypress to continue
          };
          $window.addEventListener('resize', onResizeEnd);
        });
      }

      cy.window().then(($window) =>
        waitedForResize($window).then(() => {
          cy.viewport(500, 500);
          cy.get('#sizes-test').each(($el) => {
            const imgSize = $el.attr('sizes');
            const imgOffsetWidth = $el.attr('_ixSizesWidth');
            expect(imgSize).to.equal(imgOffsetWidth + 'px');
          });
        })
      );
    });
  });
});
