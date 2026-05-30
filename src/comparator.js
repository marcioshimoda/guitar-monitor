export function compareStates(
  previous,
  current
) {
  const changes = [];

  if (!previous?.checkedAt) {
    changes.push({
      type: "FIRST_RUN",
      message: `Primeira execução para ${current.storeName}`,
    });

    return changes;
  }

  if (
    previous.availability !== current.availability
  ) {
    changes.push({
      type: "AVAILABILITY_CHANGED",
      message: current.availability
        ? `${current.storeName}: PRODUTO DISPONÍVEL`
        : `${current.storeName}: produto indisponível`,
    });
  }

  if (previous.forecast !== current.forecast) {
    changes.push({
      type: "FORECAST_CHANGED",
      message: `${current.storeName}: previsão alterada de ${previous.forecast} para ${current.forecast}`,
    });
  }

  if (previous.hash !== current.hash) {
    changes.push({
      type: "CONTENT_CHANGED",
      message: `${current.storeName}: conteúdo alterado`,
    });
  }

  return changes;
}