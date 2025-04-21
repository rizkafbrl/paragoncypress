const LoginPageSelectors = {
  inputPhoneNumber: '#page-login__tabs-number__input-number',
  inputPassword: '#page-login__tabs-email__input-password',
  buttonLogin: '#page-login__button-login',
  emailTab: '[id="page-login__tabs-number__input-number"]',
  phoneTab: '[id="page-login__tabs-email__input-password"]',
  forgotPasswordLink: '#page-login__forgot-password',
  registerLink: '#page-login__register',
  loginContainer: '.styles_main-login__container__nCMC9',
  alertMessage: '.alert',
  myAccountHeading: 'h2:contains("My Account")',
  bannerHeader: '.chakra-modal__header .chakra-text',
  bannerCloseButton: '.chakra-modal__header .chakra-text + svg[style*="cursor: pointer"]',
  userProfile: '#search-all-product',
};

export default LoginPageSelectors;