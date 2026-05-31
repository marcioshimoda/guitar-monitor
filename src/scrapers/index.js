import { httpScraper } from "./http.js";
import { playwrightScraper } from "./playwright.js";

export async function scrapeStore(
  store
) {
  switch (store.scraping.mode) {
    case "http":
      return httpScraper(store);

    case "playwright":
      return playwrightScraper(store);

    default:
      throw new Error(
        `Unknown scraping mode: ${store.scraping.mode}`
      );
  }
}