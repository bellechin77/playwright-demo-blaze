import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: process.env.HEADLESS === 'true', // Configure headless via env variable
    baseURL: 'https://www.demoblaze.com',
    screenshot: 'only-on-failure',
    trace: 'on',
  },
  retries: 2, // Retry failed tests up to 2 times
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});