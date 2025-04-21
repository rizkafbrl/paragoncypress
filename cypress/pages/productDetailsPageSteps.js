/// <reference types="cypress" />

import productDetailsSelectors from '../selectors/productDetailsSelectors';
import { disableBannerAds } from './bannerAdsSteps';

const defaultTimeouts = Cypress.env('defaultTimeouts');

class ProductDetailsPage {
  userOpenSpecificProduct(productName) {
    cy.visit(`/product-details/${productName}`);
    disableBannerAds();
  }

  assertProductDetailsPageUrl() {
    cy.url().should('include', '/product-details');
  }

  assertProductDetailsTitle() {
    cy.get(productDetailsSelectors.productDetailsTitle).should('be.visible');
  }

  assertProductDetailsRightBox() {
    cy.get(productDetailsSelectors.rightProductDetailsBox).should('be.visible');
  }

  assertProductHasAddButton() {
    cy.get(productDetailsSelectors.addProducctButton).should('be.visible');
  }

  verifyUserSuccessfullyOpenedProductDetailsPage() {
    this.assertProductDetailsPageUrl();
    this.assertProductDetailsTitle();
    this.assertProductDetailsRightBox();
    this.assertProductHasAddButton();
  }

  addProductByAddButton() {
    cy.get(productDetailsSelectors.addProducctButton).should('be.visible').click();
  }

  addMultipleProduct(productAmount) {
    for (let i = 0; i < productAmount; i++) {
      this.addProductByAddButton();
      cy.wait(defaultTimeouts.FAST_TIMEOUT);
    }
  }

  userCheckoutFromProductDetailsPage() {
    disableBannerAds();
  }
}

export default new ProductDetailsPage();
