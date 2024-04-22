import React, { useEffect, useState } from "react";
import "./styles.css";
import clear_sky from "../../assets/clear.png";
import cloudy_sky from "../../assets/cloud.png";
import humidity from "../../assets/humidity.png";
import winds from "../../assets/wind.png";
import rain from "../../assets/rain.png";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState("");
  const [skyIcon, setSkyIcon] = useState("");

  const getWeather = async () => {
    const getWeatherOfCity = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city ? city : "Gurgaon"
      }&lang=en&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await getWeatherOfCity.json();
    if (data.cod === 200) {
      setCityData(data);
      if (
        data.weather[0].main === "Clouds" ||
        data.weather[0].main === "Haze"
      ) {
        setSkyIcon(cloudy_sky);
      } else if (data.weather[0].main === "Rain") {
        setSkyIcon(rain);
      } else {
        setSkyIcon(clear_sky);
      }
      setCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="weather-wrapper">
      <header className="header-wrapper">
        <input
          type="text"
          placeholder="Enter City For Weather Details"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={getWeather}>Search</button>
      </header>
      {cityData && (
        <main>
          <img src={skyIcon} alt="sky-type" />
          <div className="city-temperature">
            {Math.round(cityData.main.temp)} °C
          </div>
          <div className="city-name">{cityData.name}</div>
          <div className="humidity-wind-wrapper">
            <div className="humidity-wrapper">
              <img src={humidity} alt="humidity" />
              <div>{cityData.main.humidity} %</div>
            </div>
            <div className="humidity-wrapper">
              <img src={winds} alt="winds" />
              <div>{cityData.wind.speed} km/hr</div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default WeatherApp;
