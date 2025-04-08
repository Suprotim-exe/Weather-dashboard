export default function ForecastCard({ forecastList }) {
    // Filter for one forecast per day (around 12:00 PM)
    const dailyForecasts = forecastList.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );
  
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {dailyForecasts.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center shadow-md dark:text-white transition-colors duration-300"
          >
            <p className="font-medium mb-1">{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="mx-auto"
            />
            <p className="text-lg font-semibold">{Math.round(item.main.temp)}°C</p>
            <p className="text-sm capitalize">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    );
  }
  