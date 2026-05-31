import { prideParser } from "../parsers/pride.js";

export const prideStore = {
  id: "pride",

  name: "Pride Music",

  url:
    "https://www.pridemusicshop.com.br/produto/epiphone//10940090/epiphone-back-to-the-future-es-345",

  parser: prideParser,

  priority: "high",

  scraping: {
    mode: "playwright",
  },

  polling: {
    strategy: "adaptive",

    baseIntervalMinutes: 720,

    aggressiveIntervalMinutes: 10,
  },

  detection: {
    unavailableText: [
      "Produto indisponível no momento",
    ],
  },

  notifications: {
    notifyOnForecastChange: true,
    notifyOnHtmlChange: true,
  },
};