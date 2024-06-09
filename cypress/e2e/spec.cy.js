/*beforeEach(() => {
  cy.visit('localhost:3000/');
  cy.log('I run before every test in every spec file!!!!!!')
  cy.get('button').contains('login').click()
  cy.wait(1000)
  cy.get('id="username"').type('End2End@gmail.com')
  cy.get('#password').type('End2End@gmail.com')
  cy.get('button').contains('Continue').click()
})*/

describe('OAuth Login', () => {
  it('should log in via OAuth and store the token', () => {
    cy.loginToAuth0('End2End@gmail.com','End2End@gmail.com');
    cy.visit('localhost:3000/');
    cy.get('[data-cy="playlist"]').click()
    cy.get('[data-cy="playlistnew"]').click()
    cy.get('[data-cy="pl-name"]').type("EndToEnd play list")
    cy.get('[data-cy="pl-description"]').type("EndToEnd play list description")
    cy.get('[data-cy="pl-new-item-description"]').type("item discription")
    cy.get('[data-cy="pl-new-item-button"]').click()
    cy.get('#react-select-3-input').click()
    cy.get('#react-select-3-input').type("s")
    //cy.get('input#username').type(username)
  });
});

/*describe('template spec 2', () => {
  it('passes', () => {
    cy.visit('localhost:3000/');
    

    //cy.get('button').contains('login').click()
  })
})*/