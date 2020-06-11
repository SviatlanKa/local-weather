import React from "react";
import WeatherIcon from "../weather-icon/WeatherIcon";

const DailyForecastItem = ({ isMetricSys, date, dayWeatherIcon, maxTemperature, minTemperature }) => (
    <div className="daily-forecast-item">
        <div>{date}/5</div>
        <WeatherIcon icon={dayWeatherIcon} smallSize/>
        <div>{isMetricSys ? maxTemperature.metric : maxTemperature.imperial}°</div>
        <div>{isMetricSys ? minTemperature.metric : minTemperature.imperial}°</div>
    </div>
);

export default DailyForecastItem;