// Define paths as variables

require('cypress-xpath');
 
const paths = {
    firstName: '[placeholder="First name"]', 
    lastName: '[placeholder="Last Name"]',
    username: '[placeholder="User name"]',
    password: '[placeholder="Password"]',
    confirmPassword: '[placeholder="Confirm Password"]',
    genderMale: '#mat-radio-2-input',
    genderFemale: '#mat-radio-3-input',
    registerButton: 'body > app-root > div > app-user-registration > div > mat-card > mat-card-content > form > mat-card-actions > button',
    usernameNotAvailable: '#mat-mdc-error-3',
    errorMessage: '.error-message'
  };
  
  describe('Registration Page Tests', () => {
    beforeEach(() => {
      // Visit the registration page before each test
      cy.visit('/register');
    });
  
    it.only('should register successfully with valid data', () => {
      cy.get(paths.firstName).type('Jhn');
      cy.get(paths.lastName).type('De');
      cy.get(paths.username).type('j_doe01');
      cy.get(paths.password).type('Password123!');
      cy.get(paths.confirmPassword).type('Password123!');
      cy.get(paths.genderMale).click();
      cy.xpath("//span[normalize-space()='Register']").click();
      cy.get(paths.registerButton).click();
        
      cy.wait(10000)
      cy.get(".mat-mdc-card-title.mat-h1")
      .should('have.text', 'Login');
    });
  
    it.only('should show error for already used username', () => {
      cy.get(paths.firstName).type('Jane');
      cy.get(paths.lastName).type('Doe');
      cy.get(paths.username).type('lee_01'); // Assuming "john_doe" is already registered
      cy.get(paths.password).type('Password123!');
      cy.get(paths.confirmPassword).type('Password123!');
      cy.get(paths.genderFemale).click();
      cy.xpath(paths.registerButton).trigger('click');
  
      cy.get(paths.usernameNotAvailable)
        .should('be.visible')
        .and('contain', 'User Name is not available');
    });
  
    it('should show error for empty first name', () => {
      cy.get(paths.lastName).type('Doe');
      cy.get(paths.username).type('unique_username');
      cy.get(paths.password).type('Password123!');
      cy.get(paths.confirmPassword).type('Password123!');
      cy.get(paths.genderMale).click();
      cy.get(paths.registerButton).click();
  
      cy.get(paths.errorMessage)
        .should('be.visible')
        .and('contain', 'First name is required');
    });
  
    it('should show error for empty last name', () => {
      cy.get(paths.firstName).type('John');
      cy.get(paths.username).type('unique_username');
      cy.get(paths.password).type('Password123!');
      cy.get(paths.confirmPassword).type('Password123!');
      cy.get(paths.genderMale).click();
      cy.get(paths.registerButton).click();
  
      cy.get(paths.errorMessage)
        .should('be.visible')
        .and('contain', 'Last name is required');
    });
  
    it('should show error for empty username', () => {
      cy.get(paths.firstName).type('John');
      cy.get(paths.lastName).type('Doe');
      cy.get(paths.password).type('Password123!');
      cy.get(paths.confirmPassword).type('Password123!');
      cy.get(paths.genderMale).click();
      cy.get(paths.registerButton).click();
  
      cy.get(paths.errorMessage)
        .should('be.visible')
        .and('contain', 'Username is required');
    });
  
    it('should show error for empty password', () => {
      cy.get(paths.firstName).type('John');
      cy.get(paths.lastName).type('Doe');
      cy.get(paths.username).type('unique_username');
      cy.get(paths.confirmPassword).type('Password123!');
      cy.get(paths.genderMale).click();
      cy.get(paths.registerButton).click();
  
      cy.get(paths.errorMessage)
        .should('be.visible')
        .and('contain', 'Password is required');
    });
  
    it('should show error for password mismatch', () => {
      cy.get(paths.firstName).type('John');
      cy.get(paths.lastName).type('Doe');
      cy.get(paths.username).type('unique_username');
      cy.get(paths.password).type('Password123!');
      cy.get(paths.confirmPassword).type('Password321!'); // Mismatched password
      cy.get(paths.genderMale).click();
      cy.get(paths.registerButton).click();
  
      cy.get(paths.errorMessage)
        .should('be.visible')
        .and('contain', 'Passwords do not match');
    });
  
    it('should show error for empty gender selection', () => {
      cy.get(paths.firstName).type('John');
      cy.get(paths.lastName).type('Doe');
      cy.get(paths.username).type('unique_username');
      cy.get(paths.password).type('Password123!');
      cy.get(paths.confirmPassword).type('Password123!');
      cy.get(paths.registerButton).click();
  
      cy.get(paths.errorMessage)
        .should('be.visible')
        .and('contain', 'Gender is required');
    });
  });
  