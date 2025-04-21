/// <reference types="cypress" />

import loginPageSteps from '../pages/LoginPageSteps';
import users from '../fixtures/users.json';
import { handleCookies } from '../pages/cookiesWidgetSteps';

const viewportConfig = Cypress.env('viewportConfig');
const defaultTimeouts = Cypress.env('defaultTimeouts');

describe('Recruitment Portal Login Tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(viewportConfig.width, viewportConfig.height);
    loginPageSteps.userVisitLoginPage();
    handleCookies();
  });

  it('TC1: Go to login page and verify elements', () => {
    loginPageSteps.clickPhoneTab();
    loginPageSteps.clickEmailTab();
    cy.url().should('include', '/login');
    cy.title().should('include', 'Login');
  });

  it('TC2: Enter valid phone number and password', () => {
    const { phoneNumber, password } = users.userWithValidNumberAndPassword;
    loginPageSteps.login(phoneNumber, password);
    loginPageSteps.assertLoginSuccess(defaultTimeouts.MEDIUM_TIMEOUT);
  });
});
