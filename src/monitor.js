import { scrapeStore } from "./scrapers/index.js";

export async function checkStore(store) {
  console.log(
    `Checking ${store.name}...`
  );

  const html = await scrapeStore(
    store
  );

  return store.parser(store, html);
}