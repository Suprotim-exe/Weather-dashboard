import React from "react";

export default function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;
  return (
    <div className="bg-white dark:bg-gray-800 text-center p-6 rounded-xl shadow-md dark:text-white">
  <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
  <img
    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
    alt={data.weather[0].description}
    className="mx-auto"
  />
  <p className="text-xl font-semibold">{data.main.temp}°C</p>
  <p className="capitalize">{data.weather[0].description}</p>
  <div className="mt-4 text-sm space-y-1">
    <p>Humidity: {data.main.humidity}%</p>
    <p>Wind: {data.wind.speed} km/h</p>
  </div>
</div>
  );
}