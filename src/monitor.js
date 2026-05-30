import axios from "axios";

import { config } from "./config.js";
import { parseProductPage } from "./parser.js";

export async function checkStore(store) {
  console.log(
    `Checking ${store.name}...`
  );

  const response = await axios.get(
    store.url,
    config.request
  );

  return parseProductPage(
    store,
    response.data
  );
}