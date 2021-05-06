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
    cy.viewport(500, 500);
  });

  beforeEach(() => {
    cy.fixture('config.js').as('config');
  });

  it('Updates the sizes attribute on resize', () => {
    cy.get('[data-test-id="sizes"]', { timeout: 10000 }).each(($el) => {
      const expectedSize = Math.ceil($el.width());
      const imgSize = Number($el.attr('sizes').split('px')[0]);
      assert.isAtMost(imgSize, 500);
      assert.isAtLeast(imgSize, expectedSize);
    });
  });

  context('When multiple resizes happen', () => {
    it(`Does not update size before debounce is finished`, () => {
      cy.get('[data-test-id="sizes"]')
        .first()
        .then(($el) => {
          // store and check the image size before resize
          let imgSize = Number($el.attr('sizes').split('px')[0]);
          const expectedSize = Math.ceil($el.width());
          assert.isAtMost(imgSize, 500);
          // resize and wait only 10ms
          cy.viewport(1000, 500);
          cy.wait(10);
          // check sizes has NOT changed
          imgSize = Number($el.attr('sizes').split('px')[0]);
          assert.isAtMost(imgSize, 500);
          assert.isAtLeast(imgSize, expectedSize);
        });
    });
    it('Updates size after debounce has finished', () => {
      cy.viewport(1500, 500);
      cy.wait(300);
      cy.get('[data-test-id="sizes"]')
        .first()
        .then(($el) => {
          // check sizes HAS changed
          const newImgSize = Number($el.attr('sizes').split('px')[0]);
          assert.isAtLeast(newImgSize, 500);
          assert.isAtMost(newImgSize, 1500);
          expect(newImgSize).to.not.equal(404);
        });
    });
  });
});

describe('On an image whos width is too small or undefined', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
    cy.get('[data-test-id="sizes"]').invoke(
      'attr',
      'src',
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
    cy.get('[data-test-id="invalid-img"]').invoke(
      'attr',
      'src',
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
  });

  beforeEach(() => {
    cy.fixture('config.js').as('config');
  });

  it('Uses parent size as fallback', () => {
    cy.get('[data-test-id="sizes"]')
      .first()
      .then(($el) => {
        const imgSize = $el.attr('sizes');
        cy.get('[data-test-id="sizes-parent"]')
          .first()
          .then(($parent) => {
            const parentSize = $parent.width() + 'px';
            expect($el.attr('src')).to.equal(
              'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
            );
            expect(imgSize).to.equal(parentSize);
          });
      });
  });
});
