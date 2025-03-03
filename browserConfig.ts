import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        headless: process.env.HEADLESS === 'true',
      },
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: process.env.HEADLESS === 'true',
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
        headless: process.env.HEADLESS === 'true',
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
        headless: process.env.HEADLESS === 'true',
      },
    },
  ],
});