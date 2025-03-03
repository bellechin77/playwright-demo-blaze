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
        browserName: 'safari',
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
        browserName: 'safari',
        ...devices['iPhone 15'],
        headless: process.env.HEADLESS === 'true',
      },
    },
  ],
});