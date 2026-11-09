# Playwright Test Automation Framework

An End-to-End (E2E) and API test automation framework built using **[Playwright](https://playwright.dev/)** and **JavaScript (ES Modules)**, designed with the **Page Object Model (POM)** and **Page Object Manager (POManager)** design patterns.

The framework automates and validates user journeys on the E-Commerce practice application ([Rahul Shetty Academy Client App](https://rahulshettyacademy.com/client)), covering UI flows, data-driven tests, API integration, and network route interception.

---

## 🚀 Key Features

- **Page Object Model (POM)**: Modular, reusable, and maintainable page classes (`LoginPage`, `DashboardPage`, `CartPage`, `CheckoutPage`, `OrdersPage`).
- **Page Object Manager (`POManager`)**: Centralized instantiation point for all page objects, eliminating redundant object creations in test files.
- **Data-Driven Testing**: Externalized test datasets using JSON files (`utils/placeorderTestData.json`) to run parameterized tests across multiple inputs.
- **API Testing & Session Injection**:
  - Direct API authentication and order creation via `ApiUtils` using Playwright's `APIRequestContext`.
  - Token injection directly into browser `localStorage` to bypass UI login steps when needed.
- **Network Interception & Mocking**: Mocking network API calls using `page.route()` and `route.fulfill()` to test edge cases (e.g., empty orders state).
- **Cross-Browser & Multi-Project Support**: Configured for multiple browser projects (`chromium`, `edge`, with support for Firefox and Mobile viewports).
- **Parallel Execution**: Native Playwright parallel test running configured via worker processes and `test.describe.configure({ mode: 'parallel' })`.
- **Debugging & Reporting**:
  - Built-in HTML reports with screenshots on failure.
  - Video recording on test retries.
  - Trace viewer enabled for detailed execution timelines and DOM snapshots.
- **CI/CD Integration**: Pre-configured **GitHub Actions** workflow (`.github/workflows/playwright.yml`) for automated test runs on push/pull requests.

---

## 📁 Project Structure

```text
Playwright-Framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml         # CI/CD pipeline configuration (GitHub Actions)
│
├── pageObjects/                   # Page Object Model classes
│   ├── LoginPage.js               # Locators & actions for Login page
│   ├── DashboardPage.js           # Locators & actions for Product Catalog
│   ├── CartPage.js                # Locators & actions for Cart operations
│   ├── CheckoutPage.js            # Locators & actions for Shipping & Payment
│   ├── OrdersPage.js              # Locators & actions for Order History & details
│   └── POManager.js               # Central Manager for all Page Objects
│
├── tests/                         # Test suites
│   ├── E2E_Flow.spec.js           # Complete E2E purchase flow (Data-driven)
│   ├── ValidateInvalidLogin.spec.js # Negative login validation tests (Parallel)
│   └── Api_Test.spec.js           # API request & network route mocking test
│
├── utils/                         # Reusable utilities and test fixtures
│   ├── ApiUtils.js                # Helper methods for API login and order creation
│   └── placeorderTestData.json    # Test datasets for data-driven tests
│
├── playwright.config.js           # Playwright test runner configuration
├── package.json                   # Project metadata, dependencies, and npm scripts
└── README.md                      # Project documentation
```

---

## 🛠️ Prerequisites

Ensure the following are installed on your machine:
- **Node.js**: v18.x or later (LTS recommended)
- **npm**: v9.x or later (comes with Node.js)

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Playwright-Framework
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

---

## 🧪 Running Tests

### Pre-configured npm Scripts

Run tests using the predefined scripts in `package.json`:

| Command | Description |
| :--- | :--- |
| `npm run Regression` | Runs tests on both Chromium and Edge projects |
| `npm run test:e2e` | Executes only the End-to-End order placement spec |
| `npm run test:chromium` | Runs tests using the Chromium project |
| `npm run test:edge` | Runs tests using the Edge project |
| `npm run test:firefox` | Runs tests using Firefox (when enabled in config) |
| `npm run test:mobile` | Runs tests for Mobile viewports in headed mode |

---

### Custom Execution Commands

- **Run all tests (headless by default or as configured):**
  ```bash
  npx playwright test
  ```

- **Run in headed mode (visible browser window):**
  ```bash
  npx playwright test --headed
  ```

- **Run in Playwright UI Mode (interactive test runner):**
  ```bash
  npx playwright test --ui
  ```

- **Run in Debug mode:**
  ```bash
  npx playwright test --debug
  ```

- **Run a specific test file:**
  ```bash
  npx playwright test tests/E2E_Flow.spec.js
  ```

- **Filter tests by title or tag (e.g., `@api`):**
  ```bash
  npx playwright test --grep "@api"
  ```

---

## 📊 Reports & Debugging

- **View HTML Test Report:**
  ```bash
  npx playwright show-report
  ```
- **Inspect Recorded Traces:**
  ```bash
  npx playwright show-trace test-results/<folder-name>/trace.zip
  ```

---

## ⚙️ Configuration Highlights (`playwright.config.js`)

- **Retries**: Configured to retry failed tests `1` time automatically.
- **Timeouts**: Global test timeout set to `100s`; expect timeout set to `50s`.
- **Inheritance & Overrides**: Common settings (timeouts, HTTP errors handling) are configured at the top-level `use` block and inherited by project configs (`chromium`, `edge`).
- **Artifacts**: Automatic screenshots on failure, video recording on retries, and traces saved for troubleshooting.

---

## 🔄 CI/CD (GitHub Actions)

This repository includes continuous integration with GitHub Actions (`.github/workflows/playwright.yml`). On every `push` and `pull_request` to `main` or `master`:
1. Checks out the code.
2. Sets up Node.js.
3. Installs dependencies (`npm ci`).
4. Installs Playwright browser binaries with dependencies.
5. Executes the test suite.
6. Uploads the `playwright-report/` artifact for 30 days retention.
