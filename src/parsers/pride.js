import * as cheerio from "cheerio";

import { buildProductState } from "../utils.js";

export function prideParser(store, html) {
  const $ = cheerio.load(html);

  const bodyText = $("body").text();

  const unavailable =
    store.detection.unavailableText.some(
      (text) => bodyText.includes(text)
    );

  const availability = !unavailable;

  const forecastMatch = bodyText.match(
    /Previsão de chegada:\s*(\d{2}\/\d{2}\/\d{4})/
  );

  const forecast = forecastMatch
    ? forecastMatch[1]
    : null;

  return buildProductState({
    store,
    availability,
    forecast,
  });
}