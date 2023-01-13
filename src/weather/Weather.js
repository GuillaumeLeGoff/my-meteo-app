import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import {
  WiRain,
  WiSnow,
  WiCloudy,
  WiSunset,
  WiDayCloudy,
} from "react-icons/wi";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("nantes");
  const [selectedDay, setSelectedDay] = useState(null);
  const [showHourlyForecast, setShowHourlyForecast] = useState(false);
  const [indexHourly, setIndexHourly] = useState();
  
  useEffect(() => {
    setCity(localStorage.getItem(city))
    
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=7PF4YFKLFLNC6LNER4YYAYJVS&contentType=json`
      )
      .then((res) => setWeather(res.data));
  }, [city]);
  

  const handleClick = (index) => {
    setSelectedDay(index);
    setIndexHourly(index);
    
    if (indexHourly === index){
      setShowHourlyForecast(!showHourlyForecast);
    }
  };

  const handleOnChange = (inputCity) => {
    console.log(inputCity);
    setCity(inputCity)
    localStorage.setItem(inputCity);
  }
  

  return (
    <div className="weather-container">
      <form>
        <label>
          City:
          <input
            type="text"
            value={city}
            className="input"
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </label>
        
      </form>
      
      <div
        className="forecast-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {weather.days
          ? weather.days.slice(0, 10).map((day, index) => (
            <div className="weather-info">
            <div
              key={index}
              className="day-forecast"
              
            >
              <div
                key={index}
                className="day-forecast"
              >
                <p className="day">
                  {new Date(day.datetimeEpoch * 1000).toLocaleDateString()}
                </p>
                
                {day.icon === "rain" ? (
                  <WiRain size={50} className="weather-icon" />
                ) : null}
                {day.icon === "sunny" ? (
                  <WiSunset size={50} className="weather-icon" />
                ) : null}
                {day.icon === "partly-cloudy-day" ? (
                  <WiDayCloudy size={50} className="weather-icon" />
                ) : null}
                {day.icon === "cloudy" ? (
                  <WiCloudy size={50} className="weather-icon" />
                ) : null}
                {day.icon === "snow" ? (
                  <WiSnow size={50} className="weather-icon" />
                ) : null}
                <p className="temp">{day.temp}°C</p>
                {/* <p className="humidity">Humidity: {day.humidity}</p> */}
              </div>
         
              <button onClick={() => handleClick(index)}>
                View Hourly Forecast
              </button>
              {selectedDay === index && showHourlyForecast ? (
                <div
                  className="hourly-forecast-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {day.hours.map((hour, index) => (
                    <div
                      key={index}
                      className="hour-forecast"
                      style={{ width: "20%" }}
                    >
                      <p className="time">Hour: {hour.datetime.slice(0,2)}</p>
                      <p className="tempHour">{hour.temp}°C</p>
                     {/*  <p className="tempHour">Humidity: {hour.humidity}</p> */}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
         </div>
         
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Weather;
