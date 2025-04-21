/// <reference types="cypress" />

import loginPageSteps from '../pages/LoginPageSteps';
import productDetailsPageSteps from '../pages/productDetailsPageSteps';
import users from '../fixtures/users.json';
import { handleCookies } from '../pages/cookiesWidgetSteps';

const viewportConfig = Cypress.env('viewportConfig');
const defaultTimeouts = Cypress.env('defaultTimeouts');

describe('User Checkout Tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(viewportConfig.width, viewportConfig.height);
    loginPageSteps.userVisitLoginPage();
    handleCookies();
  });

  it('TC1: User Able To Perform Checkout Via Search', () => {
    const { phoneNumber, password } = users.userWithValidNumberAndPassword;
    loginPageSteps.login(phoneNumber, password);
    loginPageSteps.assertLoginSuccess(defaultTimeouts.QUICK_TIMEOUT);
  });

  it('TC2: User Able To Checkout Via Products Details Page', () => {
    const { phoneNumber, password } = users.userWithValidNumberAndPassword;
    loginPageSteps.login(phoneNumber, password);
    loginPageSteps.assertLoginSuccess(defaultTimeouts.QUICK_TIMEOUT);

    const productName = 'Fitclair-Collagen-Drink';
    const productAmmount = 10;
    productDetailsPageSteps.userOpenSpecificProduct(productName);
    productDetailsPageSteps.verifyUserSuccessfullyOpenedProductDetailsPage();
    productDetailsPageSteps.addMultipleProduct(productAmmount);
    prodictDetailsPageSteps.userCheckoutFromProductDetailsPage();
  });
});