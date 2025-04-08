const API_KEY = "abc2db52f8f7b5903a716d39cc7b2a50"; // Your OpenWeatherMap API key

// 🔸 Fetch current weather
export async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  console.log("Fetching current weather:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  return await res.json();
}

// 🔹 Fetch 5-day / 3-hour forecast
export async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  console.log("Fetching 5-day forecast:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast fetch failed");
  return await res.json();
}
