import React,{useState,useEffect} from "react";

export default function Web()
{
    const [city,setCity]=useState("London");
    const [weather,setWeather]=useState(null);
    const [error,setError]=useState(null);

    const fetchWeather=async()=>{
        if(!city.trim()){
            setError("Please enter a city name");
            return;
        }
        
        
        try{
            const response= await fetch(
                `http://api.weatherapi.com/v1/current.json?key=a92283c03b09409992670329252911&q=${city}&aqi=yes`
            );
            if(!response.ok){
                throw new Error(`HTTP eror! status :${response.status}`);
            }
            const data=await response.json();
            setWeather(data);
            setError(null);
                }
        catch(err){
            console.error("Failed to fetch weather:",err);
            setError(err.message||"Failed to fetch data");
        }
        };
        useEffect(()=>{
            fetchWeather();},[]);
            if(!weather){
                return<div>Loading ...</div>
            }

         
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 p-6">
    
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/30 text-white">

      <h1 className="text-4xl font-bold text-center mb-6 flex items-center gap-2">
        🌤 Weather App
      </h1>

      {/* Search Bar */}
      <div className="flex gap-3 mb-10">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 
                     border border-white/30 outline-none focus:ring-2 focus:ring-white/50"
        />

        <button
          onClick={fetchWeather}
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl 
                     shadow-md hover:bg-gray-200 transition"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-300 text-center mb-4 font-semibold">
          Error: {error}
        </p>
      )}

      {/* Weather Info */}
      {weather && (
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-5">
            {weather.location.name}, {weather.location.country}
          </h2>

          <p className="text-gray-200 text-sm mb-4">
            Local time: {weather.location.localtime}
          </p>

          <img
            src={weather.current.condition.icon}
            alt="Weather icon"
            className="mx-auto w-44 h-44 mb-4"
          />

          <p className="text-5xl font-bold mb-2">
            {weather.current.temp_c}°C
          </p>

          <p className="text-lg text-gray-100 mb-4">
            {weather.current.condition.text}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="bg-white/10 p-4 rounded-xl border border-white/20 shadow">
              <p className="text-sm text-gray-200">Humidity</p>
              <p className="text-xl font-semibold">{weather.current.humidity}%</p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20 shadow">
              <p className="text-sm text-gray-200">Wind</p>
              <p className="text-xl font-semibold">
                {weather.current.wind_kph} kph ({weather.current.wind_dir})
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  </div>
);

    }
