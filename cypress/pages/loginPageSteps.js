/// <reference types="cypress" />

import loginPageSelectors from '../selectors/loginPageSelectors';
import { disableBannerAds } from './bannerAdsSteps';

const defaultTimeouts = Cypress.env('defaultTimeouts');

class LoginPageSteps {

  userVisitLoginPage() {
    cy.visit('/login');
    disableBannerAds();
  }

  clickPhoneTab() {
    return cy.get(loginPageSelectors.phoneTab).should('be.visible').click();
  }

  clickEmailTab() {
    return cy.get(loginPageSelectors.emailTab).should('be.visible').click();
  }

  fillPhone(phone) {
    this.clickPhoneTab();
    cy.get(loginPageSelectors.inputPhoneNumber)
      .should('be.visible')
      .clear()
      .type(phone, { delay: 50 });
    return this;
  }

  fillPassword(password) {
    cy.get(loginPageSelectors.inputPassword)
      .should('be.visible')
      .clear()
      .type(password, { delay: 50 });
    return this;
  }

  clickLogin() {
    return cy.get(loginPageSelectors.buttonLogin).should('be.visible').click();
  }

  login(phone, password) {
    this.fillPhone(phone).fillPassword(password).clickLogin();
    return this;
  }

  assertLoginSuccess(timeout = defaultTimeouts.FAST_TIMEOUT) {
    cy.get(loginPageSelectors.userProfile, { timeout }).should('be.visible');
    cy.url({ timeout }).should('not.include', '/login');
    return this;
  }
}

export default new LoginPageSteps();
