import { cookiesWidgetSelectors } from '../selectors/cookiesWidgetSelectors';

export const handleCookies = () => {
  cy.get('body').then(($body) => {
    if ($body.find(`${cookiesWidgetSelectors.banner}, ${cookiesWidgetSelectors.consent}`).length > 0) {
      cy.get(cookiesWidgetSelectors.button)
        .should('be.visible')
        .click()
        .then(() => {
          cy.log('Cookies widget handled');
        });
    }
  });
};