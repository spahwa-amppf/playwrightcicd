# 🧪 Playwright BDD Automation Framework

This repository contains an end-to-end Playwright automation framework following BDD (Behavior Driven Development) practices. It supports:

- ✅ Multiple environments (`qa`, `staging`, `prod`)
- ✅ Tag-based execution (`@current`, `@smoke`, etc.)
- ✅ Multi-browser testing (Chromium, Firefox, WebKit)
- ✅ Parallel test execution
- ✅ CI/CD pipeline integration

---

## 📦 Prerequisites

Ensure the following are installed:

- Node.js ≥ 18.x
- Playwright with browser dependencies

```bash
npm install
npx playwright install
```

---

## 🚀 Test Execution Commands

### 🔹 Launch Tests in UI Mode

```bash
npx playwright test --ui
```

### 🔹 Run Tests in a Specific Environment

```bash
# Windows
set ENV=qa && npx playwright test --ui

# Mac/Linux
ENV=qa npx playwright test --ui
```

---

## 🏷️ Run Tagged Scenarios

Use tags to isolate and run specific tests:

```bash
npx playwright test --grep "@current" --ui
npx playwright test --grep "@task-management" --ui
npx playwright test --grep "@current"         # Headless mode
```

---

## 🌐 Multi-Environment Support

The environment variable `ENV` determines which config to load:

```ts
// Example in playwright.config.ts
const env = process.env.ENV || 'qa';
const config = require(`./configs/${env}.config.js`);
```

**Available environments:**

- `qa`
- `staging`
- `production`

---

## 🧪 Tag-Based Execution in Feature Files

You can add tags in your `.feature` or `.spec.ts` files:

```gherkin
@current
Scenario: Validate login functionality
```

Run the tagged tests using:

```bash
npx playwright test --grep "@current"
```

---

## 🌍 Cross-Browser Testing

Run tests across supported browsers:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Example `playwright.config.ts` for multi-browser support:

```ts
projects: [
  { name: 'chromium', use: { browserName: 'chromium' }},
  { name: 'firefox', use: { browserName: 'firefox' }},
  { name: 'webkit', use: { browserName: 'webkit' }}
]
```

To run on all configured browsers:

```bash
npx playwright test --project=all
```

---

## ⚙️ Parallel Execution

Run tests in parallel using multiple workers:

```bash
npx playwright test --workers=4
```

Let Playwright automatically detect CPU cores:

```bash
npx playwright test
```

---

## 🤖 CI/CD Pipeline Integration

Use the following in CI pipelines like GitHub Actions, Jenkins, or GitLab CI:

```bash
ENV=qa npx playwright test --grep "@smoke" --project=chromium --workers=4
```

### Recommended CI/CD Steps

```bash
# 1. Install dependencies
npm ci

# 2. Install Playwright with browsers
npx playwright install --with-deps

# 3. Run tests (headless)
ENV=qa npx playwright test --grep "@smoke"
```

---
