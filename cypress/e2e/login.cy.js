/// <reference types="cypress" />

describe('Login Scenario', () => {
  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Navigate to login page', () => {
    // Visit the login page
    cy.visit('/login');

    // Handle the banner if it exists
    cy.get('body').then(($body) => {
      if ($body.find('section.chakra-modal__content svg[style="cursor: pointer;"]').length > 0) {
        cy.get('section.chakra-modal__content svg[style="cursor: pointer;"]').click();
        cy.log('Banner closed successfully');
      }
    });

    // Verify login page is loaded
    cy.get('form, .login-form, .login-container').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('Perform login with valid credentials', () => {
    const email = 'demo@opencart.com';
    const password = 'demo';

    // Visit the login page
    cy.visit('/login');

    // Handle the banner if it exists
    cy.get('body').then(($body) => {
      if ($body.find('section.chakra-modal__content svg[style="cursor: pointer;"]').length > 0) {
        cy.get('section.chakra-modal__content svg[style="cursor: pointer;"]').click();
        cy.log('Banner closed successfully');
      }
    });

    // Enter email and password
    cy.get('#input-email').clear().type(email);
    cy.get('#input-password').clear().type(password);

    // Click login button
    cy.get('input[type="submit"]').click();

    // Verify successful navigation to account page
    cy.url().should('include', '/index.php?route=account/account');
    cy.get('h2').contains('My Account').should('be.visible');
  });
});
