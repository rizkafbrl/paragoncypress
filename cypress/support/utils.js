/**
 * Validates login credentials and provides defaults if env vars are not set
 * @param {Object} options - Credential options
 * @param {string} options.email - Email from env var
 * @param {string} options.password - Password from env var
 * @param {string} options.fallbackEmail - Default email if env var is not set
 * @param {string} options.fallbackPassword - Default password if env var is not set
 * @returns {Object} - Validated credentials
 */
export function validateCredentials(options) {
  const { email, password, fallbackEmail, fallbackPassword } = options
  
  // Check for empty credentials and use fallbacks
  const validatedEmail = email || fallbackEmail
  const validatedPassword = password || fallbackPassword
  
  // Log warning if using fallback credentials
  if (!email && fallbackEmail) {
    cy.log('⚠️ Warning: Using fallback email. Set TEST_USER_EMAIL env var for real tests')
  }
  
  if (!password && fallbackPassword) {
    cy.log('⚠️ Warning: Using fallback password. Set TEST_USER_PASSWORD env var for real tests')
  }
  
  // Validate that we have either env vars or fallbacks
  if (!validatedEmail) {
    throw new Error('TEST_USER_EMAIL environment variable is required or provide a fallback')
  }
  
  if (!validatedPassword) {
    throw new Error('TEST_USER_PASSWORD environment variable is required or provide a fallback')
  }
  
  return {
    email: validatedEmail,
    password: validatedPassword
  }
}

/**
 * Generate a random email address for testing
 * @returns {string} Random email address
 */
export function generateRandomEmail() {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `test.user.${timestamp}.${random}@example.com`
}

/**
 * Validates login credentials and provides defaults if env vars are not set
 * @param {Object} options - Credential options
 * @param {string} options.email - Email from env var
 * @param {string} options.password - Password from env var
 * @param {string} options.fallbackEmail - Default email if env var is not set
 * @param {string} options.fallbackPassword - Default password if env var is not set
 * @returns {Object} - Validated credentials
 */
export function validateCredentials(options) {
  const { email, password, fallbackEmail, fallbackPassword } = options
  
  // Check for empty credentials
  if (!email && !fallbackEmail) {
    throw new Error('TEST_USER_EMAIL environment variable is required or provide a fallback')
  }
  
  if (!password && !fallbackPassword) {
    throw new Error('TEST_USER_PASSWORD environment variable is required or provide a fallback')
  }
  
  // Log warning if using fallback credentials
  if (!email && fallbackEmail) {
    cy.log('⚠️ Warning: Using fallback email. Set TEST_USER_EMAIL env var for real tests')
  }
  
  if (!password && fallbackPassword) {
    cy.log('⚠️ Warning: Using fallback password. Set TEST_USER_PASSWORD env var for real tests')
  }
  
  return {
    email: email || fallbackEmail,
    password: password || fallbackPassword
  }
}

