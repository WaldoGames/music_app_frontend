function loginViaAuth0Ui(username, password) {
  // App landing page redirects to Auth0.
  cy.visit('localhost:3000/')

  // Login on Auth0.
  cy.get('button').contains('login').click();
  cy.origin(
    'https://'+Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      //cy.visit('/u/login');
      cy.get('input#username').type(username)
      cy.get('input#password').type(password, { log: false })
      cy.contains('button[value=default]', 'Continue').click()
    }
  )

  // Ensure Auth0 has redirected us back to the RWA.
  cy.url().should('equal', 'http://localhost:3000/')
}

function createSong(songname, songdis, date){
  cy.visit('localhost:3000/')
  cy.get('[data-cy="song"]').click()
  cy.get('[data-cy="songnew"]').click()
  cy.get('#songName').type(songname)
  cy.get('#description').type(songdis)
  cy.get('#releaseDate').type(date)
  cy.get('#react-select-3-input').click()
  cy.get('#react-select-3-input').type("testArtist")
  cy.get('#react-select-3-option-0').click()
  cy.get('[data-cy="postNewSong"]').click()
  cy.visit('localhost:3000/')
}

function createSongWithVarificationMistakes(songname, songdis, date){
  cy.visit('localhost:3000/')
  cy.get('[data-cy="song"]').click()
  cy.get('[data-cy="songnew"]').click()
  cy.get('[data-cy="song-required-name"]').should('not.exist');
  cy.get('[data-cy="song-required-description"]').should('not.exist');
  cy.get('[data-cy="song-required-date"]').should('not.exist'); 
  cy.get('[data-cy="song-required-artists"]').should('not.exist'); 
  cy.get('[data-cy="postNewSong"]').click()
  cy.get('[data-cy="song-required-name"]').should('exist');
  cy.get('[data-cy="song-required-description"]').should('exist');
  cy.get('[data-cy="song-required-date"]').should('exist'); 
  cy.get('[data-cy="song-required-artists"]').should('exist'); 
  cy.get('#songName').type(songname)
  cy.get('#description').type(songdis)
  cy.get('#releaseDate').type(date)
  cy.get('#react-select-3-input').click()
  cy.get('#react-select-3-input').type("t")
  cy.get('#react-select-3-option-0').click()
  cy.get('[data-cy="postNewSong"]').click()
  cy.visit('localhost:3000/')
}

function DeleteSong(songname){
  cy.visit('localhost:3000/')
  cy.get('[data-cy="song"]').click()
  cy.get('[data-cy="songNameCol"]').should('contain.text', songname);

  cy.on('window:confirm', (message) => {
    // Optionally, you can assert the message if you need to
    expect(message).to.equal('Are you sure you want to delete this song? this will delete all related date including when the song has been played and all playlist which contain this song!');
    // Return true to simulate clicking 'OK'
    return true;
  });

  cy.get('[data-cy="delete"]').click()
  cy.get('[data-cy="songNameCol"]').should('not.exist');
}

function EditSong(songname, newDiscription, newDate){
  cy.visit('localhost:3000/')
  cy.get('[data-cy="song"]').click()
  cy.get('[data-cy="songEdit"]').click()
  cy.get('#songName').clear()
  cy.get('#description').clear()
  cy.get('#releaseDate').clear()
  cy.get('[data-cy="PutSong"]').click()
  cy.get('[data-cy="song-required-name"]').should('exist');
  cy.get('[data-cy="song-required-description"]').should('exist');
  cy.get('[data-cy="song-required-date"]').should('exist'); 
  cy.get('#songName').type(songname)
  cy.get('#description').type(newDiscription)
  cy.get('#releaseDate').type(newDate)
  cy.get('[data-cy="PutSong"]').click()
  cy.visit('localhost:3000/')
}

Cypress.Commands.add('loginToAuth0', (username, password) => {
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false,
  })
  log.snapshot('before')

  loginViaAuth0Ui(username, password)

  log.snapshot('after')
  log.end()
})

Cypress.Commands.add('createSong', (songname, songdis, date) => {
  const log = Cypress.log({
    displayName: 'Create song',
    message: [`creating a song named | ${songname}`],
    // @ts-ignore
    autoEnd: false,
  })
  log.snapshot('before')

  createSong(songname, songdis, date)

  log.snapshot('after')
  log.end()
})
Cypress.Commands.add('updateSong', (songname, songdis, date) => {
  const log = Cypress.log({
    displayName: 'Create song',
    message: [`creating a song named | ${songname}`],
    // @ts-ignore
    autoEnd: false,
  })
  log.snapshot('before')

  EditSong(songname, songdis, date)

  log.snapshot('after')
  log.end()
})
Cypress.Commands.add('createSongVarificationMistakes', (songname, songdis, date) => {
  const log = Cypress.log({
    displayName: 'Create song with mistakes',
    message: [`creating a song named | ${songname}`],
    // @ts-ignore
    autoEnd: false,
  })
  log.snapshot('before')

  createSongWithVarificationMistakes(songname, songdis, date)

  log.snapshot('after')
  log.end()
})

Cypress.Commands.add('deleteSong', (songname) => {
  const log = Cypress.log({
    displayName: 'Delete song',
    message: [`deleting a song | ${songname}`],
    // @ts-ignore
    autoEnd: false,
  })
  log.snapshot('before')

  DeleteSong(songname)

  log.snapshot('after')
  log.end()
})