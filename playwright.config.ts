import { defineConfig, devices } from '@playwright/test';
import browserConfig from './browserConfig.ts';

export default defineConfig({
  testDir: 'src/tests',  // Set test directory 
  testMatch: '**/*.spec.ts',  // Ensure it matches Playwright test files
  retries: 2, // Retry failed tests up to 2 times
  reporter: [['html', { outputFolder: 'playwright-report' }]], // HTML report generation

  use: {
    ...browserConfig, // Merge browser configurations
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com', // Base URL for all tests
    headless: process.env.HEADLESS === 'true', // Configure headless mode via an environment variable
    screenshot: 'only-on-failure', // Capture screenshots only on test failures
    trace: 'on', // Enable trace collection for debugging
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        ...browserConfig, // Apply shared settings      
     },
    }, 
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'], // Emulate Pixel 5 device
        ...browserConfig, // Apply shared settings
      },
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        ...browserConfig, // Apply shared settings
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'], // Emulate iPhone 15 device
        ...browserConfig, // Apply shared settings
      },
    },
  ],
});