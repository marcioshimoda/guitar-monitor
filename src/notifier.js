import TelegramBot from "node-telegram-bot-api";

import { config } from "./config.js";

const bot = new TelegramBot(
  config.telegram.botToken,
  {
    polling: false,
  }
);

function buildMessage(change, currentState) {
  switch (change.type) {
    case "FIRST_RUN":
      return `
🎸 Monitor iniciado

📦 Produto:
Epiphone Back to the Future ES-345

📅 Previsão:
${currentState.forecast ?? "Não encontrada"}

❌ Disponível:
${currentState.availability ? "SIM" : "NÃO"}

⏰ ${currentState.checkedAt}
`;

    case "AVAILABILITY_CHANGED":
      return `
🚨 MUDANÇA DE DISPONIBILIDADE

${change.message}

📅 Previsão:
${currentState.forecast ?? "Não encontrada"}

🔗 ${currentState.storeUrl}
`;

    case "FORECAST_CHANGED":
      return `
📅 PREVISÃO ALTERADA

${change.message}

🔗 ${currentState.storeUrl}
`;

    case "CONTENT_CHANGED":
      return `
📝 Conteúdo monitorado alterado.

📅 Previsão atual:
${currentState.forecast ?? "Não encontrada"}

🔗 ${currentState.storeUrl}
`;

    default:
      return `
ℹ️ Evento detectado

${change.message}
`;
  }
}

export async function notifyChanges(
  changes,
  currentState
) {
  if (!changes.length) {
    return;
  }

  for (const change of changes) {
    const message = buildMessage(
      change,
      currentState
    );

    console.log(
      `Sending notification: ${change.type}`
    );

    await bot.sendMessage(
      config.telegram.chatId,
      message
    );
  }
}