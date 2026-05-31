import { checkStore } from "../monitor.js";
import { loadState, saveState } from "../storage.js";
import { compareStates } from "../comparator.js";
import { notifyChanges } from "../notifier.js";

import { calculateStoreInterval } from "./intervalCalculator.js";

const runningStores = new Map();

export async function scheduleStore(
  store
) {
  if (runningStores.get(store.id)) {
    console.log(
      `${store.name} is already running`
    );

    return;
  }

  runningStores.set(store.id, true);

  try {
    console.log("=================================");
    console.log(
      `[${store.name}] Running at ${new Date().toISOString()}`
    );

    const state = await loadState();

    const previousStoreState =
      state.stores?.[store.id];

    const currentStoreState =
      await checkStore(store);

    const changes = compareStates(
      previousStoreState,
      currentStoreState
    );

    console.log(
      `[${store.name}] Changes:`,
      changes
    );

    await notifyChanges(
      changes,
      currentStoreState
    );

    state.stores[store.id] =
      currentStoreState;

    await saveState(state);

    const nextIntervalMinutes =
      calculateStoreInterval(
        store,
        currentStoreState
      );

    console.log(
      `[${store.name}] Next check in ${nextIntervalMinutes} minutes`
    );

    setTimeout(() => {
      runningStores.delete(store.id);

      scheduleStore(store);
    }, nextIntervalMinutes * 60 * 1000);
  } catch (error) {
    console.error(
      `[${store.name}] Error:`
    );

    console.error(error);

    console.log(
      `[${store.name}] Retrying in 15 minutes`
    );

    setTimeout(() => {
      runningStores.delete(store.id);

      scheduleStore(store);
    }, 15 * 60 * 1000);
  }
}