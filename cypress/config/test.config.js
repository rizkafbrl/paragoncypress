const environments = {
  staging: {
    baseUrl: 'https://recruitment-staging-queenbee.paradev.io',
    apiUrl: 'https://recruitment-staging-queenbee.paradev.io/api'
  },
  dev: {
    baseUrl: 'https://recruitment-dev-queenbee.paradev.io',
    apiUrl: 'https://recruitment-dev-queenbee.paradev.io/api'
  }
}

const defaultTimeouts = {
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  requestTimeout: 10000,
  responseTimeout: 15000
}

const retryConfig = {
  runMode: 2,
  openMode: 1
}

const viewportConfig = {
  width: 1280,
  height: 720
}

const reportConfig = {
  reportDir: 'cypress/reports',
  reportFilename: 'results',
  overwrite: false,
  html: true,
  json: true
}

/**
 * Get environment configuration
 */
const getEnvironmentConfig = (env = 'staging') => {
  const config = environments[env]
  if (!config) {
    throw new Error(`Unknown environment: ${env}`)
  }
  return config
}

/**
 * Test routes configuration
 */
const routes = {
  login: '/login',
  dashboard: '/dashboard',
  forgotPassword: '/forgot-password',
  register: '/register'
}

/**
 * API endpoints
 */
const apiEndpoints = {
  login: '/auth/login',
  profile: '/user/profile',
  register: '/auth/register'
}

/**
 * Test tags for organizing tests
 */
const testTags = {
  smoke: '@smoke',
  regression: '@regression',
  e2e: '@e2e',
  api: '@api'
}

export default {
  environments,
  defaultTimeouts,
  retryConfig,
  viewportConfig,
  reportConfig,
  getEnvironmentConfig,
  routes,
  apiEndpoints,
  testTags
}

