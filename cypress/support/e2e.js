// Import commands.js using ES2015 syntax:
import './commands';

// Import cypress-axe for accessibility testing
import 'cypress-axe';

// Import cypress-real-events for simulating real user interactions
import 'cypress-real-events';

// Handle uncaught exceptions to prevent test failures
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

// Replace Cypress.Cookies.defaults with cy.session
Cypress.Commands.add('preserveSession', () => {
  cy.session('session_id', () => {
    // Logic to preserve session or set cookies
    cy.setCookie('session_id', 'your-session-id-value');
    cy.setCookie('remember_token', 'your-remember-token-value');
  });
});

// Example usage of preserveSession in beforeEach
beforeEach(() => {
  cy.preserveSession();
  cy.log(`Running test on URL: ${Cypress.config('baseUrl')}`);
});

// Accept cookies command
Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then($body => {
    if ($body.find('.cookies-banner, .cookie-consent, .styles_cookies-button__mJJow').length > 0) {
      cy.get('.cookies-banner button, .cookie-consent button, .styles_cookies-button__mJJow')
        .click()
        .then(() => {
          cy.log('Cookies consent accepted');
        });
    }
  });
});

// Wait for page load command
Cypress.Commands.add('waitForPageLoad', (timeout = 15000) => {
  cy.get('body', { timeout }).should('be.visible');
  cy.get('.loading-spinner, .loader', { timeout, log: false }).should('not.exist');
});

import '@testing-library/cypress/add-commands';

const app = window.top;
if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Add custom Chai assertion
chai.Assertion.addMethod('haveError', function (expectedError) {
  const obj = this._obj;
  new chai.Assertion(obj).to.be.visible;
  const text = obj.text();
  const hasError = text.toLowerCase().includes(expectedError.toLowerCase());
  this.assert(
    hasError,
    `Expected error message to include "${expectedError}" but got "${text}"`,
    `Expected error message to not include "${expectedError}"`
  );
});
