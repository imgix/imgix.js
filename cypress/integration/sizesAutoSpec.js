describe('On a pages first render', () => {
  before(() => {
    cy.visit('/cypress/fixtures/samplePage.html');
  });
  beforeEach(() => {
    cy.fixture('config.js').as('config');
  });

  it('Sizes attribute is correctly set', () => {
    cy.get('.sizes-test', { timeout: 10000 }).each(($el) => {
      const expectedSize = Math.ceil($el.width()) + 'px';
      const imgSize = $el.attr('sizes');
      expect(imgSize).to.equal(expectedSize);
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
    cy.get('.sizes-test', { timeout: 10000 }).each(($el) => {
      const expectedSize = Math.ceil($el.width()) + 'px';
      const imgSize = $el.attr('sizes');
      expect(imgSize).to.equal(expectedSize);
    });
  });

  it('Stores previous measured width value if window is resized', () => {
    cy.get('.sizes-test', { timeout: 300 }).each(($el) => {
      const imgOffsetWidth = $el.attr('_ixWidth');
      // _ixWidth helps us avoid setting the sizes attr if
      // its already been updated to the current value. Ie
      // if _ixWidth == 40px and offsetWidth == 40px, don't
      // overwrite sizes attr, already been done at this width.
      expect(imgOffsetWidth).to.exist;
    });
  });

  it('Tracks the status of the resize event listener', () => {
    cy.get('.sizes-test').each(($el) => {
      const listenerStatus = $el.attr('_ixListening');
      // _ixListening tracks if event listener has been
      // removed from the element yet or not.
      expect(listenerStatus).to.exist;
    });
  });

  it('Tracks call to rAF', () => {
    cy.get('.sizes-test').each(($el) => {
      const rAFId = $el.attr('_ixRaf');
      // _ixRaf tracks the rAF id of the element
      expect(rAFId).to.exist;
    });
  });

  it('Cancels calls to rAF if a new call made in the same frame', () => {
    cy.viewport(500, 900);
    cy.get('.sizes-test').each(($el) => {
      const rAFId = $el.attr('_ixRaf');
      // _ixRaf tracks the rAF id of the element
      expect(rAFId).to.not.equal(1);
    });
  });

  //
});
