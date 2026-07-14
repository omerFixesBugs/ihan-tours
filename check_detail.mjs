import { chromium } from '/Users/omer.f/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await page.goto('http://localhost:3001/packages/corporate-tour', { waitUntil: 'load' });
await page.waitForTimeout(800);
for (let i = 0; i < 6; i++) {
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(200);
}
await page.waitForTimeout(500);
await page.screenshot({ path: 'corp_detail2.png', fullPage: true });
await browser.close();
