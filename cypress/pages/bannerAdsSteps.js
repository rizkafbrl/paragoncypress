import BannerAdsSelectors from '../selectors/bannerAdsSelectors';

export const disableBannerAds = () => {
  cy.get('body').then(($body) => {
    if ($body.find(BannerAdsSelectors.bannerCloseButton).length > 0) {
      cy.get(BannerAdsSelectors.bannerCloseButton)
        .should('be.visible')
        .click({ force: true })
        .then(() => {
          cy.log('Banner ads closed');
        });
    } else {
      cy.log('No banner ads present');
    }
  });
};