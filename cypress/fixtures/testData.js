import testConfig from '../config/test.config'
import { 
  generateRandomEmail, 
  generateRandomPassword, 
  isValidEmail, 
  isValidPassword 
} from '../support/utilities'

export const getTestData = (env = 'staging') => {
  const config = testConfig.getEnvironmentConfig(env)
  
  return {
    baseUrl: config.baseUrl,
    apiUrl: config.apiUrl,
    users: testUsers,
    scenarios: testScenarios,
    routes: testConfig.routes,
    apiEndpoints: testConfig.apiEndpoints
  }
}

export const generateTestUser = (options = {}) => {
  const {
    emailPrefix = 'test',
    passwordOptions = {}
  } = options

  const email = generateRandomEmail(emailPrefix)
  const password = generateRandomPassword(passwordOptions)

  if (!isValidEmail(email)) {
    throw new Error(`Generated invalid email: ${email}`)
  }
  if (!isValidPassword(password)) {
    throw new Error(`Generated invalid password: ${password}`)
  }

  return {
    email,
    password
  }
}

export const testUsers = {
  valid: generateTestUser(),
  invalid: {
    email: generateTestUser().email,
    password: 'invalid'
  },
  malformed: {
    email: 'not-an-email',
    password: 'short'
  }
}

export const testScenarios = {
  trimming: {
    input: {
      email: `  ${testUsers.valid.email}  `,
      password: `  ${testUsers.valid.password}  `
    },
    expected: {
      email: testUsers.valid.email,
      password: testUsers.valid.password
    }
  },
  caseInsensitive: {
    input: {
      email: testUsers.valid.email.toUpperCase(),
      password: testUsers.valid.password
    },
    expected: {
      email: testUsers.valid.email.toLowerCase(),
      password: testUsers.valid.password
    }
  }
}

export const validateTestData = (data) => {
  const validations = {
    email: isValidEmail(data.email),
    password: isValidPassword(data.password)
  }

  const errors = Object.entries(validations)
    .filter(([_, isValid]) => !isValid)
    .map(([field]) => `Invalid ${field}`)

  if (errors.length > 0) {
    throw new Error(`Test data validation failed: ${errors.join(', ')}`)
  }

  return true
}

export default {
  users: testUsers,
  scenarios: testScenarios,
  generators: {
    user: generateTestUser
  },
  validation: {
    validateTestData
  }
}
