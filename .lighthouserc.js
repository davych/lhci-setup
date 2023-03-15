const puppeteer = require('puppeteer');
module.exports = {
  ci: {
    headless: true,
    
    collect: {
      extends: 'lighthouse:default',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about',
         'http://localhost:3000/home',
         'http://localhost:3000/products/1',
          'http://localhost:3000/products/2',
      ],
      startServerCommand: 'npm run dev',
      settings: {
        chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
        // chromePath: '/usr/bin/chromium',
        hostname: '127.0.0.1',
      }
    },
    puppeteerScript: async (page, context) => {
      const postLoginUrls = [
        'http://localhost:3000/about',
         'http://localhost:3000/home',
         'http://localhost:3000/products/1',
          'http://localhost:3000/products/2',
        ];
      for (const postLoginUrl of postLoginUrls) {
        await page.goto(postLoginUrl);
        console.log(`Navigating to ${postLoginUrl}`);
        // Wait for page to finish loading
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
      }
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};
