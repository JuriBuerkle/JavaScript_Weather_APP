// Функция для интерпретации кода погоды
export function interpretWeatherCode(code: number): string {
  const codesAndInterpretations: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly cloudy",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing light rain",
    67: "Freezing heavy rain",
    71: "Light snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Light rain shower",
    81: "Moderate rain shower",
    82: "Heavy rain shower",
    85: "Light snow shower",
    86: "Heavy snow shower",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
  };

  return codesAndInterpretations[code] || "Unknown weather code";
}

// Функция для получения иконки погоды (emoji)
export function getWeatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 55) return "🌧️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95) return "⛈️";
  return "🌡️";
}

// Тип погоды для анимаций
export type WeatherType =
  | "sunny"
  | "cloudy"
  | "rain"
  | "snow"
  | "storm"
  | "fog"
  | "windy";

// Функция для определения типа погоды для анимации
export function getWeatherType(code: number, windSpeed: number): WeatherType {
  // Сильный ветер (> 40 км/ч)
  if (windSpeed > 40) return "windy";

  // Ясно
  if (code === 0) return "sunny";

  // Облачно
  if (code >= 1 && code <= 3) return "cloudy";

  // Туман
  if (code >= 45 && code <= 48) return "fog";

  // Дождь
  if (
    (code >= 51 && code <= 55) ||
    (code >= 61 && code <= 67) ||
    (code >= 80 && code <= 82)
  )
    return "rain";

  // Снег
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snow";

  // Гроза
  if (code >= 95) return "storm";

  return "cloudy";
}
