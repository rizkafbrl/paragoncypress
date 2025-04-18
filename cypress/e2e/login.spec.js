/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage';

describe('Recruitment Portal Login Tests', () => {
  beforeEach(() => {
    // Clear cookies and localStorage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Set viewport size
    cy.viewport(1280, 720);
  });
  
  it('TC1: Go to https://recruitment-staging-q.uesenbee.paradise.id/login', () => {
    // Visit the login page
    LoginPage.visit();
    
    // Verify that the page has loaded correctly
    cy.get('form, .login-form, .login-container')
      .should('be.visible');
    
    // Verify the login tabs are visible
    LoginPage.emailTab.should('be.visible');
    LoginPage.phoneTab.should('be.visible');
    
    // Verify URL
    cy.url().should('include', '/login');
    
    // Verify page title
    cy.title().should('include', 'Login');
  });
  
  it('TC2: Enter valid phone number and password', () => {
    // Test data from the requirements
    const phoneNumber = '62857965295270';
    const password = 'Testing123!';
    
    // Login with phone number
    LoginPage.loginWithPhone(phoneNumber, password);
    
    // Wait for response and verify successful login
    cy.wait('@loginRequest', { timeout: 15000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 201, 204, 302]);
    
    // Verify redirection away from login page
    cy.url({timeout: 15000}).should('not.include', '/login');
    
    // Verify user is logged in
    // Note: These selectors may need to be adjusted based on the actual application structure
    cy.get('.user-profile, .dashboard-container, .welcome-message, [data-test="user-logged-in"]', { timeout: 15000 })
      .should('be.visible');
    
    // Log success message
    cy.log('Successfully logged in with phone number: ' + phoneNumber);
  });
});
