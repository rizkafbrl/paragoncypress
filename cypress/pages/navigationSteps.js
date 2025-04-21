import { navigationMenuSelectors } from '../selectors/navigationMenuSelectors';

class navigationSteps {
    userClickTopMenuCheckoutButton() {
        return cy.get(loginPageSelectors.phoneTab).should('be.visible').click();
    }
}

export default new navigationSteps();