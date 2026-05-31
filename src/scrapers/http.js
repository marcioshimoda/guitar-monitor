import axios from "axios";

import { config } from "../config.js";

export async function httpScraper(
  store
) {
  const response = await axios.get(
    store.url,
    {
      ...config.request,
      ...store.request,
    }
  );

  return response.data;
}