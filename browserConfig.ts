import { BrowserTypeLaunchOptions, BrowserContextOptions } from '@playwright/test';

const browserConfig: BrowserTypeLaunchOptions & BrowserContextOptions = {
  headless: false,  // Run in UI mode (set true for headless mode)
  slowMo: 100,      // Adds delay between actions for debugging (in ms)
  ignoreHTTPSErrors: true, // Ignore SSL errors for testing
  viewport: { width: 1280, height: 720 }, // Default viewport
};

export default browserConfig;