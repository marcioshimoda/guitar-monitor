import fs from "fs/promises";

const STATE_FILE = "./data/state.json";

export async function loadState() {
  try {
    const data = await fs.readFile(
      STATE_FILE,
      "utf-8"
    );

    return JSON.parse(data);
  } catch {
    return {
      stores: {},
    };
  }
}

export async function saveState(state) {
  await fs.writeFile(
    STATE_FILE,
    JSON.stringify(state, null, 2)
  );
}