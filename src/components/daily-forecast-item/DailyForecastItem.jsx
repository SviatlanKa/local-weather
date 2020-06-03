import React from "react";
import WeatherIcon from "../weather-icon/WeatherIcon";

const DailyForecastItem = ({ date, dayWeatherIcon, maxTemperature, minTemperature }) => (
    <div className="daily-forecast-item">
        <div>{date}/5</div>
        <WeatherIcon icon={dayWeatherIcon} smallSize/>
        <div>{maxTemperature}°</div>
        <div>{minTemperature}°</div>
    </div>
);

export default DailyForecastItem;