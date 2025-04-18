# Beyondly Login Test Suite

Comprehensive automated tests for the Beyondly login functionality using Cypress. This test suite is designed to validate the login functionality for the recruitment platform at https://recruitment-staging-q.uesenbee.paradise.id/login.

## Project Overview

This project contains Cypress tests for the Beyondly login functionality. It focuses on validating the login process using phone numbers in a recruitment platform. The tests ensure that users can successfully navigate to the login page and authenticate with valid credentials.

## Test Description

The test suite focuses on validating the login functionality with the following scenarios:

### Currently Implemented Tests
1. **Login Page Navigation**
   - Navigate to the login page URL
   - Verify form visibility 
   - Validate correct URL
   - Verify page title contains "Login"

2. **Valid Phone Number Login**
   - Navigate to the login page
   - Select phone tab
   - Enter valid phone number (62857965295270)
   - Enter valid password (Testing123!)
   - Click login button
   - Verify successful API response
   - Confirm redirection away from login page
   - Verify dashboard/profile visibility

### Additional Test Coverage (Planned)

1. **Negative Tests**
   - Invalid phone number
   - Invalid password
   - Unregistered phone number

2. **Form Validation**
   - Required field validation
   - Phone format validation
   - Password requirements
   - Field trimming

3. **Security Features**
   - Password handling in requests
   - Rate limiting detection
   - Network error handling
   - Session management

4. **UI/UX Features**
   - Password visibility toggle
   - Tab switching (Email/Phone)
   - Form data retention
   - Loading states

5. **Accessibility**
   - Keyboard navigation
   - ARIA attributes
   - Screen reader compatibility
   - Color contrast compliance

## Project Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Chrome, Firefox, or Edge browser

### Installation
```bash
# Install dependencies
npm install
```

## Environment Setup

1. Copy the environment template:
```bash
cp cypress.env.example.json cypress.env.json
```

2. Update `cypress.env.json` with your test credentials:
```json
{
  "TEST_ENV": "staging",
  "STAGING_TEST_USER_EMAIL": "your-test-email@example.com",
  "STAGING_TEST_USER_PASSWORD": "your-test-password"
}
```

### Environment Variables

The following environment variables are required:

| Variable | Description | Required |
|----------|-------------|----------|
| TEST_ENV | Test environment (staging/dev) | Yes |
| STAGING_TEST_USER_EMAIL | Staging environment test user email | Yes |
| STAGING_TEST_USER_PASSWORD | Staging environment test user password | Yes |
| DEV_TEST_USER_EMAIL | Development environment test user email | No |
| DEV_TEST_USER_PASSWORD | Development environment test user password | No |
| CYPRESS_RECORD_KEY | Cypress Dashboard record key | No |

### Running Tests in Different Environments

To run tests in a specific environment:

```bash
# Staging environment (default)
npm test
npx cypress open

# Staging environment (headless specific test case)
npx cypress run --spec "cypress/e2e/login.cy.js"

# Development environment
TEST_ENV=dev npm test

# Custom environment with specific config
TEST_ENV=dev CYPRESS_BASE_URL=https://custom-url.com npm test
```

## Cypress Configuration

The project uses a customized Cypress configuration defined in `cypress.config.js`:

### Project Information
```javascript
projectId: 'beyondly-login'
```

### Test Specifications
```javascript
specPattern: 'cypress/e2e/**/*.cy.js',
supportFile: 'cypress/support/e2e.js'
```

### Dynamic Configuration
The configuration loads environment-specific settings from `cypress/config/env.config.js`:

```javascript
setupNodeEvents(on, config) {
  const testEnv = config.env.TEST_ENV || 'staging'
  const envConfig = getConfig(testEnv)
  
  config.baseUrl = envConfig.baseUrl
  config.viewportWidth = envConfig.viewportWidth
  config.viewportHeight = envConfig.viewportHeight
  config.defaultCommandTimeout = envConfig.defaultCommandTimeout
  config.pageLoadTimeout = envConfig.pageLoadTimeout
  config.requestTimeout = envConfig.requestTimeout
  config.responseTimeout = envConfig.responseTimeout
  
  require('@cypress/code-coverage/task')(on, config)
  return config
}
```

### Timeouts and Viewport
Timeouts and viewport settings are loaded dynamically based on the environment configuration:

- `viewportWidth` and `viewportHeight`: Define the browser viewport size
- `defaultCommandTimeout`: Default timeout for Cypress commands
- `pageLoadTimeout`: Timeout for page loads
- `requestTimeout`: Timeout for network requests
- `responseTimeout`: Timeout for network responses

### Retry Policy
The test suite implements automatic retries to handle flaky tests:

```javascript
retries: {
  runMode: 2,    // Retry failed tests up to 2 times in headless mode
  openMode: 1    // Retry failed tests once in interactive mode
}
```

### Recording and Reporting

#### Video and Screenshots
```javascript
video: true,                    // Record video of test runs
screenshotOnRunFailure: true    // Take screenshots on test failures
```

#### Reporting
```javascript
reporter: 'cypress-multi-reporters',
reporterOptions: {
  configFile: 'reporter-config.json'
}
```

### Security
```javascript
chromeWebSecurity: false  // Disable web security to allow cross-origin requests
```

## Available Test Commands

The following test commands are available in this project:

```bash
# Open Cypress UI
npm test
# or
npm run test

# Run tests in specific browsers
npm run test:chrome    # Runs tests in Chrome browser
npm run test:firefox   # Runs tests in Firefox browser
npm run test:edge      # Runs tests in Edge browser

# Run tests in headless mode
npm run test:headless  # Runs all tests in headless mode (no browser UI)
npm run ci:test        # Runs tests in Chrome browser in headless mode (for CI/CD)

# Reporting commands
npm run report:clean    # Cleans up previous reports
npm run report:merge    # Merges all JSON reports into a single output file
npm run report:generate # Generates HTML reports from the merged JSON
```

## Test Cases Details

### 1. Login Page Navigation
```javascript
it('Go to https://recruitment-staging-q.uesenbee.paradise.id/login', () => {
  cy.visit('https://recruitment-staging-q.uesenbee.paradise.id/login');
  cy.get('form, .login-form, .login-container').should('be.visible');
  cy.url().should('eq', 'https://recruitment-staging-q.uesenbee.paradise.id/login');
  cy.title().should('include', 'Login');
  cy.log('Successfully navigated to the login page');
});
```

### 2. Valid Phone Number Login
```javascript
it('Enter valid phone number and password.', () => {
  const phoneNumber = '62857965295270';
  const password = 'Testing123!';
  
  cy.visit('https://recruitment-staging-q.uesenbee.paradise.id/login');
  cy.get('form, .login-form, .login-container').should('be.visible');
  
  cy.get('.tab, [data-cy="phone-tab"], [data-testid="phone-tab"]')
    .contains(/phone|telepon|nomor/i)
    .click();
  
  cy.get('input[type="tel"], input[name="phone"], input[placeholder*="phone"]')
    .should('be.visible')
    .clear()
    .type(phoneNumber, { delay: 50 })
    .should('have.value', phoneNumber);
  
  cy.get('input[type="password"]')
    .should('be.visible')
    .clear()
    .type(password, { delay: 50 });
  
  cy.intercept('POST', '**/login').as('loginRequest');
  cy.intercept('POST', '**/auth/**').as('authRequest');
  
  cy.contains('button', 'Masuk').click();
  
  cy.wait('@loginRequest', { timeout: 15000 })
    .its('response.statusCode')
    .should('be.oneOf', [200, 201, 204, 302]);
  
  cy.url({ timeout: 15000 }).should('not.include', '/login');
  
  cy.get('.user-profile, .dashboard-container, .welcome-message, [data-cy="user-logged-in"]', 
    { timeout: 15000 })
    .should('be.visible');
});
```

## Project Structure
```
cypress/
├── e2e/
│   ├── login.cy.js       # Test scenarios
│   └── login.spec.js     # Additional test specs
├── fixtures/
│   └── users.json        # Test data
├── pages/
│   └── LoginPage.js      # Page Object Model
├── config/
│   ├── env.config.js     # Environment config
│   └── test.config.js    # Test constants
└── support/
    ├── commands.js       # Custom commands
    ├── e2e.js            # Configuration
    └── utilities.js      # Helper functions
```

## Custom Commands
- `login`: Performs login with credentials
- `verifyLoginSuccess`: Validates successful login
- `verifyLoginError`: Validates error messages
- `switchLoginTab`: Handles tab switching
- `waitForNetwork`: Network request validation
- `verifyPageState`: Page state validation
- `checkA11y`: Accessibility checks

## CI/CD Integration

### GitHub Actions Workflow
- Parallel test execution
- Multiple browser support
- Artifact storage
- Report generation

### Reports
- Mochawesome reports
- Test videos
- Error screenshots
- Accessibility audit reports

## Best Practices
1. Use Page Object Model
2. Maintain test data in fixtures
3. Implement custom commands
4. Add proper error handling
5. Include accessibility checks
6. Write meaningful descriptions
7. Group related tests
8. Handle network requests
9. Manage test data securely
10. Regular maintenance

## Troubleshooting

### Network Issues
- Verify base URL configuration
- Check network interception setup
- Adjust timeout values
- Verify proxy settings if applicable

### Test Data
- Confirm env file configuration
- Validate test user credentials
- Check data formatting
- Verify fixture loading

### Timeout Errors
- Review cypress.config.js settings
- Check network conditions
- Adjust wait times
- Verify selector specificity

## Contributing
1. Fork the repository
2. Create feature branch
3. Follow code structure
4. Add appropriate tests
5. Update documentation
6. Submit pull request

## License
ISC

## Dependencies

### Main Dependencies
- cypress: ^13.6.0

### Dev Dependencies
- @cypress/code-coverage: ^3.12.1
- @testing-library/cypress: ^10.0.1
- cypress-axe: ^1.5.0
- cypress-multi-reporters: ^1.6.3
- cypress-real-events: ^1.11.0
- mochawesome: ^7.1.3
- mochawesome-merge: ^4.3.0
- mochawesome-report-generator: ^6.2.0
- rimraf: ^5.0.1

## Support
For issues and questions, please create a GitHub issue.
