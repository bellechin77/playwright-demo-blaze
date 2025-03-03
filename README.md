# Demo Blaze Application - Playwright Test Suite

## Overview
This project contains an automated test suite for the **Demo Blaze** application using [Playwright](https://playwright.dev/). It includes tests for **user sign-up, login, and adding products to the cart** across multiple browsers and devices.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Reporting](#reporting)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites
Before running the tests, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Playwright](https://playwright.dev/)

## Installation
Clone this repository and install the required dependencies:

```sh
# Clone the repository
git clone https://github.com/bellechin77/playwright-demo-blaze.git
cd playwright-demo-blaze

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Configuration
The **Playwright configuration** is defined in `playwright.config.ts` and `browser.config.ts`. It includes:
- Multi-browser support (**Chromium, Firefox, WebKit**)
- Mobile device emulation (**Pixel 5, iPhone 12**)
- Retry logic and test reporting
- Environment variable support for **headless mode**

## Running Tests
You can run tests using the following commands:

### Run all tests in default browser
```sh
npx playwright test
```

### Run tests in headless mode
```sh
HEADLESS=true npx playwright test
```

### Run tests in a specific browser
```sh
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests on mobile devices
```sh
npx playwright test --project='Mobile Chrome'
npx playwright test --project='Mobile Safari'
```

### Run a specific test file
```sh
npx playwright test tests/demoBlaze.spec.ts
```

### Debugging tests
```sh
npx playwright test --debug
```

## Project Structure
```
├── pageObjects/       # Page Object Models (POM)
│   ├── CartPage.ts
│   ├── LoginPage.ts
│   ├── SignUpPage.ts
├── tests/            # Playwright test scripts
│   ├── demoBlaze.spec.ts  # Single test file containing all tests
├── configs/          # Configuration files
│   ├── browser.config.ts   # Browser & device configurations
├── playwright.config.ts  # Playwright test settings
├── package.json      # Dependencies & scripts
├── README.md         # Project documentation
```

## Reporting
After running tests, reports are generated in `playwright-report/`.
To view reports:
```sh
npx playwright show-report
```

## Environment Variables
You can configure headless mode using:
```sh
export HEADLESS=true  # Linux/macOS
set HEADLESS=true     # Windows
```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make changes and commit (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the MIT License. See `LICENSE` for details.

