describe('OAuth Login', () => {
  it('should log in via OAuth and store the token', () => {
    cy.loginByOAuth('End2End@gmail.com','End2End@gmail.com');
    
    // Verify the user is authenticated
    cy.window().then((win) => {
      const auth0 = win.Auth0Client;
      //expect(auth0.isAuthenticated).to.be.true;
    });
  });
});

describe('template spec 2', () => {
  it('passes', () => {
    cy.visit('localhost:3000/');
    cy.loginByOAuth('End2End@gmail.com','End2End@gmail.com');


    cy.visit('localhost:3000/playlists')

    //cy.get('button').contains('login').click()
  })
})