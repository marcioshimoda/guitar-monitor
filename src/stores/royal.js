import { royalParser } from "../parsers/royal.js";

export const royalStore = {
  id: "royal",

  name: "Royal Music",

  url:
    "https://store.royalmusic.com.br/epiphone/guitarra/semi-acusticas/guitarra-epiphone-back-to-the-future-es-345-cherry-red",

  parser: royalParser,

  priority: "high",

  scraping: {
    mode: "http",
  },

  polling: {
    strategy: "fixed",

    intervalMinutes: 60,
  },

  detection: {
    unavailableText: [
      "Produto indisponível",
    ],
  },

  notifications: {
    notifyOnForecastChange: false,
    notifyOnHtmlChange: true,
  },
};