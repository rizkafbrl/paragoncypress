/// <reference types="cypress" />

class LoginPage {
  // Element selectors for OpenCart login page
  get myAccountDropdown() {
    return cy.get('.dropdown:contains("My Account")');
  }
  
  get loginDropdownOption() {
    return cy.get('.dropdown-menu a:contains("Login")');
  }
  
  get emailInput() {
    return cy.get('#input-email');
  }
  
  get passwordInput() {
    return cy.get('#input-password');
  }
  
  get loginButton() {
    return cy.get('input[type="submit"]');
  }
  
  get forgotPasswordLink() {
    return cy.get('a:contains("Forgotten Password")');
  }
  
  get continueRegisterLink() {
    return cy.get('a:contains("Continue")');
  }
  
  get alertMessage() {
    return cy.get('.alert');
  }
  
  get myAccountHeading() {
    return cy.get('h2:contains("My Account")');
  }

  // Visit the home page
  visit() {
    cy.visit('/');
    return this;
  }

  // Navigate to login page from home page
  navigateToLogin() {
    this.myAccountDropdown.click();
    this.loginDropdownOption.click();
    return this;
  }

  // Type email address in the email field
  typeEmail(email) {
    this.emailInput.should('be.visible').clear().type(email, { delay: 50 });
    return this;
  }

  // Type password in the password field
  typePassword(password) {
    this.passwordInput.should('be.visible').clear().type(password, { delay: 50 });
    return this;
  }

  // Click the login button to submit the form
  clickLogin() {
    this.loginButton.should('be.visible').click();
    return this;
  }

  // Complete full login process with given credentials
  login(email, password) {
    this.visit();
    this.navigateToLogin();
    this.typeEmail(email);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  // Verify successful login by checking for My Account heading
  verifySuccessfulLogin(timeout = 10000) {
    this.myAccountHeading.should('be.visible', { timeout });
    cy.url().should('include', 'account/account', { timeout });
    return this;
  }

  // Assert error message appears with specified text
  assertErrorMessage(message, timeout = 10000) {
    this.alertMessage.should('be.visible', { timeout }).and('contain', message);
    return this;
  }
}

export default new LoginPage();
