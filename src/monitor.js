import axios from "axios";

import { config } from "./config.js";

export async function checkStore(store) {
  console.log(
    `Checking ${store.name}...`
  );

  const response = await axios.get(
    store.url,
    {
      ...config.request,
      ...store.request,
    }
  );

  return store.parser(
    store,
    response.data
  );
}