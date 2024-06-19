describe('Create and delete show', () => {
  beforeEach(() => {
    cy.loginToAuth0('End2End@gmail.com','End2End@gmail.com');
    cy.visit('localhost:3000/');
  })
  it('should Check if show can be deleted', () => {
    cy.get('[data-cy="show"]').click()
    cy.get('[data-cy="show-name"]').should('exist'); 
    cy.get('[data-cy="show-delete"]').should('not.exist'); 
  });
  it('should Fail to create a Show', () => {
    cy.get('[data-cy="show"]').click();
    cy.get('[data-cy="show-new"]').click();
    cy.get('[data-cy="show-required-name"]').should('not.exist');
    cy.get('[data-cy="show-required-Description"]').should('not.exist');
    cy.get('[data-cy="show-required-showLanguage"]').should('not.exist');
    cy.get('[data-cy="show-submit"]').click();
    cy.get('[data-cy="show-required-name"]').should('exist');
    cy.get('[data-cy="show-required-Description"]').should('exist');
    cy.get('[data-cy="show-required-showLanguage"]').should('exist'); 
    cy.get('[data-cy="show"]').click();
    cy.get('[data-cy="show-name"]').should('not.contain.text', 'MyNewShow');
  });

  it('should Create a Show', () => {
    cy.get('[data-cy="show"]').click();
    cy.get('[data-cy="show-new"]').click();

    cy.get('#showName').type('MyNewShow')
    cy.get('#showDescription').type('MyNewShowDis')
    cy.get('[data-cy="show-l"]').select('English');
    cy.get('[data-cy="show-submit"]').click();
    
  });
  it('should check if show exists', () => {
    cy.get('[data-cy="show"]').click();
    cy.get('[data-cy="show-name"]').should('contain.text', 'MyNewShow');
  });
  it('should deleteshow', () => {
    cy.get('[data-cy="show"]').click();
    cy.get('[data-cy="show-name"]').should('contain.text', 'MyNewShow');

    cy.on('window:confirm', (message) => {
      return true;
    });

    cy.get('[data-cy="delete"]').eq(1).click();
    cy.get('[data-cy="show-name"]').should('exist'); 
    cy.get('[data-cy="delete"]').should('not.exist'); 

  });
});

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

describe('Create and delete playlist', () => {
  it('should fail to playlist', () => {
    cy.loginToAuth0('End2End@gmail.com','End2End@gmail.com');
    cy.visit('localhost:3000/');
    cy.get('[data-cy="playlist"]').click()
    cy.get('[data-cy="playlistnew"]').click()
    cy.get('[data-cy="playlist-required-name"]').should('not.exist');
    cy.get('[data-cy="playlist-required-description"]').should('not.exist');
    cy.get('[data-cy="playlist-required-items"]').should('not.exist'); 
    cy.get('[data-cy="pl-create"]').click()
    cy.get('[data-cy="playlist-required-name"]').should('exist');
    cy.get('[data-cy="playlist-required-description"]').should('exist');
    cy.get('[data-cy="playlist-required-items"]').should('not.exist'); 
    cy.get('[data-cy="pl-name"]').type("EndToEnd play list")
    cy.get('[data-cy="pl-description"]').type("EndToEnd play list description")
    cy.get('[data-cy="pl-create"]').click()
    cy.get('[data-cy="playlist-required-name"]').should('not.exist');
    cy.get('[data-cy="playlist-required-description"]').should('not.exist');
    cy.get('[data-cy="playlist-required-items"]').should('exist'); 
  });
  it('create, check and delete playlist', () => {
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