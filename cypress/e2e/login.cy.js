const username = "[placeholder=\"Username\"]"
const password = "[placeholder=\"Password\"]"
const submit = "button .mdc-button__label:contains(\"Login\")"

describe('Login Test', () => {
    beforeEach(() => {
      cy.visit('/login'); 
    });
  
    it('Logs in with valid credentials', () => {
      cy.get(username).type('lee_001'); 
      cy.get(password).type('Asdf123!@#'); 
  
      cy.get(submit).eq(1).click(); 
      
      cy.get('a')
        .contains('All Categories')
        .first()
        .should('exist')
        .and('be.visible');
      cy.url().should('include', '');
      cy.get("input[placeholder='Search books or authors']").should('exist')
    });

    it('Shows an error message for invalid password', () => {
      cy.get(username).type('lee_001');
      cy.get(password).type('invalidPassword');
      cy.get(submit).eq(1).click(); 
      cy.get('#mat-mdc-error-0')
        .should('be.visible')
        .and('contain', 'Username or Password is incorrect.');
      
  });
  
    it('Shows an error message for invalid credentials', () => {
      cy.get(username).type('invalidUsername');
      cy.get(password).type('invalidPassword');
      cy.get(submit).eq(1).click(); 
      cy.get('#mat-mdc-error-0')
        .should('be.visible')
        .and('contain', 'Username or Password is incorrect.');
      
  });
});