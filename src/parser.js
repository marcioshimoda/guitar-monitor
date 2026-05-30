import * as cheerio from "cheerio";
import crypto from "crypto";

export function parseProductPage(
  store,
  html
) {
  switch (store.id) {
    case "pride":
      return parsePride(html);

    case "royal":
      return parseRoyal(html);

    default:
      throw new Error(
        `Parser not implemented for store: ${store.id}`
      );
  }
}

function buildResult(
  store,
  availability,
  forecast
) {
  const relevantContent = `
    availability:${availability}
    forecast:${forecast}
  `.trim();

  const hash = crypto
    .createHash("sha256")
    .update(relevantContent)
    .digest("hex");

  return {
    storeId: store.id,
    storeName: store.name,
    availability,
    forecast,
    hash,
    checkedAt: new Date().toISOString(),
  };
}

function parsePride(html) {
  const $ = cheerio.load(html);

  const bodyText = $("body").text();

  const unavailable = bodyText.includes(
    "Produto indisponível no momento"
  );

  const availability = !unavailable;

  const forecastMatch = bodyText.match(
    /Previsão de chegada:\s*(\d{2}\/\d{2}\/\d{4})/
  );

  const forecast = forecastMatch
    ? forecastMatch[1]
    : null;

  return buildResult(
    {
      id: "pride",
      name: "Pride Music",
    },
    availability,
    forecast
  );
}

function parseRoyal(html) {
  const $ = cheerio.load(html);

  const bodyText = $("body").text();

  const unavailable = bodyText.includes(
    "Produto indisponível"
  );

  const availability = !unavailable;

  return buildResult(
    {
      id: "royal",
      name: "Royal Music",
    },
    availability,
    null
  );
}