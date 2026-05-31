import { stores } from "./stores/index.js";

import { scheduleStore } from "./scheduler/index.js";

console.log(
  "Starting product monitor..."
);

for (const store of stores) {
  scheduleStore(store);
}