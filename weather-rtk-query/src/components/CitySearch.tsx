import React, { useState, useCallback } from "react";
import {
    useLazySearchCityQuery,
    GeocodingResult,
} from "../store/api/weatherApi";
import "./CitySearch.css";

interface CitySearchProps {
    onCitySelect: (city: GeocodingResult) => void;
    onUseMyLocation: () => void;
}

const CitySearch: React.FC<CitySearchProps> = ({
    onCitySelect,
    onUseMyLocation,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showResults, setShowResults] = useState(false);

    const [searchCity, { data, isLoading, isError }] = useLazySearchCityQuery();

    // Debounce поиска
    const handleSearch = useCallback(
        (value: string) => {
            setSearchTerm(value);
            if (value.length >= 2) {
                searchCity(value);
                setShowResults(true);
            } else {
                setShowResults(false);
            }
        },
        [searchCity]
    );

    const handleCityClick = (city: GeocodingResult) => {
        onCitySelect(city);
        setSearchTerm(`${city.name}, ${city.country}`);
        setShowResults(false);
    };

    const handleUseMyLocation = () => {
        setSearchTerm("");
        setShowResults(false);
        onUseMyLocation();
    };

    return (
        <div className="city-search-container">
            <div className="search-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search city..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
                />
                <button
                    className="location-button"
                    onClick={handleUseMyLocation}
                    title="Use my location"
                >
                    📍
                </button>
            </div>

            {showResults && (
                <div className="search-results">
                    {isLoading && <div className="search-loading">Searching...</div>}

                    {isError && (
                        <div className="search-error">Error searching cities</div>
                    )}

                    {data?.results && data.results.length > 0 ? (
                        <ul className="results-list">
                            {data.results.map((city) => (
                                <li
                                    key={city.id}
                                    className="result-item"
                                    onClick={() => handleCityClick(city)}
                                >
                                    <span className="city-name">{city.name}</span>
                                    <span className="city-details">
                                        {city.admin1 ? `${city.admin1}, ` : ""}
                                        {city.country}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !isLoading &&
                        searchTerm.length >= 2 && (
                            <div className="no-results">No cities found</div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default CitySearch;
