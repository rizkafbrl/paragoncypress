import LoginPage from '../pages/LoginPage'

Cypress.Commands.add('waitForNetwork', (alias, options = {}) => {
  const defaultOptions = {
    timeout: 15000,
    failOnStatusCode: true,
    validateResponse: null
  }
  const finalOptions = { ...defaultOptions, ...options }

  return cy.wait(alias, { timeout: finalOptions.timeout })
    .then((interception) => {
      if (finalOptions.failOnStatusCode) {
        const status = interception.response?.statusCode
        const isSuccess = status >= 200 && status < 300
        expect(isSuccess, `Expected successful status code but got ${status}`).to.be.true
      }
      
      if (finalOptions.validateResponse) {
        finalOptions.validateResponse(interception)
      }
      
      return interception
    })
})

Cypress.Commands.add('verifyPageState', (options = {}) => {
  const {
    url = null,
    elements = [],
    timeout = 10000
  } = options

  if (url) {
    cy.url({ timeout }).should('include', url)
  }

  elements.forEach(element => {
    cy.get(element.selector, { timeout })
      .should(element.assertion || 'be.visible')
  })
})

Cypress.Commands.add('handleCookiesBanner', () => {
  cy.get('body').then($body => {
    if ($body.find('.styles_cookies-button__mJJow, .cookies-banner, .cookie-consent').length > 0) {
      cy.get('.styles_cookies-button__mJJow, .cookies-banner button, .cookie-consent button')
        .should('be.visible')
        .click()
    }
  })
})

Cypress.Commands.add('login', (email, password, { shouldSucceed = true } = {}) => {
  cy.visit('https://recruitment-staging-q.uesenbee.paradise.id/login')
  
  cy.handleCookiesBanner()
  
  cy.get('#page-login__tabs-email', { timeout: 10000 })
    .should('be.visible')
    .click()
    .should('have.class', 'styles_active-tab__GKidf')
  
  cy.get('input[name="email"]')
    .should('be.visible')
    .clear()
    .type(email)
  
  cy.get('input[name="password"]')
    .should('be.visible')
    .clear()
    .type(password)
  
  if (shouldSucceed) {
    cy.intercept('POST', '**/auth/login').as('loginRequest')
  } else {
    cy.intercept('POST', '**/auth/login').as('failedLoginRequest')
  }
  
  cy.get('#page-login__button-login')
    .should('be.visible')
    .click()
  
  if (shouldSucceed) {
    cy.waitForNetwork('@loginRequest', {
      timeout: 15000,
      failOnStatusCode: true
    })
    
    cy.url({ timeout: 15000 })
      .should('not.include', '/login')
    
    cy.get('.user-account-section, .user-profile, .dashboard-container', { timeout: 15000 })
      .should('exist')
  } else {
    cy.waitForNetwork('@failedLoginRequest', {
      timeout: 15000,
      failOnStatusCode: false
    })
    
    cy.get('[role="alert"], .error-message, .alert-error, .toast-error', { timeout: 10000 })
      .should('be.visible')
  }
})

Cypress.Commands.add('verifyLoginSuccess', () => {
  cy.url({ timeout: 15000 })
    .should('not.include', '/login')
  
  cy.get('.user-account-section, .user-profile, .dashboard-container', { timeout: 15000 })
    .should('exist')
})

Cypress.Commands.add('verifyLoginError', (errorMessage) => {
  cy.get('[role="alert"], .error-message, .alert-error, .toast-error', { timeout: 10000 })
    .should('be.visible')
    .and('contain', errorMessage)
})

Cypress.Commands.add('checkA11y', (context = null, options = null) => {
  cy.injectAxe()
  cy.checkA11y(
    context,
    {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      },
      ...options
    },
    null,
    false
  )
})

Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  if (subject) {
    cy.wrap(subject)
      .focus()
      .trigger('keydown', { keyCode: 9, which: 9 })
  } else {
    cy.focused()
      .trigger('keydown', { keyCode: 9, which: 9 })
  }
  
  return cy.focused().should('be.visible')
})

Cypress.Commands.add('clearTestData', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.window().then(win => {
    win.sessionStorage.clear()
  })
})
