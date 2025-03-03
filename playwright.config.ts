import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests', // Define the test directory
  retries: 2, // Retry failed tests up to 2 times
  reporter: [['html', { outputFolder: 'playwright-report' }]], // HTML report generation

  use: {
    baseURL: 'https://www.demoblaze.com', // Base URL for all tests
    headless: process.env.HEADLESS === 'true', // Configure headless mode via an environment variable
    screenshot: 'only-on-failure', // Capture screenshots only on test failures
    trace: 'on', // Enable trace collection for debugging
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 }, // Standard desktop viewport
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1280, height: 720 }, // Standard desktop viewport
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        viewport: { width: 1280, height: 720 }, // Standard desktop viewport
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'], // Emulate Pixel 5 device
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'], // Emulate iPhone 12 device
      },
    },
  ],
});
