import * as cheerio from "cheerio";

import { buildProductState } from "../utils.js";

export function royalParser(store, html) {
  const $ = cheerio.load(html);

  const bodyText = $("body").text();

  const unavailable =
    store.detection.unavailableText.some(
      (text) => bodyText.includes(text)
    );

  const availability = !unavailable;

  return buildProductState({
    store,
    availability,
    forecast: null,
  });
}