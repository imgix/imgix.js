describe('On a page with meta tag imgix paramaters', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
  });

  context('The images on the page', () => {
    beforeEach(() => {
      cy.fixture('config.js').as('config');
    });
    it('All loaded and rendered', () => {
      cy.get('[data-test-id="metaSpec"]').each(($el) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($el[0].naturalWidth).to.be.greaterThan(0);
      });
    });

    it('Interacted with the imgix instance', () => {
      cy.get('[data-test-id="metaSpec"]').each(($el) => {
        expect($el.attr('ix-initialized')).to.equal('ix-initialized');
      });
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
            // check that all the images have the config correctly applied
            cy.get('[data-test-id="metaSpec"]').each(($el) => {
              const imgSrc = $el.attr('src');
              const url = new URL(imgSrc);
              const configProtocol =
                config.useHttps === 'true' ? 'https:' : 'http:';

              expect(url.host).to.equal(config.host);
              expect(url.protocol).to.equal(configProtocol);
            });
          });
      });
    });
  });
});
