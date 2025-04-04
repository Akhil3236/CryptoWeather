"use client";
import { useState } from "react";

export default function WeatherHistory() {
  const [city, setCity] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchWeatherHistory = async () => {
    if (!city.trim()) {
      setError("Enter a city name.");
      return;
    }

    setError("");
    setWeatherData([]);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await res.json();

      console.log(data);
      

      if (data.cod !== "200") {
        setError("City not found.");
        return;
      }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filteredData = data.list.filter((_: any, index: number) => index % 4 === 0).map((entry: any) => ({
        date: entry.dt_txt.split(" ")[0],
        temp: entry.main.temp,
        condition: entry.weather[0].description,
      }));

      setWeatherData(filteredData);
    } catch {
      setError("Error fetching weather data.");
    }
  };

  return (
    <div className="p-10 m-20  max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold">Weather History(Last 10 Days)</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City Name"
        className="p-2 border rounded w-full mt-4"
      />
      <button onClick={fetchWeatherHistory} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
        Get Weather Data
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {weatherData.length > 0 && (
        <table className="mt-4 w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Temp (°C)</th>
              <th className="border p-2">Conditions</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((day, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{day.date}</td>
                <td className="border p-2">{day.temp}°C</td>
                <td className="border p-2">{day.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
