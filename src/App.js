import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { fetchWeather, fetchForecast } from "./api";

function App() {
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("weather_search_history")) || [];
  });
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    try {
      const weather = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      setWeatherData(weather);
      setForecast(forecastData.list);
      setSearchHistory((prev) => {
        const updated = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
        localStorage.setItem("weather_search_history", JSON.stringify(updated));
        return updated;
      });
  
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeatherData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-4">
      <div className="max-w-2xl mx-auto">
        {}
        <button
          onClick={() => setIsDark(!isDark)}
          className="mb-6 px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-yellow-400 dark:text-black shadow-md"
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {}
        {searchHistory.length > 0 && (
  <div className="mb-4">
    <h4 className="font-semibold mb-2">Recent Searches:</h4>
    <div className="flex flex-wrap gap-2">
      {searchHistory.map((city, index) => (
        <button
          key={index}
          onClick={() => handleSearch(city)}
          className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white text-sm hover:bg-blue-500 hover:text-white transition"
        >
          {city}
        </button>
      ))}
    </div>
  </div>
)}
        <SearchBar onSearch={handleSearch} />
        {}
        {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}

        {}
        {weatherData && (
          <div className="mt-6">
            <WeatherCard data={weatherData} />
          </div>
        )}

        {}
        {forecast && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
            <ForecastCard forecastList={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;