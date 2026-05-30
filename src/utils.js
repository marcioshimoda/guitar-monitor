import crypto from "crypto";

export function buildProductState({
  store,
  availability,
  forecast,
}) {
  const relevantContent = `
    availability:${availability}
    forecast:${forecast}
  `.trim();

  const hash = crypto
    .createHash("sha256")
    .update(relevantContent)
    .digest("hex");

  return {
    storeId: store.id,
    storeName: store.name,

    availability,
    forecast,

    hash,

    checkedAt: new Date().toISOString(),
  };
}