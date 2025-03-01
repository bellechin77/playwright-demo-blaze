import { devices } from '@playwright/test';

export const browsers = [
  { name: 'chromium', options: {} },
  { name: 'firefox', options: {} },
  { name: 'webkit', options: {} },
  { name: 'iPhone 12', options: devices['iPhone 12'] },
];