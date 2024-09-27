import React, { useState, useEffect } from "react";
import "../Style/Clock.css";
import axios from "axios";

const IndianClock = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      const newSeconds = new Date().getSeconds();
      setTime(newTime);
      setSeconds(newSeconds);
    }, 1000);

    fetchWeather();

    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const API_KEY = "41b353d57dca24753bc5d545726ecc99";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container pt-2">
      {/* <h2 className="text-white">Indian Time</h2> */}
      <div className="row d-flex justify-content-center align-items-center text-center">
        <div className="col-lg-6 col-md-12 col-sm-12 clock-container">
          <div className="clock-face">
            <svg className="progress-ring" height="200" width="200">
              <circle
                className="progress-ring__circle"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="8"
                fill="transparent"
                r="90"
                cx="100"
                cy="100"
              />
              <circle
                className="progress-ring__circle"
                stroke="rgba(0, 255, 255, 0.8)"
                strokeWidth="8"
                fill="transparent"
                r="90"
                cx="100"
                cy="100"
                style={{
                  strokeDasharray: `${2 * Math.PI * 90}`,
                  strokeDashoffset: `${
                    2 * Math.PI * 90 - (2 * Math.PI * 90 * seconds) / 60
                  }`,
                  transition: "stroke-dashoffset 0.5s ease",
                }}
              />
            </svg>
            <div className="time-glow">{time}</div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 weather-section">
          {weather ? (
            <div className="weather-details">
              <h3>Current Weather:</h3>
              <p>City: {weather.name}</p>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>
                Description: {weather.weather[0].description}{" "}
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </p>
            </div>
          ) : (
            <div className="loading-message">
              <div className="spinner"></div>
              Loading weather...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndianClock;
