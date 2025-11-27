import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Типы для геолокации
interface GeoLocation {
  city: string;
  latitude: number;
  longitude: number;
  countryName: string;
  locality: string;
}

// Типы для поиска города (Geocoding API)
interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string; // Регион/Штат
  country_code: string;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

// Типы для погоды
interface CurrentUnits {
  temperature_2m: string;
  wind_speed_10m: string;
  wind_gusts_10m: string;
  wind_direction_10m: string;
  weather_code: string;
}

interface CurrentWeather {
  temperature_2m: number;
  wind_speed_10m: number;
  wind_gusts_10m: number;
  wind_direction_10m: number;
  weather_code: number;
}

interface HourlyData {
  time: string[];
  temperature_2m: number[];
}

interface WeatherResponse {
  current_units: CurrentUnits;
  current: CurrentWeather;
  hourly: HourlyData;
}

// Интерфейс для параметров запроса погоды
interface WeatherParams {
  latitude: number;
  longitude: number;
}

// Создаем API для геолокации
export const geoApi = createApi({
  reducerPath: "geoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bigdatacloud.net/data/",
  }),
  endpoints: (builder) => ({
    getLocation: builder.query<GeoLocation, void>({
      query: () => "reverse-geocode-client",
    }),
  }),
});

// Создаем API для поиска города (Geocoding)
export const geocodingApi = createApi({
  reducerPath: "geocodingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://geocoding-api.open-meteo.com/v1/",
  }),
  endpoints: (builder) => ({
    searchCity: builder.query<GeocodingResponse, string>({
      query: (cityName) =>
        `search?name=${encodeURIComponent(
          cityName
        )}&count=5&language=en&format=json`,
    }),
  }),
});

// Создаем API для погоды
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.open-meteo.com/v1/",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, WeatherParams>({
      query: ({ latitude, longitude }) =>
        `forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code`,
    }),
  }),
});

// Экспортируем хуки
export const { useGetLocationQuery } = geoApi;
export const { useLazySearchCityQuery } = geocodingApi;
export const { useGetWeatherQuery, useLazyGetWeatherQuery } = weatherApi;

// Экспортируем типы
export type { GeocodingResult };
