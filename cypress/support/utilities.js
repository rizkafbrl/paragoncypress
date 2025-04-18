export const validateLoginResponse = (response) => {
  const status = response.response?.statusCode
  expect(status).to.be.oneOf([200, 201, 204])
  expect(response.response.body).to.have.property('token')
  expect(response.response.body.token).to.be.a('string')
  expect(response.response.headers).to.have.property('content-type')
  expect(response.response.headers['content-type']).to.include('application/json')
}

export const validateErrorResponse = (response) => {
  const status = response.response?.statusCode
  expect(status).to.be.oneOf([400, 401, 403, 404])
  expect(response.response.body).to.have.property('error')
  expect(response.response.body.error).to.be.a('string')
}

export const generateRandomEmail = () => {
  const timestamp = new Date().getTime()
  const random = Math.floor(Math.random() * 10000)
  return `test.${timestamp}.${random}@example.com`
}

export const generateRandomPassword = (options = {}) => {
  const {
    minLength = 8,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSpecial = true
  } = options

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const special = '!@#$%^&*'

  let chars = ''
  if (includeUppercase) chars += uppercase
  if (includeLowercase) chars += lowercase
  if (includeNumbers) chars += numbers
  if (includeSpecial) chars += special

  let password = ''
  for (let i = 0; i < minLength; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  if (includeUppercase) password += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
  if (includeLowercase) password += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
  if (includeNumbers) password += numbers.charAt(Math.floor(Math.random() * numbers.length))
  if (includeSpecial) password += special.charAt(Math.floor(Math.random() * special.length))

  return password
}

export const elementSelectors = {
  login: {
    emailTab: '#page-login__tabs-email',
    phoneTab: '#page-login__tabs-number',
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: '#page-login__button-login',
    errorMessage: '[role="alert"], .error-message, .alert-error, .toast-error',
    cookiesBanner: '.styles_cookies-button__mJJow',
    forgotPassword: '#page-login__forgot-password',
    register: '#page-login__register'
  },
  dashboard: {
    userProfile: '.user-profile',
    header: 'header',
    container: '.dashboard-container',
    accountSection: '.user-account-section'
  }
}

export const errorMessages = {
  invalidCredentials: 'Email atau password salah',
  unregisteredEmail: 'Email tidak terdaftar',
  emptyEmail: 'Email harus diisi',
  emptyPassword: 'Password harus diisi',
  invalidFormat: 'Format email tidak valid',
  networkError: 'Gagal terhubung',
  rateLimit: 'Terlalu banyak percobaan'
}

export const timeouts = {
  defaultCommand: 10000,
  networkRequest: 15000,
  pageLoad: 30000,
  animation: 1000,
  retry: {
    baseDelay: 1000,
    maxAttempts: 3
  }
}

export const retryWithBackoff = (fn, maxAttempts = timeouts.retry.maxAttempts, baseDelay = timeouts.retry.baseDelay) => {
  let attempt = 0
  
  const retry = () => {
    attempt++
    const delay = baseDelay * Math.pow(2, attempt - 1)
    
    return fn().catch(error => {
      if (attempt === maxAttempts) throw error
      cy.wait(delay)
      return retry()
    })
  }
  
  return retry()
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPassword = (password) => {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
}
