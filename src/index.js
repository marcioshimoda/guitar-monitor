import { stores } from "./stores/index.js";

import { checkStore } from "./monitor.js";
import { loadState, saveState } from "./storage.js";
import { compareStates } from "./comparator.js";
import { notifyChanges } from "./notifier.js";
import { calculateStoreInterval } from "./scheduler.js";

async function runMonitor() {
  try {
    console.log("=================================");
    console.log(
      `Running monitor at ${new Date().toISOString()}`
    );

    const state = await loadState();

    const intervals = [];

    for (const store of stores) {
      const previousStoreState =
        state.stores?.[store.id];

      const currentStoreState =
        await checkStore(store);

      const changes = compareStates(
        previousStoreState,
        currentStoreState
      );

      console.log(
        `${store.name}:`,
        changes
      );

      await notifyChanges(
        changes,
        currentStoreState
      );

      state.stores[store.id] =
        currentStoreState;

      const interval =
        calculateStoreInterval(
          store,
          currentStoreState
        );

      intervals.push(interval);

      console.log(
        `${store.name} next check in ${interval} minutes`
      );
    }

    await saveState(state);

    const nextIntervalMinutes =
      Math.min(...intervals);

    console.log(
      `Global next check in ${nextIntervalMinutes} minutes`
    );

    setTimeout(
      runMonitor,
      nextIntervalMinutes * 60 * 1000
    );
  } catch (error) {
    console.error(error);

    console.log(
      "Retrying in 15 minutes..."
    );

    setTimeout(
      runMonitor,
      15 * 60 * 1000
    );
  }
}

runMonitor();