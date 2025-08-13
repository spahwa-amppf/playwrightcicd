## Playwright Scheduled Test Pipeline

This repository contains a GitHub Actions pipeline to run Playwright BDD UI tests on a schedule and manually.

### Trigger Conditions

The pipeline is triggered in the following cases:
- Every Monday and Wednesday at 5 PM IST (11:30 AM UTC) using a cron schedule
- Manually via the GitHub Actions "Run workflow" button
- Only runs when the `playwright` branch is used

### Environment

- Runner: `ubuntu-latest`
- Node.js version: 18
- Environment variable `ENV` is set to `qa` before test execution

### Pipeline Steps

1. **Checkout the repository**
2. **Set up Node.js environment**
3. **Install project dependencies** using `npm ci`
4. **Install Playwright browsers**
5. **Connect to Azure Linux VM via SSH**
   - Securely connects to a remote Azure VM using GitHub secrets:
     - `VM_HOST` – VM public IP or DNS
     - `VM_USER` – Linux VM username
     - `VM_SSH_KEY` – SSH private key
   - On the VM:
     - Navigates to the test project directory (`QA`)
     - Pulls latest code from the `playwright` branch
     - Installs dependencies and browsers
     - Executes Playwright BDD tests tagged with `@current`
     - Generates Allure report inside the VM
6. **(Fallback) Generate Allure report locally** on the runner if VM execution fails
7. **Compress the Allure report** as a `.zip` file
8. **Upload the Allure report** as a downloadable artifact
9. **If tests fail, upload the Playwright HTML report** as an additional artifact

### Notes

- Allure and Playwright test reports are available for download from the GitHub Actions run summary.
- The test tag `@current` is used to selectively run specific BDD tests from feature files.
- VM-based execution ensures scalability for large test suites (>1000 tests).
