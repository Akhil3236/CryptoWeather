"use client"; // Required for client-side fetching

import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;  //imported from the env 
const defaultCities = ["Delhi", "Srinagar", "hyderabad", "tanuku"];

type WeatherData = {
  name: string;
  country: string;
  temp: number;
  humidity:number;
  description: string;
};

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch weather for default cities on load
  useEffect(() => {
    fetchWeatherForCities(defaultCities);
  }, []);

  async function fetchWeather(city: string): Promise< WeatherData | null> {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod !== 200) return null;

      return {
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        humidity:data.main.humidity,
        description: data.weather[0].description,
      };
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  }

  async function fetchWeatherForCities(cities: string[]) {
    setLoading(true);
    const weatherResults = await Promise.all(cities.map(fetchWeather));
    setWeatherData(weatherResults.filter((data) => data !== null) as WeatherData[]);
    setLoading(false);
  }

  async function handleSearch() {
    if (!searchCity) return;
    setLoading(true);
    const newCityWeather = await fetchWeather(searchCity);
    if (newCityWeather) {
      setWeatherData([...weatherData, newCityWeather]);
    } else {
      alert("City not found!");
    }
    setSearchCity("");
    setLoading(false);
  }

  return (
    <div className="p-7 text-center mt-20">
      <h1 className="text-2xl font-bold mb-4"> Weather page </h1>

      <div className="mb-8">
        <input
          type="text"
          className="border p-2 rounded w-64"
          placeholder="Enter city name..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 ml-2 rounded" onClick={handleSearch}>
          Add City
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4.5 ">
        {weatherData.map((weather, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-4xl shadow-md flex row justify-evenly align-middle transition-transform duration-300 
          hover:scale-103 hover:bg-blue-200">

            <h2 className="text-xl font-bold">
            ⚲  {weather.name}, {weather.country}
            </h2>

            <div>
            <p> Temp: {weather.temp}°C</p>
            <p> {weather.description}</p>
            <p> Humidity :{weather.humidity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
