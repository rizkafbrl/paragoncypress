const { defineConfig } = require('cypress');
const { getConfig } = require('./cypress/config/env.config');

module.exports = defineConfig({
  projectId: 'beyondly-login',
  e2e: {
    setupNodeEvents(on, config) {
      const testEnv = config.env.TEST_ENV || 'demo';
      const envConfig = getConfig(testEnv);

      config.baseUrl = 'https://recruitment-staging-queenbee.paradev.io';
      config.viewportWidth = envConfig.viewportWidth;
      config.viewportHeight = envConfig.viewportHeight;
      config.defaultCommandTimeout = envConfig.defaultCommandTimeout;
      config.pageLoadTimeout = envConfig.pageLoadTimeout;
      config.requestTimeout = envConfig.requestTimeout;
      config.responseTimeout = envConfig.responseTimeout;

      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
  },
});
