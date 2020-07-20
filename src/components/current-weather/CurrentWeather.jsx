import React from "react";
import WeatherIcon from '../weather-icon/WeatherIcon';
import './CurrentWeather.css';

const CurrentWeather = ({ name, isMetricSys, curWeather }) => {
    const { weatherText, weatherIcon, wind } = curWeather;
    const temperature = isMetricSys ? curWeather.temperature.Metric : curWeather.temperature.Imperial;
    const realFeelTemperature = isMetricSys ? curWeather.realFeelTemperature.Metric : curWeather.realFeelTemperature.Imperial;
    const speed = isMetricSys ? wind.speed.metric : wind.speed.imperial;
    const visibility = isMetricSys ? curWeather.visibility.Metric : curWeather.visibility.Imperial;

    return (
            <div className="current-weather">
                <span className="city-name">{name}</span>
                <div className="current-weather-rows">
                    <span className="current-temperature">{temperature.Value}°{temperature.Unit}</span>
                    <WeatherIcon icon={weatherIcon} bigSize/>
                    <span className="left">{weatherText}</span>
                    <span className="right">{speed.value} {speed.unit} {wind.direction}</span>
                    <span className="left">RealFeel {realFeelTemperature.Value}°{realFeelTemperature.Unit}</span>
                    <span className="right">Visibility {visibility.Value} {visibility.Unit}</span>
                </div>
            </div>

    )
};

export default CurrentWeather;