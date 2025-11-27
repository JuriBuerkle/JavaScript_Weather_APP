import React from 'react';
import { interpretWeatherCode, getWeatherEmoji, getWeatherType } from '../utils/weatherCodes';
import './WeatherCard.css';

interface WeatherCardProps {
    city: string;
    temperature: number;
    temperatureUnit: string;
    windSpeed: number;
    windSpeedUnit: string;
    windGusts: number;
    windGustsUnit: string;
    weatherCode: number;
}

// Компонент анимации дождя
const RainAnimation: React.FC = () => (
    <div className="weather-animation rain-animation">
        {[...Array(20)].map((_, i) => (
            <div key={i} className={`raindrop raindrop-${i + 1}`} />
        ))}
    </div>
);

// Компонент анимации снега
const SnowAnimation: React.FC = () => (
    <div className="weather-animation snow-animation">
        {[...Array(25)].map((_, i) => (
            <div key={i} className={`snowflake snowflake-${i + 1}`}>❄</div>
        ))}
    </div>
);

// Компонент анимации солнца
const SunAnimation: React.FC = () => (
    <div className="weather-animation sun-animation">
        <div className="sun">
            <div className="sun-core"></div>
            {[...Array(12)].map((_, i) => (
                <div key={i} className={`sun-ray sun-ray-${i + 1}`} />
            ))}
        </div>
    </div>
);

// Компонент анимации ветра
const WindAnimation: React.FC = () => (
    <div className="weather-animation wind-animation">
        {[...Array(8)].map((_, i) => (
            <div key={i} className={`wind-line wind-line-${i + 1}`} />
        ))}
    </div>
);

// Компонент анимации грозы
const StormAnimation: React.FC = () => (
    <div className="weather-animation storm-animation">
        <RainAnimation />
        <div className="lightning">⚡</div>
    </div>
);

// Компонент анимации облаков
const CloudyAnimation: React.FC = () => (
    <div className="weather-animation cloudy-animation">
        {[...Array(3)].map((_, i) => (
            <div key={i} className={`cloud cloud-${i + 1}`}>☁</div>
        ))}
    </div>
);

// Компонент анимации тумана
const FogAnimation: React.FC = () => (
    <div className="weather-animation fog-animation">
        {[...Array(5)].map((_, i) => (
            <div key={i} className={`fog-layer fog-layer-${i + 1}`} />
        ))}
    </div>
);

const WeatherCard: React.FC<WeatherCardProps> = ({
    city,
    temperature,
    temperatureUnit,
    windSpeed,
    windSpeedUnit,
    windGusts,
    windGustsUnit,
    weatherCode,
}) => {
    const weatherType = getWeatherType(weatherCode, windSpeed);

    const renderWeatherAnimation = () => {
        switch (weatherType) {
            case 'rain':
                return <RainAnimation />;
            case 'snow':
                return <SnowAnimation />;
            case 'sunny':
                return <SunAnimation />;
            case 'windy':
                return <WindAnimation />;
            case 'storm':
                return <StormAnimation />;
            case 'cloudy':
                return <CloudyAnimation />;
            case 'fog':
                return <FogAnimation />;
            default:
                return null;
        }
    };

    return (
        <div className={`weather-card weather-${weatherType}`}>
            {renderWeatherAnimation()}
            <h1>
                {getWeatherEmoji(weatherCode)} Weather Station
            </h1>
            <p className="city-name">{city}</p>
            <div className="weather-info">
                <p>
                    <strong>🌡️ Температура:</strong> {temperature}{temperatureUnit}
                </p>
                <p>
                    <strong>💨 Скорость ветра:</strong> {windSpeed} {windSpeedUnit}
                </p>
                <p>
                    <strong>🌬️ Порывы ветра:</strong> {windGusts} {windGustsUnit}
                </p>
                <p>
                    <strong>☁️ Условия:</strong> {interpretWeatherCode(weatherCode)}
                </p>
            </div>
        </div>
    );
};

export default WeatherCard;
