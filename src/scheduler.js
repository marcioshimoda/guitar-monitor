function parseForecastDate(forecast) {
  if (!forecast) {
    return null;
  }

  const [day, month, year] =
    forecast.split("/");

  return new Date(year, month - 1, day);
}

function getDaysRemaining(forecastDate) {
  const now = new Date();

  const diffMs =
    forecastDate.getTime() - now.getTime();

  return diffMs / (1000 * 60 * 60 * 24);
}

function addJitter(minutes) {
  const jitter =
    Math.floor(Math.random() * 10) - 5;

  return minutes + jitter;
}

export function calculateNextInterval(
  forecast
) {
  if (!forecast) {
    return 60;
  }

  const forecastDate =
    parseForecastDate(forecast);

  const daysRemaining =
    getDaysRemaining(forecastDate);

  let minutes;

  if (daysRemaining > 30) {
    minutes = 60 * 12;
  } else if (daysRemaining > 7) {
    minutes = 60 * 6;
  } else if (daysRemaining > 2) {
    minutes = 60;
  } else if (daysRemaining > 0) {
    minutes = 10;
  } else {
    minutes = 5;
  }

  return addJitter(minutes);
}