import { chromium } from "playwright";

export async function playwrightScraper(
  store
) {
  const browser =
    await chromium.launch({
      headless: true,
    });

  try {
    const page =
      await browser.newPage({
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/136.0.0.0 Safari/537.36",
      });

    console.log(
      `Opening browser for ${store.name}`
    );

    await page.goto(store.url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForTimeout(3000);

    const html =
      await page.content();

    return html;
  } finally {
    await browser.close();
  }
}