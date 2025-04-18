# Beyondly Login Test Suite

Comprehensive automated tests for the Beyondly login functionality using Cypress. This test suite is designed to validate the login functionality for the recruitment platform at https://recruitment-staging-q.uesenbee.paradise.id/login.

## Project Overview

This project contains Cypress tests for the Beyondly login functionality. It focuses on validating the login process using phone numbers in a recruitment platform. The tests ensure that users can successfully navigate to the login page and authenticate with valid credentials.

## Test Description

The test suite focuses on validating the login functionality with the following scenarios:

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
