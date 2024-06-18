
describe('Create, update and delete song happy flow', () => {

  beforeEach(() => {
    cy.loginToAuth0('End2End@gmail.com','End2End@gmail.com');
  })

  it('should create a song', () => {
    
    cy.createSong("epic song", "this is a epic song", "2001-06-13")

  });

  it('should playsong', ()=>{
    cy.visit('localhost:3000/')
    cy.get('[data-cy="song"]').click()
    cy.get('[data-cy="playedSongAmount"]').should('contain.text', '0');
    cy.get('[data-cy="playSong"]').click()
    cy.get('[data-cy="playedSongAmount"]').should('contain.text', '1');
  });

  it('should update a song', () => {
    
    cy.updateSong("a not quite epic song", "this is a epic song", "2001-06-13")

  });
  
  it('should delete a song', () => {
    
    cy.deleteSong("a not quite epic song")

  });
});

describe('Create and delete song but make mistake while creating the song', () => {
  it('should create and delete a song', () => {
    cy.loginToAuth0('End2End@gmail.com','End2End@gmail.com');
    cy.createSongVarificationMistakes("epic song", "this is a epic song", "2001-06-13")
    cy.deleteSong("epic song")
  });
});

//createSongWithVarificationMistakes


describe('Create and delete playlist', () => {
  it('should log in via OAuth and store the token', () => {
    cy.loginToAuth0('End2End@gmail.com','End2End@gmail.com');
    cy.createSong("epic song", "this is a epic song", "2001-06-13")
    cy.visit('localhost:3000/');
    cy.get('[data-cy="playlist"]').click()
    cy.get('[data-cy="playlistnew"]').click()
    cy.get('[data-cy="pl-name"]').type("EndToEnd play list")
    cy.get('[data-cy="pl-description"]').type("EndToEnd play list description")
    cy.get('[data-cy="pl-new-item-description"]').type("item discription")
    cy.get('[data-cy="pl-new-item-button"]').click()
    cy.get('#react-select-3-input').click()
    cy.get('#react-select-3-input').type("s")
    cy.get('#react-select-3-option-0').click()
    cy.get('[data-cy="pl-new-item-description"]').type("Second item")
    cy.get('[data-cy="pl-new-item-button"]').click()
    cy.get('[data-cy="playItem-up-1"]').click()
    cy.get('[data-cy="playItem-text-0"]').should('have.value', 'Second item')
    cy.get('[data-cy="pl-create"]').click()
    cy.get('[data-cy="pl-run"]').click()
    cy.get('[data-cy="pl-description"]').should('contain.text', 'Second item');
    cy.get('[data-cy="pl-song"]').should('not.exist')
    cy.get('[data-cy="pl-next"]').click()
    cy.get('[data-cy="pl-description"]').should('contain.text', 'item discription');
    cy.get('[data-cy="pl-song"]').should('exist')
    cy.get('[data-cy="pl-previous"]').click()
    cy.get('[data-cy="pl-description"]').should('contain.text', 'Second item');
    cy.get('[data-cy="pl-song"]').should('not.exist')
    cy.visit('localhost:3000/');
    cy.get('[data-cy="playlist"]').click()
    cy.get('[data-cy="pl-delete"]').should('exist')
    cy.get('[data-cy="pl-delete"]').click()
    cy.get('[data-cy="pl-delete"]').should('not.exist')
    cy.deleteSong("epic song")
    //cy.get('input#username').type(username) pl-song
  });
});

/*describe('template spec 2', () => {
  it('passes', () => {
    cy.visit('localhost:3000/');
    

    //cy.get('button').contains('login').click()
  })
})*/