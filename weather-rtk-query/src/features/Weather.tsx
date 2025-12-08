import React, { useState, useEffect } from "react";
import {
    useGetLocationQuery,
    useGetWeatherQuery,
    GeocodingResult,
} from "../store/api/weatherApi";
import WeatherCard from "../components/WeatherCard";
import TemperatureChart from "../components/TemperatureChart";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import CitySearch from "../components/CitySearch";
import "./Weather.css";

interface SelectedCity {
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
}

const Weather: React.FC = () => {
    // Состояние для выбранного города
    const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
    const [useMyLocation, setUseMyLocation] = useState(true);

    // Получаем геолокацию с помощью RTK Query
    const {
        data: locationData,
        isLoading: isLocationLoading,
        isError: isLocationError,
        refetch: refetchLocation,
    } = useGetLocationQuery(undefined, {
        skip: !useMyLocation, // Пропускаем если используем поиск города
    });

    // Определяем координаты для запроса погоды
    const coordinates = selectedCity
        ? { latitude: selectedCity.latitude, longitude: selectedCity.longitude }
        : locationData
            ? { latitude: locationData.latitude, longitude: locationData.longitude }
            : null;

    // Получаем погоду
    const {
        data: weatherData,
        isLoading: isWeatherLoading,
        isError: isWeatherError,
        refetch: refetchWeather,
    } = useGetWeatherQuery(
        {
            latitude: coordinates?.latitude ?? 0,
            longitude: coordinates?.longitude ?? 0,
        },
        {
            skip: !coordinates,
        }
    );

    // Когда получаем данные геолокации, сбрасываем выбранный город
    useEffect(() => {
        if (useMyLocation && locationData && !selectedCity) {
            // Данные геолокации получены
        }
    }, [locationData, useMyLocation, selectedCity]);

    // Обработчик выбора города из поиска
    const handleCitySelect = (city: GeocodingResult) => {
        setSelectedCity({
            name: city.name,
            latitude: city.latitude,
            longitude: city.longitude,
            country: city.country,
        });
        setUseMyLocation(false);
    };

    // Обработчик "Моя геолокация"
    const handleUseMyLocation = () => {
        setSelectedCity(null);
        setUseMyLocation(true);
        refetchLocation();
    };

    // Определяем название города для отображения
    const displayCityName = selectedCity
        ? `${selectedCity.name}${selectedCity.country ? `, ${selectedCity.country}` : ""}`
        : locationData?.city || "Unknown";

    // Обработка состояния загрузки
    if ((useMyLocation && isLocationLoading) || isWeatherLoading) {
        return (
            <div className="weather-container">
                <CitySearch
                    onCitySelect={handleCitySelect}
                    onUseMyLocation={handleUseMyLocation}
                />
                <LoadingSpinner />
            </div>
        );
    }

    // Обработка ошибок геолокации
    if (useMyLocation && isLocationError) {
        return (
            <div className="weather-container">
                <CitySearch
                    onCitySelect={handleCitySelect}
                    onUseMyLocation={handleUseMyLocation}
                />
                <ErrorMessage
                    message="Failed to get your location. Please enable location services or search for a city."
                    onRetry={refetchLocation}
                />
            </div>
        );
    }

    // Обработка ошибок погоды
    if (isWeatherError) {
        return (
            <div className="weather-container">
                <CitySearch
                    onCitySelect={handleCitySelect}
                    onUseMyLocation={handleUseMyLocation}
                />
                <ErrorMessage
                    message="Failed to fetch weather data. Please try again."
                    onRetry={refetchWeather}
                />
            </div>
        );
    }

    // Если нет данных
    if (!coordinates || !weatherData) {
        return (
            <div className="weather-container">
                <CitySearch
                    onCitySelect={handleCitySelect}
                    onUseMyLocation={handleUseMyLocation}
                />
                <LoadingSpinner />
            </div>
        );
    }

    const { current, current_units, hourly } = weatherData;

    return (
        <div className="weather-container">
            <CitySearch
                onCitySelect={handleCitySelect}
                onUseMyLocation={handleUseMyLocation}
            />

            <div className="weather-content">
                <WeatherCard
                    city={displayCityName}
                    temperature={current.temperature_2m}
                    temperatureUnit={current_units.temperature_2m}
                    windSpeed={current.wind_speed_10m}
                    windSpeedUnit={current_units.wind_speed_10m}
                    windGusts={current.wind_gusts_10m}
                    windGustsUnit={current_units.wind_gusts_10m}
                    weatherCode={current.weather_code}
                />

                <TemperatureChart
                    times={hourly.time}
                    temperatures={hourly.temperature_2m}
                    temperatureUnit={current_units.temperature_2m}
                />
            </div>

            <button
                className="refresh-button"
                onClick={() => {
                    if (useMyLocation) {
                        refetchLocation();
                    }
                    refetchWeather();
                }}
            >
                🔄 Wetter aktualisieren
            </button>
        </div>
    );
};

export default Weather;
