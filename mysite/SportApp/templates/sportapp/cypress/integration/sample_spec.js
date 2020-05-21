describe('Add a Card', () => {
  it('successfully loads', () => {
    cy.visit('/'); // change URL to match your dev URL
    cy.contains('clear cache').click();
    cy.contains('load serverdata').click();
    cy.get('.text-right')
      .find('button')
      .click();
    cy.contains('Pushup').click();
  });
});
