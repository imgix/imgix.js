describe('On a pages first render', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
  });
  beforeEach(() => {
    cy.fixture('config.js').as('config');
  });

  it('Sizes attribute is correctly set', () => {
    cy.get('[data-test-id="sizes"]', { timeout: 10000 }).each(($el) => {
      const expectedSize = Math.ceil($el.width());
      const imgSize = Number($el.attr('sizes').split('px')[0]);
      assert.isAtMost(imgSize, 500);
      assert.isAtLeast(imgSize, expectedSize);
    });
  });
});

describe('When a page gets resized', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
  });

  beforeEach(() => {
    cy.fixture('config.js').as('config');
    cy.viewport(500, 500);
  });

  it('Updates the sizes attribute on resize', () => {
    cy.get('[data-test-id="sizes"]', { timeout: 10000 }).each(($el) => {
      const expectedSize = Math.ceil($el.width());
      const imgSize = Number($el.attr('sizes').split('px')[0]);
      assert.isAtMost(imgSize, 500);
      assert.isAtLeast(imgSize, expectedSize);
    });
  });
});

describe('On an invalid image', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
    cy.get('[data-test-id="sizes"]', { timeout: 10000 }).invoke(
      'attr',
      'src',
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
  });

  beforeEach(() => {
    cy.fixture('config.js').as('config');
  });
  it('Does not modify sizes if image has not loaded', () => {
    cy.get('[data-test-id="sizes"]', { timeout: 10000 }).each(($el) => {
      cy.get('[data-test-id="100vw"]').each(($ele) => {
        const imgSize = $el.attr('sizes');
        const expectedSize = $ele.width() + 'px';
        expect($el.attr('src')).to.equal(
          'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        );
        expect(imgSize).to.equal(expectedSize);
      });
    });
  });
});
