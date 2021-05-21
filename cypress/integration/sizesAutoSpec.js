describe('If `sizes` is already set on the image', () => {
  before(() => {
    cy.visit('/cypress/fixtures/index.html');
  });
  beforeEach(() => {
    cy.fixture('config.js').as('config');
  });

  it('It leaves sizes as is even if `ix-sizes` is `auto`', () => {
    cy.get('[data-test-id="sizes-defined"]', { timeout: 10000 }).each(($el) => {
      const expectedSize = '25.123vw';
      const imgSize = $el.attr('sizes');
      expect(imgSize).to.equal(expectedSize);
    });
  });
});

describe('If `sizes` and `ix-sizes` not set', () => {
  before(() => {
    cy.visit('/cypress/fixtures/index.html');
  });
  beforeEach(() => {
    cy.fixture('config.js').as('config');
  });

  it('It sets `sizes` to browser default', () => {
    cy.get('[data-test-id="sizes-not-set"]', { timeout: 10000 }).each(($el) => {
      const expectedSize = '100vw';
      const imgSize = $el.attr('sizes');
      expect(imgSize).to.equal(expectedSize);
    });
  });
});

describe('On a pages first render', () => {
  before(() => {
    cy.visit('/cypress/fixtures/index.html');
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
    cy.visit('/cypress/fixtures/index.html');
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

  it('Does not significantly impact performance', () => {
    cy.lighthouse({
      // metaSpec consistently outputs a performance score of 98
      performance: 97,
    });
  });

  context('When multiple resizes happen', () => {
    it('Does not significantly impact performance', () => {
      cy.viewport(1500, 500);
      cy.viewport(500, 500);
      cy.lighthouse({
        // metaSpec consistently outputs a performance score of 98
        performance: 97,
      });
    });
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

describe('On an invalid image or an image that has not loaded', () => {
  beforeEach(() => {
    cy.visit('/cypress/fixtures/index.html');
    cy.get('[data-test-id="invalid-img"]').invoke(
      'attr',
      'src',
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
    cy.fixture('config.js').as('config');
  });

  it('Uses parent size as fallback', () => {
    cy.get('[data-test-id="invalid-img"]')
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

  it('Does not update sizes on window resize', () => {
    // resize the window and wait for debounce to execute
    cy.viewport(1500, 500);
    cy.wait(300);
    cy.get('[data-test-id="sizes"]')
      .first()
      .then(($el) => {
        // check sizes HAS changed on valid image
        const newImgSize = Number($el.attr('sizes').split('px')[0]);
        assert.isAtLeast(newImgSize, 500);
        assert.isAtMost(newImgSize, 1500);
        expect(newImgSize).to.not.equal(404);

        // check sizes HAS NOT changed on invalid image
        cy.get('[data-test-id="invalid-img"]')
          .first()
          .then(($ele) => {
            /**
             * We want to test that autoSizes does not modify that image's sizes attribute.
             * This is because an image that has not loaded should not get modified by the
             * module. The invalid image, $ele, width here will evaluate to 100vw. This is
             * despite the fact that it has not loaded. This is because $ele.width() is
             * evaluated in the context of the test's runtime. At this point, other images
             * on the page have loaded, changing the available width for the element. So
             * it's not a good source of truth to ensure that sizes was not modified.
             *
             * Instead, we can use the elements width attribute, which does not get
             * updated after the image above it (in the same container) loads.
             */
            const imgSize = Number($ele.attr('sizes').split('px')[0]);
            const expectedSize = Number($ele.attr('width').split('px')[0]);
            assert.isAtLeast(imgSize, expectedSize);
            assert.isAtMost(imgSize, 500);
          });
      });
  });
});
