function waitedForResize($window) {
  // Cypress will wait for this Promise to resolve
  return new Cypress.Promise((resolve) => {
    const onResizeEnd = (e) => {
      $window.removeEventListener(e.type, onResizeEnd);
      // resolve and allow Cypress to continue
      resolve();
    };
    $window.addEventListener('resize', onResizeEnd);
  });
}

describe('On a page with meta tag imgix parameters', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
  });

  context('For images with sizes=auto', () => {
    beforeEach(() => {
      cy.fixture('config.js').as('config');
      cy.viewport(500, 984);
    });

    it('Sizes attribute is correctly set', () => {
      cy.get('.sizes-test').each(($el) => {
        const imgSize = $el.attr('sizes');
        const expectedSize = Math.ceil($el.width()) + 'px';
        expect(imgSize).to.equal(expectedSize);
      });
    });

    it('Sizes attribute is updated if window is resized', () => {
      cy.window().then(($window) =>
        waitedForResize($window).then(() => {
          cy.viewport(500, 500);
          cy.get('.sizes-test').each(($el) => {
            const imgSize = $el.attr('sizes');
            expect(imgSize).to.equal(500 + 'px');
          });
        })
      );
    });

    it('Stores previous measured width value if window is resized', () => {
      cy.window().then(($window) =>
        waitedForResize($window).then(() => {
          cy.viewport(500, 500);
          cy.get('.sizes-test').each(($el) => {
            const imgOffsetWidth = $el.attr('_ixWidth');
            // _ixWidth helps us avoid setting the sizes attr if
            // its already been updated to the current value. Ie
            // if _ixWidth == 40px and offsetWidth == 40px, don't
            // overwrite sizes attr, already been done at this width.
            expect(imgOffsetWidth).to.exist;
          });
        })
      );
    });

    it('Tracks the status of the resize event listener', () => {
      cy.window().then(($window) => {
        waitedForResize($window).then(() => {
          cy.viewport(500, 500);
          cy.get('.sizes-test').each(($el) => {
            const listenerStatus = $el.attr('_ixListening');
            // _ixListening tracks if event listener has been
            // removed from the element yet or not.
            expect(listenerStatus).to.exist;
          });
        });
      });
    });

    it('Tracks call to rAF', () => {
      cy.window().then(($window) => {
        waitedForResize($window).then(() => {
          cy.viewport(500, 500);
          cy.get('.sizes-test').each(($el) => {
            const rAFId = $el.attr('_ixTimeout');
            // _ixTimeout tracks the rAF id of the element
            expect(rAFId).to.exist;
          });
        });
      });
    });

    it('Cancels call to rAF is a new call made in the same frame', () => {
      cy.window().then(($window) => {
        waitedForResize($window).then(() => {
          cy.viewport(500, 500);
          cy.get('.sizes-test').each(($el) => {
            const rAFId = $el.attr('_ixTimeout');
            // _ixTimeout tracks the rAF id of the element
            expect(rAFId).to.equal('undefined');
          });
        });
      });
    });
  });
});
