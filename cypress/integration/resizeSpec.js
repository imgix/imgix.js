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
      cy.get('#sizes-test').each(($el) => {
        const imgSize = $el.attr('sizes');
        console.info($el, imgSize);
        expect(imgSize).to.equal('984px');
      });
    });
  });
});
