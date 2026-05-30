import { stores } from "./stores/index.js";

import { checkStore } from "./monitor.js";
import { loadState, saveState } from "./storage.js";
import { compareStates } from "./comparator.js";
import { notifyChanges } from "./notifier.js";
import { calculateNextInterval } from "./scheduler.js";

async function runMonitor() {
  try {
    console.log("=================================");
    console.log(
      `Running monitor at ${new Date().toISOString()}`
    );

    const state = await loadState();

    for (const store of stores) {
      const previousStoreState =
        state.stores?.[store.id];

      const currentStoreState =
        await checkStore(store);

      console.log(currentStoreState);

      const changes = compareStates(
        previousStoreState,
        currentStoreState
      );

      console.log(changes);

      await notifyChanges(
        changes,
        currentStoreState
      );

      state.stores[store.id] =
        currentStoreState;
    }

    await saveState(state);

    const intervals = Object.values(
      state.stores
    ).map((storeState) =>
      calculateNextInterval(
        storeState.forecast
      )
    );

    const nextIntervalMinutes =
      Math.min(...intervals);

    console.log(
      `Next check in ${nextIntervalMinutes} minutes`
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