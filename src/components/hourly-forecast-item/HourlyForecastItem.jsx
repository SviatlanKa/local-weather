import React from "react";
import WeatherIcon from "../weather-icon/WeatherIcon";
import PrecipitationIcon from "../precipitation-icon/PrecipitationIcon";

const HourlyForecastItem = ({ ...hourlyForecast }) => (
    <div className="hourly-forecast-item">
        <div>{hourlyForecast.time}:00</div>
        <WeatherIcon icon={hourlyForecast.weatherIcon} smallSize/>
        <PrecipitationIcon {...hourlyForecast}/>
    </div>
);

export default HourlyForecastItem;