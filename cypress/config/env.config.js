function getConfig(env) {
  const configs = {
    demo: {
      baseUrl: 'https://demo.opencart.com',
      viewportWidth: 1280,
      viewportHeight: 720,
      defaultCommandTimeout: 10000,
      pageLoadTimeout: 30000,
      requestTimeout: 10000,
      responseTimeout: 15000
    }
  }

  return configs[env] || configs.demo
}

// Get credentials at runtime instead of during initialization
function getCredentials(env) {
  if (typeof Cypress === 'undefined') {
    return {
      email: 'demo@opencart.com',
      password: 'demo'
    }
  }
  
  const credentialMap = {
    demo: {
      email: Cypress.env('DEMO_USER_EMAIL') || 'demo@opencart.com',
      password: Cypress.env('DEMO_USER_PASSWORD') || 'demo'
    }
  }
  
  return credentialMap[env] || credentialMap.demo
}

module.exports = { getConfig, getCredentials }
