const { defineConfig } = require('cypress');

const viewportConfig = {
  width: 1280,
  height: 720,
};

const defaultTimeouts = {
  DEFAULT_COMMAND_TIMEOUT: 10000,
  PAGE_LOAD_TIMEOUT: 30000,
  NETWORK_REQUEST_TIMEOUT: 15000,
  MEDIUM_TIMEOUT: 15000,
  QUICK_TIMEOUT: 5000,
  FAST_TIMEOUT: 600,
};

module.exports = defineConfig({
  projectId: 'beyondly-login',
  e2e: {
    setupNodeEvents(on, config) {
      const environments = {
        staging: {
          baseUrl: 'https://recruitment-staging-queenbee.paradev.io',
          viewportWidth: viewportConfig.width,
          viewportHeight: viewportConfig.height,
          defaultCommandTimeout: defaultTimeouts.DEFAULT_COMMAND_TIMEOUT,
          pageLoadTimeout: defaultTimeouts.PAGE_LOAD_TIMEOUT,
          requestTimeout: defaultTimeouts.QUICK_TIMEOUT,
          responseTimeout: defaultTimeouts.MEDIUM_TIMEOUT,
        },
      };

      const getEnvironmentConfig = () => {
        return environments.staging;
      };

      const environmentConfig = getEnvironmentConfig();
      config.baseUrl = environmentConfig.baseUrl;
      config.viewportWidth = environmentConfig.viewportWidth;
      config.viewportHeight = environmentConfig.viewportHeight;
      config.defaultCommandTimeout = environmentConfig.defaultCommandTimeout;
      config.pageLoadTimeout = environmentConfig.pageLoadTimeout;

      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
    supportFile: false,
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    env: {
      viewportConfig,
      defaultTimeouts,
      routes: {
        login: '/login',
        dashboard: '/dashboard',
        forgotPassword: '/forgot-password',
        register: '/register',
      },
      testTags: {
        smoke: '@smoke',
        regression: '@regression',
        e2e: '@e2e',
        api: '@api',
      },
    },
    viewportWidth: viewportConfig.width,
    viewportHeight: viewportConfig.height,
    defaultCommandTimeout: defaultTimeouts.DEFAULT_COMMAND_TIMEOUT,
    pageLoadTimeout: defaultTimeouts.PAGE_LOAD_TIMEOUT,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
  },
});
